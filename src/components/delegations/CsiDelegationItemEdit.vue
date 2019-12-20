
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped></style>


<template>
  <div class="row gutter-y-xs gutter-x-sm">

    <div class="col-xs-12 col-md column">
      <!-- TOGGLE + TOOLTIP DESCRIZIONE -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <div class="row align-center gutter-x-sm">
        <!-- TOGGLE -->
        <div>
          <q-field>
            <q-toggle
              :value="isActive"
              @change="onChangeStatus">
              <div class="q-body-2 q-ml-sm">{{serviceName}}</div>
            </q-toggle>
          </q-field>
        </div>

        <!-- TOOLTIP DESCRIZIONE -->
        <div>
          <q-btn icon="info" flat round dense color="faded">
            <q-tooltip>
              <div v-html="$t(description)"></div>
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <!-- STATO ATTUALE + DATE VALIDITA' ATTUALI -->
      <!-- ----------------------------------------------------------------------------------------------------------- -->
      <div class="row gutter-x-sm items-center">
        <!-- STATO -->
        <div class="col-auto column justify-center">
          <csi-delegations-list-item-status :status="status" />
        </div>

        <!-- DATE VALIDITA' ATTUALI -->
        <div class="col row">
          <div v-if="isInitialDelegationActive" class="q-body-1 row items-center">
            <span>{{initialDelegation.data_inizio_delega | format}}</span>
            <span class="q-px-xs">-</span>
            <span>{{initialDelegation.data_fine_delega | format}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- INPUT DATE -->
    <!-- --------------------------------------------------------------------------------------------------------- -->
    <div class="col-xs-12 col-md row gutter-xs items-baseline" v-if="isActive">

      <!-- La data iniziale di una delega è sempre "Oggi" tranne per le deleghe -->
      <!-- già attive, quelle hanno la data iniziale impostata a quando sono state create -->
      <div class="col-12 col-md">
        <span>Dal <strong>{{startDate | format}}</strong></span>
      </div>

      <div class="col-12 col-md">
        <q-field>
          <csi-input-datetime
            type="date"
            :value="endDate"
            @change="onChangeEndDate"
            float-label="Al"
            :min="minEndDate"
            :max="maxEndDate"
          />
        </q-field>
      </div>

      <div v-if="hasErrors" class="q-body-2 col-12 q-caption text-negative">
        Entrambe le date devono essere impostate. La delega non può finire prima di iniziare.
      </div>
    </div>
  </div>
</template>


<script>
  import isBefore from 'date-fns/is_before'
  import addDays from 'date-fns/add_days'
  import max from 'date-fns/max'
  import CsiDelegationsListItemStatus from 'components/delegations/CsiDelegationsListItemStatus'
  import CsiInputDatetime from 'components/global/forms/CsiInputDatetime'
  import {
    getDelegationDaysInterval,
    getServiceDescriptionI18n,
    isDelegationValid
  } from '@services/delegations/business-logic'
  import {deepClone, isNil} from '@services/global/utils'

  export default {
    name: 'CsiDelegationItemEdit',
    components: {CsiInputDatetime, CsiDelegationsListItemStatus},
    props: {
      delegation: {type: Object, required: true}
    },
    data() {
      return {
        initialDelegation: undefined,
      }
    },
    computed: {
      status() {
        return this.delegation.stato_delega
      },
      serviceCode() {
        return this.delegation.codice_servizio
      },
      description() {
        return getServiceDescriptionI18n(this.serviceCode)
      },
      startDate() {
        return this.delegation.data_inizio_delega
        return this.isInitialDelegationActive ?
          this.initialDelegation.data_inizio_delega :
          max(this.delegation.data_inizio_delega, this.now)
      },
      // Se la delega iniziale è attiva => proponiamo come data di fine il massimo tra adesso e la data di fine delega
      // Se la delega iniziale non è attiva => proponiamo come data di fine adesso + il numero di giorni delegabili del servizio
      endDate() {
        return this.delegation.data_fine_delega
        let dayDifference = getDelegationDaysInterval(this.service)
        let upperBound = addDays(this.now, dayDifference)

        return this.isInitialDelegationActive ?
          max(this.delegation.data_fine_delega, this.now) :
          upperBound
      },
      isActive() {
        return isDelegationValid(this.status)
      },
      isInitialDelegationActive() {
        return this.initialDelegation && isDelegationValid(this.initialDelegation.stato_delega)
      },
      service() {
        return this.$store.getters['global/appService'](this.serviceCode)
      },
      serviceName() {
        return this.service.descrizione
      },
      serviceDaysInterval() {
        return getDelegationDaysInterval(this.service)
      },
      now() {
        return new Date()
      },
      minEndDate() {
        return addDays(this.startDate, 1)
      },
      maxEndDate() {
        return addDays(this.now, this.serviceDaysInterval)
      },
      hasErrors() {
        if (!this.isActive) return false
        let startDate = this.delegation.data_inizio_delega
        let endDate = this.delegation.data_fine_delega
        let allDatesSelected = !isNil(startDate) && !isNil(endDate)
        return !allDatesSelected || !isBefore(startDate, endDate)
      }
    },
    watch: {
      hasErrors(newValue, oldValue) {
        newValue ? this.$emit('error') : this.$emit('valid')
      },
      delegation: {
        immediate: true,
        handler(newValue, oldValue) {
          this.initialDelegation = deepClone(newValue)
        }
      }
    },
    methods: {
      onChangeStatus(newValue) {
        this.$emit('change-status', newValue)
      },
      onChangeStartDate(newValue) {
        this.$emit('change-start-date', newValue)
      },
      onChangeEndDate(newValue) {
        this.$emit('change-end-date', newValue)
      },
    }
  }
</script>
