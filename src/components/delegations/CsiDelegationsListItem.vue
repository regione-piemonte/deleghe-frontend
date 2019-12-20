
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped></style>


<template>
  <q-item>

    <q-item-main>
      <div class="row items-center gutter-x-xs">
        <div class="q-body-2 col-12 col-sm">
          {{serviceName}}
        </div>
        <div class="q-body-1 col-12 col-sm">
          <span>Attiva fino al </span>
          <span class="q-body-2">{{delegation.data_fine_delega | format}}</span>
        </div>
        <div v-if="isExpiring" class="q-caption col-12 col-sm">
          <strong>In scadenza</strong>
        </div>
      </div>
    </q-item-main>

    <q-item-side class="column items-center">
      <csi-delegations-list-item-status :status="delegation.stato_delega" icon-right />
    </q-item-side>
  </q-item>
</template>


<script>
  import CsiDelegationsListItemStatus from 'components/delegations/CsiDelegationsListItemStatus'

  export default {
    name: 'CsiDelegationsListItem',
    components: {CsiDelegationsListItemStatus},
    props: {
      delegation: {type: Object, required: true}
    },
    computed: {
      isExpiring() {
        return this.delegation.stato_delega === this.$config.delegations.delegationStatuss.IS_EXPIRING
      },
      serviceName() {
        let serviceCode = this.delegation.codice_servizio
        let appService = this.$store.getters['global/appService'](serviceCode)
        return appService ? appService.descrizione : ''
      },
    },
  }
</script>
