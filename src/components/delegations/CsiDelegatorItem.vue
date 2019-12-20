
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style></style>


<template>
  <div>

    <q-card>

      <q-item>
        <q-item-side>
          <q-item-main>
            <csi-icon-base class="csi-svg-icon--lg">
              <csi-icon-avatar-person :is-female="delegator.sesso_delega === 'F'" />
            </csi-icon-base>
          </q-item-main>
        </q-item-side>
        <q-item-main>
          <q-item-tile class="q-body-2">{{delegatorFullName | startCase}}</q-item-tile>
          <q-item-tile class="q-body-1">{{delegator.codice_fiscale_delega}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="more_vert">
            <q-popover>
              <q-list separator link>
                <q-item @click.native="showDialog(validDelegations)" v-close-overlay>
                  Rinuncia a tutti
                </q-item>
              </q-list>
            </q-popover>
          </q-item-tile>
        </q-item-side>
      </q-item>


      <q-card-main class="no-padding">

        <q-list no-border separator>
          <q-list-header class="q-body-1 text-black">Servizi a cui sei stato delegato</q-list-header>
          <q-item v-for="delegation in delegations" :key="delegation.uuid">

            <q-item-main>
              <q-item-tile>
                <div class="row items-center gutter-x-xs">
                  <div class="col col-md-8">
                    <div class="row items-center">
                      <div class="col-12 col-sm-6">
                        <div class="q-body-2">{{getServiceName(delegation)}}</div>
                      </div>
                      <div class="q-body-1 col-12 col-sm-6">
                        {{getText(delegation)}}
                        <strong>{{getDate(delegation) | format}}</strong>
                      </div>
                    </div>
                  </div>

                  <div class="col-auto col-md-4">
                    <csi-delegations-list-item-status :status="delegation.stato_delega" icon-right />
                  </div>
                </div>
              </q-item-tile>


              <q-item-tile v-if="isDelegationValid(delegation.stato_delega)" class="q-mt-sm">
                <csi-buttons>
                  <csi-button secondary label="Rinuncia" @click="showDialog([delegation])" />
                </csi-buttons>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>


      </q-card-main>


      <!-- LOADING -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <q-inner-loading :visible="isLoading">
        <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
      </q-inner-loading>
    </q-card>


    <!-- DIALOG DI CONFERMA -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-dialog
      v-model="isConfirmDialogOpen"
      @ok="removeDelegations">

      <div slot="title" class="q-title">Rinuncia Delega</div>
      <div slot="message">
        Stai per rinunciare alla delega per conto di
        <strong>{{delegatorFullName}}</strong>
        all'utilizzo dei servizi online:
        <ul class="q-mt-md">
          <li v-for="delegation in delegationsToRemove"
              :key="delegation.uuid">
            <strong>{{getServiceName(delegation)}}</strong>
          </li>
        </ul>
      </div>

      <template slot="buttons" slot-scope="props">
        <csi-buttons>
          <csi-button primary color="warning" label="Sì, rinuncia" @click="props.ok" />
          <csi-button secondary label="No, annulla" @click="props.cancel" />
        </csi-buttons>
      </template>
    </q-dialog>

  </div>
</template>


<script>
  import {waiveDelegation} from '@services/api/delegations'
  import {isDelegationValid} from '@services/delegations/business-logic'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'
  import CsiDelegationsListItemStatus from 'components/delegations/CsiDelegationsListItemStatus'

  export default {
    name: 'CsiDelegatorItem',
    components: {CsiDelegationsListItemStatus, CsiIconAvatarPerson, CsiIconBase},
    props: {
      delegator: {type: Object, required: true},
      status: {required: false, default: undefined}
    },
    data() {
      return {
        isLoading: false,
        isConfirmDialogOpen: false,
        delegationsToRemove: [],
      }
    },
    computed: {
      delegatorFullName() {
        return `${this.delegator.nome_delega} ${this.delegator.cognome_delega}`
      },
      delegations() {
        let result = this.delegator.deleghe
        if (this.status) result = result.filter(d => d.stato_delega === this.status)
        return result
      },
      validDelegations() {
        return this.delegations.filter(d => isDelegationValid(d.stato_delega))
      },
    },
    methods: {
      isDelegationValid,
      showDialog(delegations) {
        this.delegationsToRemove = delegations
        this.isConfirmDialogOpen = true
      },
      getServiceName(delegation) {
        let service = this.$store.getters['global/appService'](delegation.codice_servizio)
        return service.descrizione
      },
      getText(delegation) {
        let textMap = {
          [this.$config.delegations.delegationStatuss.ACTIVE]: 'Valida fino al',
          [this.$config.delegations.delegationStatuss.IS_EXPIRING]: 'Valida fino al',
          [this.$config.delegations.delegationStatuss.UPDATED]: 'Valida fino al',
          [this.$config.delegations.delegationStatuss.EXPIRED]: 'Valida fino al',
          [this.$config.delegations.delegationStatuss.REFUSED]: 'Rifiutata il',
          [this.$config.delegations.delegationStatuss.REVOKED]: 'Revocata il',
        }

        return textMap[delegation.stato_delega]
      },
      getDate(delegation) {
        let propMap = {
          [this.$config.delegations.delegationStatuss.ACTIVE]: 'data_fine_delega',
          [this.$config.delegations.delegationStatuss.IS_EXPIRING]: 'data_fine_delega',
          [this.$config.delegations.delegationStatuss.UPDATED]: 'data_fine_delega',
          [this.$config.delegations.delegationStatuss.EXPIRED]: 'data_fine_delega',
          [this.$config.delegations.delegationStatuss.REFUSED]: 'data_rinuncia_delega',
          [this.$config.delegations.delegationStatuss.REVOKED]: 'data_revoca_delega',
        }

        let prop = propMap[delegation.stato_delega]
        return delegation[prop]
      },
      async removeDelegations() {

        let {cf} = this.$store.getters['global/user']
        let delegatorCf = this.delegator.codice_fiscale_delega

        let promises = this.delegationsToRemove.map(d => waiveDelegation(cf, delegatorCf, d.uuid))

        try {
          this.isLoading = true
          let response = await Promise.all(promises)
          this.delegationsToRemove.forEach(d => d.stato_delega = this.$config.delegations.delegationStatuss.REFUSED)
          this.delegationsToRemove = []
        } catch (error) {

          // @TODO: attualmente gestiamo l'errore di richiesta verso il notificatore restituito dal server
          //        in futuro, sarà sistemato e dovremo togliere questo codice
          let success = false
          if (error.response && error.response.data && error.response.data.detail) {
            error.response.data.detail.forEach(d => {
              if (d.valore && d.valore.toLowerCase().includes(`non esiste una delega servizio per l'uuid`)) success = true
            })
          }


          if (success) {
            console.debug('We catch the fake error... good!')
            this.delegationsToRemove.forEach(d => d.stato_delega = this.$config.delegations.delegationStatuss.REFUSED)
            this.delegationsToRemove = []
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'Non è stato possibile effettuare la rinuncia',
            })
          }
        }

        this.isLoading = false
      },
    },
  }
</script>
