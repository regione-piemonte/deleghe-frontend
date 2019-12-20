
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page padding>

    <div v-if="!isLoading">

      <csi-page-title title="Gestisci delegato" @back="onBack" />

      <q-card class="q-mt-md">

        <!-- DELEGATO & LINK STORICO -->
        <!-- ------------------------------------------------------------------------------------------------------- -->
        <q-item>
          <q-item-side>
            <csi-icon-base class="csi-svg-icon--lg">
              <csi-icon-avatar-person :is-female="delegate.sesso_delega === 'F'" />
            </csi-icon-base>
          </q-item-side>


          <q-item-main class="text-bold">
            <q-item-tile label>{{fullName | startCase}}</q-item-tile>
            <!--<q-item-tile sublabel>{{ delegate.codice_fiscale_delega}}</q-item-tile>-->
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

        <q-card-separator />

        <q-card-main class="no-padding">
          <csi-delegate-handle-item
            :delegations="editableDelegations"
            @change-delegation-status="onChangeDelegationStatus"
            @change-delegation-start-date="onChangeDelegationStartDate"
            @change-delegation-end-date="onChangeDelegationEndDate"
            @select-all="onSelectAll"
            @deselect-all="onDeselectAll"
            @are-valid="areDelegationsValid = true"
            @are-invalid="areDelegationsValid = false"
            no-select-all
          />
        </q-card-main>

        <csi-buttons class="q-pa-sm">
          <csi-button
            primary
            label="Salva"
            :disable="!areDelegationsValid"
            :loading="isSaving"
            @click="saveDelegations()"
          />
        </csi-buttons>
      </q-card>
    </div>

    <!-- LOADER -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="isLoading" class="bg-transparent">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>
  import addDays from 'date-fns/add_days'
  import CsiDelegateHandleItem from 'components/delegations/CsiDelegateHandleItem'
  import {editDelegate, getDelegates} from '@services/api/delegations'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import {
    buildDefaultDelegation,
    getDelegationDaysInterval,
    getLastDelegations,
    isDelegationValid
  } from '@services/delegations/business-logic'
  import {deepClone, isEmpty, orderBy, unionBy} from '@services/global/utils'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'
  import {getResponseStatusCode} from '@services/api/utils'

  export default {
    name: 'PagePiedmontDelegateEdit',
    components: {CsiIconAvatarPerson, CsiIconBase, CsiPageTitle, CsiDelegateHandleItem},
    data() {
      return {
        isLoading: false,
        delegate: {},
        editableDelegations: [],
        areDelegationsValid: true,
        isSaving: false,
      }
    },
    computed: {
      user() {
        return this.$store.getters['global/user']
      },
      delegableAppServices() {
        return this.$store.getters['global/delegableAppServices']
      },
      defaultDelegations() {
        return this.delegableAppServices.map(buildDefaultDelegation)
      },
      delegations() {
        return this.delegate.deleghe ? orderBy(this.delegate.deleghe, ['codice_servizio']) : []
      },
      lastDelegations() {
        if (!this.delegations) return
        return getLastDelegations(this.delegations)
      },
      fullName() {
        return `${this.delegate.nome_delega} ${this.delegate.cognome_delega}`
      },
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
    async created() {

      let {delegateCf, delegate} = this.$route.params

      // se non ci è stato passato il delegato => lo otteniamo dal server
      if (!delegate) {
        this.isLoading = true
        // Anzichè prendere il singolo delegato prendiamo la lista dei delegati e poi filtriamo per ottenere il singolo delegato
        let response = await getDelegates(this.user.cf)
        delegate = response.data.find(d => d.codice_fiscale_delega === delegateCf)
        if (!delegate) {
          console.error('Il delegato non esiste... probabilmente la URL è stata inserita manualmente ed è presente un errore nel CF del delegato')
        }
        this.isLoading = false
      }

      this.delegate = delegate
      let defaultDelegations = this.delegableAppServices.map(buildDefaultDelegation)
      this.editableDelegations = unionBy(this.lastDelegations, defaultDelegations, d => d.codice_servizio)
      this.editableDelegations = deepClone(this.editableDelegations)
    },
    methods: {
      isEmpty,
      onStatusActive(delegation) {
        // Se la delega esisteva inizialmente ed era da considerare come "attiva" => impostiamo lo stato iniziale
        // altrimenti di default impostiamo lo stato "ACTIVE"
        let status = this.$config.delegations.delegationStatuss.ACTIVE
        let initialDelegation = this.lastDelegations.find(d => d.codice_servizio === delegation.codice_servizio)
        let startDate
        let endDate

        if (initialDelegation && isDelegationValid(initialDelegation.stato_delega)) {
          // Delega reimpostata allo stato inziiale
          // => impostiamo le date di inizio e fine delega con quelle della delega sul server
          status = initialDelegation.stato_delega
          startDate = initialDelegation.data_inizio_delega
          endDate = initialDelegation.data_fine_delega
          console.debug('Delega reimpostata allo stato iniziale:', {status, startDate, endDate})
        } else {
          // delega attivata per la prima volta o riattivata
          // => dobbiamo impostare le date coerentemente con quanto richiesto dalle API
          let service = this.$store.getters['global/appService'](delegation.codice_servizio)
          let now = new Date()
          let dayDifference = getDelegationDaysInterval(service)
          startDate = now
          endDate = addDays(now, dayDifference)
          console.debug('Delega attivata per la prima volta o riattivata:', {status, startDate, endDate})
        }

        delegation.stato_delega = status
        this.onChangeDelegationStartDate(delegation, startDate)
        this.onChangeDelegationEndDate(delegation, endDate)
      },
      onStatusDeactivate(delegation) {
        // Se la delega esisteva inizialmente NON era da considerare come "ATTIVA" => impostiamo lo stato iniziale
        // altrimenti di default impostiamo lo stato "REVOKED"
        let status = this.$config.delegations.delegationStatuss.REVOKED
        let initialDelegation = this.lastDelegations.find(d => d.codice_servizio === delegation.codice_servizio)

        if (!initialDelegation) {
          status = this.$config.delegations.delegationStatuss.NOT_ACTIVE
          console.debug('Riportata la delega allo stato iniziale:', {status})
        } else if (!isDelegationValid(initialDelegation.stato_delega)) {
          status = initialDelegation.stato_delega
          console.debug('Riportata la delega allo stato iniziale:', {status})
        } else {
          console.debug('Revocata una delega attiva:', {status})
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
      },
      onSelectAll() {
        this.editableDelegations.forEach(d => this.onChangeDelegationStatus(d, true))
      },
      onDeselectAll() {
        this.editableDelegations.forEach(d => this.onChangeDelegationStatus(d, false))
      },
      onBack() {
        let route = this.$routes.DELEGATIONS.PIEDMONT_DELEGATES
        this.$router.push(route)
      },
      goToHistory() {
        let route = this.$routes.DELEGATIONS.DELEGATE_HISTORY
        let params = {taxCode: this.delegate.codice_fiscale_delega}
        this.$router.push({name: route.name, params})
      },
      async saveDelegations() {

        this.isSaving = true

        let {cf} = this.user
        let delegateCf = this.delegate.codice_fiscale_delega

        // @NOTE: deepClone() genera un problema con il clone delle date: quando prova a fare il clone dell'oggetto
        //        data restituisce un oggetto vuoto
        // let data = deepClone(this.delegate)
        let data = JSON.parse(JSON.stringify(this.delegate))
        // let newDelegations = deepClone(this.editableDelegations)
        let newDelegations = JSON.parse(JSON.stringify(this.editableDelegations))
        // let newDelegations = deepClone(getDelegationPayload(this.editableDelegations))

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

          // se si tratta di una nuova delega mai attivata che non è stata modificata
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

          // se lo stato non è cambiato => se la delega era attiva controllo se l'utente ha modificato la data di fine
          // altrimenti non faccio nulla
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

          // se lo stato è cambiato ed è passato da "scaduta" o "revocata" o "rifiutata" ad "attiva"
          // => rimuoviamo le date di revoca e rinuncia e rimpiazziamo la delega iniziale con quella nuova
          if ([statuss.EXPIRED, statuss.REVOKED, statuss.REFUSED].includes(initialDelegation.stato_delega) && isActive) {
            delete nd.data_revoca_delega
            delete nd.data_rinuncia_delega
            console.debug('Delega riattivata:', nd)
            data.deleghe = data.deleghe.map(d => d.uuid === initialDelegation.uuid ? nd : d)
            return
          }

          // se lo stato è cambiato ed è passato da "attiva" o "in sacendza" a "revocata"
          // => inseriamo la nuova delega al posto di quella iniziale
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
          this.delegate = response.data
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


<style scoped></style>
