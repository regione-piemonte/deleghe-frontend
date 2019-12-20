
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped></style>


<template>
  <q-modal :value="value" v-bind="attrs" v-on="listeners">
    <q-modal-layout footer-class="no-shadow">
      <q-toolbar slot="header">
        <q-toolbar-title>
          Modifica delegato
        </q-toolbar-title>

        <q-btn round flat icon="close" v-close-overlay />
      </q-toolbar>


      <q-card v-if="!isEmpty(delegate)" flat>

        <q-item>
          <q-item-side>
            <csi-icon-base class="csi-svg-icon--lg">
              <csi-icon-avatar-person />
            </csi-icon-base>
          </q-item-side>

          <q-item-main class="text-bold">
            <q-item-tile label>{{fullName | startCase}}</q-item-tile>
          </q-item-main>

          <q-item-side right>
            <q-item-tile icon="more_vert">
              <q-popover>
                <q-list separator link>
                  <q-item @click.native="goToHistory" v-close-overlay>
                    Storico delegato
                  </q-item>
                </q-list>
              </q-popover>
            </q-item-tile>
          </q-item-side>
        </q-item>

        <q-card-main class="no-padding">
          <csi-delegate-handle-item
            :delegations="editableDelegations"
            @change-delegation-status="onChangeDelegationStatus"
            @change-delegation-start-date="onChangeDelegationStartDate"
            @change-delegation-end-date="onChangeDelegationEndDate"
            @are-valid="areDelegationsValid = true"
            @are-invalid="areDelegationsValid = false"
            no-select-all
          />
        </q-card-main>

        <q-card-actions>

        </q-card-actions>
      </q-card>


      <div slot="footer" class="q-pa-md">
        <q-btn
          :disable="!areDelegationsValid"
          :loading="isSaving"
          @click="saveDelegations()"
          outline
          color="primary"
          class="full-width">
          Salva
        </q-btn>
      </div>

    </q-modal-layout>
  </q-modal>
</template>


