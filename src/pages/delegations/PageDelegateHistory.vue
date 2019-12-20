
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>


<template>
  <q-page padding>

    <csi-page-title title="Storico assegnazione deleghe" @back="onBack" />

    <div v-if="!isLoading" class="q-mt-md">

      <div v-if="delegateResponseError">

        <div v-if="hasClientError" class="group">
          <q-alert color="negative">
            <p>Non è stato possibile trovare il delegato</p>
            <p>
              Per favore, se <strong>{{taxCode}}</strong> è il codice fiscale di un tuo delegato, riprova.
            </p>
          </q-alert>

          <q-btn color="primary" class="full-width" @click="loadDelegate">Riprova</q-btn>
        </div>

        <div v-if="hasServerError" class="group">
          <q-alert color="negative">
            Non è stato possibile ottenere il delegato
          </q-alert>

          <q-btn color="primary" class="full-width" @click="loadDelegate">Riprova</q-btn>
        </div>
      </div>


      <q-card v-else>

        <q-item>
          <q-item-side>
            <q-item-tile>
              <csi-icon-base class="csi-svg-icon--lg">
                <csi-icon-avatar-person :is-female="delegate.sesso_delega === 'F'" />
              </csi-icon-base>
            </q-item-tile>
          </q-item-side>
          <q-item-main class="text-bold">
            <q-item-tile label>{{delegateFullName}}</q-item-tile>
            <q-item-tile sublabel>{{delegate.codice_fiscale_delega}}</q-item-tile>
          </q-item-main>
        </q-item>

        <q-card-main>

          <q-table
            :data="delegate.deleghe"
            :columns="columns"
            row-key="name"
            :pagination.sync="tablePagination"
            hide-bottom
            class="shadow-0">

            <!-- Colonna "Servizio" -->
            <q-td slot="body-cell-service" slot-scope="props" :props="props">
              {{ getServiceName(props.value)}}
            </q-td>

            <!-- Colonna "Attiva dal" -->
            <q-td slot="body-cell-from" slot-scope="props" :props="props">
              {{ props.value | format}}
            </q-td>

            <!-- Colonna "Fino al" -->
            <q-td slot="body-cell-to" slot-scope="props" :props="props">
              {{ props.value | format}}
            </q-td>

            <!-- Colonna "Stato" -->
            <q-td slot="body-cell-state" slot-scope="props" :props="props">
              <csi-delegations-list-item-status :status="props.value" />
            </q-td>

          </q-table>


        </q-card-main>
      </q-card>

    </div>

    <!-- LOADING -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="isLoading" class="bg-transparent">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>
  import {getDelegate} from '@services/api/delegations'
  import CsiDelegationsListItemStatus from 'components/delegations/CsiDelegationsListItemStatus'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import {isClientError, isResponseError, isServerError} from '@services/api/utils'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'

  const COLUMN_SERVICE = {
    name: 'service',
    label: 'Servizio',
    field: 'codice_servizio',
    align: 'left',
    sortable: true,
  }

  const COLUMN_FROM = {
    name: 'from',
    label: 'Attivo dal',
    field: 'data_inizio_delega',
    align: 'left',
    sortable: true,
  }

  const COLUMN_TO = {
    name: 'to',
    label: 'Fino al',
    field: 'data_fine_delega',
    align: 'left',
    sortable: true,
  }

  const COLUMN_STATE = {
    name: 'state',
    label: 'Stato',
    field: 'stato_delega',
    align: 'center',
  }


  const TABLE_PAGINATION = {
    rowsPerPage: 0
  }


  export default {
    name: 'PageDelegateHistory',
    components: {CsiIconAvatarPerson, CsiIconBase, CsiPageTitle, CsiDelegationsListItemStatus},
    data() {
      return {
        isLoading: true,
        delegateResponse: undefined,
        columns: [
          COLUMN_SERVICE,
          COLUMN_FROM,
          COLUMN_TO,
          COLUMN_STATE,
        ],
        tablePagination: TABLE_PAGINATION
      }
    },
    computed: {
      taxCode() {
        return this.$route.params.taxCode
      },
      delegateResponseSuccess() {
        if (!isResponseError(this.delegateResponse)) return this.delegateResponse
      },
      delegateResponseError() {
        if (isResponseError(this.delegateResponse)) return this.delegateResponse
      },
      delegate() {
        if (!this.delegateResponseSuccess) return {}
        return this.delegateResponseSuccess.data
      },
      delegateFullName() {
        return `${this.delegate.nome_delega} ${this.delegate.cognome_delega}`
      },
      hasServerError() {
        return this.delegateResponseError && isServerError(this.delegateResponseError)
      },
      hasClientError() {
        return this.delegateResponseError && isClientError(this.delegateResponseError)
      }
    },
    async created() {
      this.loadDelegate()
    },
    methods: {
      onBack() {
        this.$router.go(-1)
      },
      async loadDelegate() {

        try {
          let user = this.$store.getters['global/user']
          this.isLoading = true
          this.delegateResponse = await getDelegate(user.cf, this.taxCode)
        } catch (errorResponse) {
          this.delegateResponse = errorResponse
        } finally {
          this.isLoading = false
        }

      },
      getServiceName(serviceCode) {
        let service = this.$store.getters['global/appService'](serviceCode)
        return service.descrizione
      },
    }
  }
</script>
