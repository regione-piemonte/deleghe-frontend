
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
      <div v-if="isEmpty(delegators)" class="flex-center">
        <q-card>
          <q-card-main>
            <csi-banner image-src="statics/images/banners/delegators-empty.svg">
              <template slot="text">
                <p>Non hai ancora ricevuto deleghe</p>
              </template>
            </csi-banner>
          </q-card-main>
        </q-card>
      </div>


      <!-- STATO PIENO -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <div v-else>

        <div class="q-title text-primary">Chi ti ha delegato</div>

        <!-- FILTRI -->
        <!-- ------------------------------------------------------------------------------------------------------- -->
        <div class="q-mt-lg">
          <csi-delegations-filters
            :service="serviceSelected"
            :status="statusSelected"
            @service-change="onServiceSelected"
            @status-change="onStatusSelected"
          />
        </div>

        <!-- LISTA DELEGANTI -->
        <!-- ------------------------------------------------------------------------------------------------------- -->
        <div class="q-mt-lg">

          <div v-if="isEmpty(filteredDelegators)">
            Nessun risultato trovato in base ai filtri impostati
          </div>

          <csi-delegator-item
            v-for="delegator in filteredDelegators"
            :key="delegator.uuid"
            :delegator="delegator"
            :status="statusSelected"
            class="q-my-md"
          />
        </div>
      </div>

      <div class="q-py-md text-right">
        <router-link :to="$routes.DELEGATIONS.POLICY">Termini e condizioni d'uso</router-link>
      </div>
    </div>


    <!-- LOADING -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="isLoading" class="bg-transparent">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>
  import CsiDelegatorItem from 'components/delegations/CsiDelegatorItem'
  import CsiDelegationsFilters from 'components/delegations/CsiDelegationsFilters'
  import {getDelegators} from '@services/api/delegations'
  import {intersectionBy, isEmpty, isNil} from '@services/global/utils'
  import {getDefaultDelegationStatus} from '@services/delegations/business-logic'
  import CsiBanner from 'components/global/common/CsiBanner'


  export default {
    name: 'PageNoPiedmontHome',
    components: {CsiBanner, CsiDelegationsFilters, CsiDelegatorItem},
    data() {
      return {
        isLoading: true,
        delegators: [],
        serviceSelected: undefined,
        statusSelected: getDefaultDelegationStatus(),
      }
    },
    computed: {
      adultDelegators() {
        return this.$store.getters['delegations/adultDelegators'](this.delegators)
      },
      serviceDelegators() {
        if (isNil(this.serviceSelected)) return this.delegators
        return this.delegators.filter(delegator => delegator.deleghe.some(d => d.codice_servizio === this.serviceSelected))
      },
      statusDelegators() {
        if (isNil(this.statusSelected)) return this.delegators
        return this.delegators.filter(delegator => delegator.deleghe.some(d => d.stato_delega === this.statusSelected))
      },
      filteredDelegators() {
        return intersectionBy(
          this.adultDelegators,
          this.serviceDelegators,
          this.statusDelegators,
          d => d.uuid
        )
      }
    },
    async created() {
      let user = this.$store.getters['global/user']
      this.isLoading = true
      let response = await getDelegators(user.cf)
      this.delegators = response.data
      this.isLoading = false
    },
    methods: {
      isEmpty,
      onServiceSelected(newValue) {
        this.serviceSelected = newValue
      },
      onStatusSelected(newValue) {
        this.statusSelected = newValue
      },
    }
  }
</script>