<script>
  import {buildDefaultDelegation, getLastDelegations, isDelegationValid} from '@services/delegations/business-logic'
  import {deepClone, isEmpty, unionBy} from '@services/global/utils'
  import CsiDelegateHandleItem from 'components/delegations/CsiDelegateHandleItem'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import {editDelegate} from '@services/api/delegations'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'
  import {getResponseStatusCode} from '@services/api/utils'

  export default {
    name: 'CsiDelegateEditModal',
    components: {CsiIconAvatarPerson, CsiIconBase, CsiDelegateHandleItem},
    props: {
      value: {type: Boolean, required: false, default: false},
      delegate: {type: Object, required: true},
    },
    inheritAttrs: false,
    data() {
      return {
        editableDelegations: [],
        areDelegationsValid: true,
        isSaving: false,
      }
    },
    computed: {
      attrs() {
        const {delegate, value, ...attrs} = this.$attrs
        return attrs
      },
      listeners() {
        const {...listeners} = this.$listeners
        return listeners
      },
      user() {
        return this.$store.getters['global/user']
      },
      delegableAppServices() {
        return this.$store.getters['global/delegableAppServices']
      },
      defaultDelegations() {
        return this.delegableAppServices.map(buildDefaultDelegation)
      },
      fullName() {
        return `${this.delegate.nome_delega} ${this.delegate.cognome_delega}`
      },
      delegations() {
        return this.delegate.deleghe
      },
      lastDelegations() {
        if (!this.delegations) return
        return getLastDelegations(this.delegations)
      }
    },
    watch: {
      lastDelegations: {
        immediate: true,
        deep: true,
        handler(val, oldVal) {
          if (isEmpty(val)) return
          this.editableDelegations = unionBy(this.lastDelegations, this.defaultDelegations, d => d.codice_servizio)
          this.editableDelegations = deepClone(this.editableDelegations)
        }
      }
    },
    methods: {
      isEmpty,
      goToHistory() {
        let route = this.$routes.DELEGATIONS.DELEGATE_HISTORY
        let params = {taxCode: this.delegate.codice_fiscale_delega}
        this.$router.push({name: route.name, params})
      },
      onStatusActive(delegation) {
        // Se la delega esisteva inizialmente ed era da considerare come "attiva" => impostiamo lo stato iniziale
        // altrimenti di default impostiamo lo stato "ACTIVE"
        let status = this.$config.delegations.delegationStatuss.ACTIVE
        let initialDelegation = this.lastDelegations.find(d => d.codice_servizio === delegation.codice_servizio)
        if (initialDelegation && isDelegationValid(initialDelegation.stato_delega)) {
          status = initialDelegation.stato_delega
        }

        delegation.stato_delega = status
      },
      onStatusDeactivate(delegation) {
        // Se la delega esisteva inizialmente NON era da considerare come "ATTIVA" => impostiamo lo stato iniziale
        // altrimenti di default impostiamo lo stato "REVOKED"
        let status = this.$config.delegations.delegationStatuss.REVOKED
        let initialDelegation = this.lastDelegations.find(d => d.codice_servizio === delegation.codice_servizio)

        if (!initialDelegation) {
          status = this.$config.delegations.delegationStatuss.NOT_ACTIVE
        } else if (!isDelegationValid(initialDelegation.stato_delega)) {
          status = initialDelegation.stato_delega
        }

        delegation.stato_delega = status
      },
      onChangeDelegationStatus(delegation, value) {
        value ? this.onStatusActive(delegation) : this.onStatusDeactivate(delegation)
      },
      onChangeDelegationStartDate(delegation, startDate) {
        delegation.data_inizio_delega = startDate
      },
      onChangeDelegationEndDate(delegation, endDate) {
        delegation.data_fine_delega = endDate
        console.debug('onChangeDelegationEndDate', {delegation, endDate})
      },
      async saveDelegations() {

        this.isSaving = true

        let {cf} = this.$store.getters['global/user']
        let delegateCf = this.delegate.codice_fiscale_delega

        let data = JSON.parse(JSON.stringify(this.delegate))
        let newDelegations = JSON.parse(JSON.stringify(this.editableDelegations))

        // Aggiustiamo lo storico integrando le modifiche fatte dall'utente
        // @warning: qui c'è della logica di business che potrebbe cambiare da un momento all'altro e creare bug
        console.group('integrazione deleghe')
        console.log('Deleghe Iniziali:', JSON.parse(JSON.stringify(data.deleghe)))
        console.log('Deleghe editabili:', JSON.parse(JSON.stringify(newDelegations)))
        newDelegations.forEach(nd => {
          console.debug('Processing delegation for', nd.codice_servizio)
          let statuss = this.$config.delegations.delegationStatuss
          let initialDelegation = this.lastDelegations.find(d => d.codice_servizio === nd.codice_servizio)
          let isActive = isDelegationValid(nd.stato_delega)
          console.debug('Initial delegation for ', nd.codice_servizio, ':', {initialDelegation})
          console.debug('isActive:', isActive)

          // se si tratta di una nuova delega che non è stata toccata
          // => non facciamo nulla
          if (!initialDelegation && [statuss.NOT_ACTIVE].includes(nd.stato_delega)) {
            console.debug('Nuova delega non attivata:', nd)
            return
          }

          // Se si tratta di una nuova delega => la aggiungiamo solo se lo stato è attivo
          if (!initialDelegation && isActive) {
            data.deleghe.push(nd)
            console.debug('Nuova delega:', nd)
            return
          }

          // se lo stato non è cambiato => non facciamo nulla
          if (initialDelegation.stato_delega === nd.stato_delega) {
            console.debug('Lo stato delle delega non è cambiato')
            if (isActive) {
              console.debug(`La delega è attiva => per salvare tutte le modifiche dell'utente sovrascrivo la delega iniziale`)
              data.deleghe = data.deleghe.map(d => d.uuid === initialDelegation.uuid ? nd : d)
            } else {
              console.debug('La delega non è attiva => mantengo la delega iniziale')
            }
            return
          }

          // se lo stato è cambiato ed è passato da "scaduta" o "revocata" o "ridiutata" ad "attiva"
          // => rimuoviamo le date di revoca e rinunvia ed rimpiazziamo la delega iniziale con quella nuova
          if ([statuss.EXPIRED, statuss.REVOKED, statuss.REFUSED].includes(initialDelegation.stato_delega) && isActive) {
            delete nd.data_revoca_delega
            delete nd.data_rinuncia_delega
            console.debug('Delega riattivata:', nd)
            data.deleghe = data.deleghe.map(d => d.uuid === initialDelegation.uuid ? nd : d)
            return
          }

          // se lo stato è cambiato ed è passato da "attiva" o "in sacendza" a "revocata"
          // => la sostiuiamo con quella iniziale
          if (isDelegationValid(initialDelegation.stato_delega) && [statuss.REVOKED].includes(nd.stato_delega)) {
            let index = data.deleghe.findIndex(d => d.uuid === nd.uuid)
            data.deleghe[index] = nd
            console.debug('Delega revocata:', nd)
            return
          }

        })
        console.log('Deleghe finali:', JSON.parse(JSON.stringify(data.deleghe)))
        console.groupEnd()


        try {
          let response = await editDelegate(cf, delegateCf, data)
          this.$emit('update:delegate', response.data)
          this.$q.notify({
            type: 'positive',
            message: 'Deleghe modificate'
          })
        } catch (e) {
          this.$q.notify({
            type: 'negative',
            message: `[${getResponseStatusCode(e)}] Non è stato possibile modificare le deleghe`
          })
        }

        this.isSaving = false
      },
    }
  }
</script>
