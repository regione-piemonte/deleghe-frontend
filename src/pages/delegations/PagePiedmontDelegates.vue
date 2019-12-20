
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style></style>


<template>
  <q-page padding>

    <div v-if="!isLoading">

      <!-- STATO VUOTO -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <div v-if="isEmpty(delegates)" class="flex-center">
        <q-card>
          <q-card-main>
            <csi-banner image-src="statics/images/banners/delegates-empty.svg">
              <template slot="text">
                <p>
                  Questo servizio permette ad un cittadino maggiorenne (delegante) di abilitare un altro cittadino
                  adulto
                  (delegato) ad operare sui servizi on line in sua vece quali: pagamento dei ticket, ritiro dei referti,
                  richieste di esenzioni, e gli altri servizi on line che verranno rilasciati in futuro.
                  Il soggetto delegato (figlio, familiare, persona di fiducia, ecc.) potrà quindi operare in nome e per
                  conto
                  del soggetto delegante.
                </p>
                <q-btn
                  @click="$router.push($routes.DELEGATIONS.NEW_DELEGATE)"
                  color="primary"
                  class="full-width">
                  Nuova delega
                </q-btn>
              </template>
            </csi-banner>
          </q-card-main>
        </q-card>
      </div>

      <!-- STATO PIENO -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <div v-else>
        <div class="row items-center gutter-sm">

          <!-- FILTRI -->
          <!-- ----------------------------------------------------------------------------------------------------- -->
          <csi-delegations-filters
            :service="serviceSelected"
            :status="statusSelected"
            class="col-12 col-md"
            @service-change="onServiceSelected"
            @status-change="onStatusSelected"
          />

          <div class="col-12 col-md-auto" :class="$q.screen.lt.md ? 'order-first' : 'order-last'">
            <q-btn @click="$router.push($routes.DELEGATIONS.NEW_DELEGATE)"
                   color="primary"
                   class="full-width">
              Nuova delega
            </q-btn>
          </div>
        </div>

        <!-- LISTA DELEGATI -->
        <!-- ------------------------------------------------------------------------------------------------------- -->
        <div class="q-mt-md csi-group-card">

          <div v-if="isEmpty(filteredDelegates)">
            Nessun risultato trovato in base ai filtri impostati
          </div>

          <csi-delegate-item
            v-for="delegate in filteredDelegates"
            :key="delegate.uuid"
            :delegate="delegate"
            :status="statusSelected"
            @handle="goToEdit(delegate)"
          />
        </div>

      </div>
      <div class="q-py-md text-right">
        <router-link :to="$routes.DELEGATIONS.POLICY">Termini e condizioni d'uso</router-link>
      </div>
    </div>


    <!-- LOADER -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="isLoading" class="bg-transparent">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>
  import CsiDelegateItem from 'components/delegations/CsiDelegateItem'
  import CsiDelegateHandleItem from 'components/delegations/CsiDelegateHandleItem'
  import CsiDelegationsFilters from 'components/delegations/CsiDelegationsFilters'
  import CsiBanner from 'components/global/common/CsiBanner'
  import {getDelegates} from '@services/api/delegations'
  import {isEmpty, isNil} from '@services/global/utils'
  import CsiDelegateEditModal from 'components/delegations/CsiDelegateEditModal'

  export default {
    name: 'PagePiedmontDelegates',
    components: {CsiDelegateEditModal, CsiDelegationsFilters, CsiDelegateHandleItem, CsiDelegateItem, CsiBanner},
    data() {
      return {
        isLoading: true,
        serviceSelected: undefined,
        statusSelected: null,
        delegates: [],
        isEditModalOpen: false,
        editingDelegate: {},
      }
    },
    computed: {
      filteredDelegates() {
        let result = this.delegates
        if (!isNil(this.serviceSelected)) {
          result = result.filter(delegate => delegate.deleghe.some(d => d.codice_servizio === this.serviceSelected))
        }

        if (!isNil(this.statusSelected)) {
          result = result.filter(delegate => delegate.deleghe.some(d => d.stato_delega === this.statusSelected))
        }

        return result
      }
    },
    async created() {
      let user = this.$store.getters['global/user']
      this.isLoading = true
      let response = await getDelegates(user.cf)
      this.delegates = response.data
      this.isLoading = false
    },
    methods: {
      isEmpty,
      goToEdit(delegate) {
        let route = this.$routes.DELEGATIONS.PIEDMONT_DELEGATE_EDIT
        let params = {delegateCf: delegate.codice_fiscale_delega, delegate: delegate}
        this.$router.push({name: route.name, params})
      },
      onServiceSelected(newValue) {
        this.serviceSelected = newValue
      },
      onStatusSelected(newValue) {
        this.statusSelected = newValue
      },
      onDelegateUpdate(newVal) {
        this.delegates = this.delegates.map(d => d.codice_fiscale_delega === newVal.codice_fiscale_delega ? newVal : d)
        this.editingDelegate = {}
        this.isEditModalOpen = false
      }
    },
  }
</script>
