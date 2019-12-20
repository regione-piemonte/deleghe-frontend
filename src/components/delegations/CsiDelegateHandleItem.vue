
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style></style>


<template>
  <div class="csi-delegate-handle-item">

    <!-- LISTA DI SERVIZI -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-list no-border separator class="no-padding">
      <q-item
        v-for="(delegation, index) in delegations"
        :key="delegation.codice_servizio"
        sparse>
        <q-item-main>
          <csi-delegation-item-edit
            :delegation="delegation"
            @change-status="onStatusChange(delegation, $event)"
            @change-start-date="onStartDateChange(delegation, $event)"
            @change-end-date="onEndDateChange(delegation, $event)"
            @error="onError(delegation, $event)"
            @valid="onValid(delegation, $event)"
          />
        </q-item-main>
      </q-item>
    </q-list>

  </div>
</template>


<script>
  import CsiDelegationItemEdit from 'components/delegations/CsiDelegationItemEdit'

  export default {
    name: 'CsiDelegateHandleItem',
    components: {CsiDelegationItemEdit},
    props: {
      delegations: {type: Array, default: () => []},
      noSelectAll: {type: Boolean, default: false},
    },
    data() {
      return {
        errorsCount: 0,
      }
    },
    computed: {},
    watch: {
      errorsCount(newValue, oldValue) {
        newValue <= 0 ? this.$emit('are-valid') : this.$emit('has-invalid')
      }
    },
    methods: {
      onStatusChange(delegation, newStatus) {
        this.$emit('change-delegation-status', delegation, newStatus)
      },
      onStartDateChange(delegation, newStartDate) {
        this.$emit('change-delegation-start-date', delegation, newStartDate)
      },
      onEndDateChange(delegation, newEndDate) {
        this.$emit('change-delegation-end-date', delegation, newEndDate)
      },
      onError(delegation) {
        this.$emit('delegation-error', delegation)
        this.errorsCount++
      },
      onValid(delegation) {
        this.$emit('delegation-valid', delegation)
        this.errorsCount--
      },
    },
  }
</script>
