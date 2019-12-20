
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped>
  .separator {
    width: 4px;
  }
</style>


<template>
  <div class="row flex-inline" :class="{'reverse': iconRight}">
    <div>
      <q-icon slot="icon" size="20px" :name="iconName" :color="iconColor"></q-icon>
    </div>
    <div class="separator"></div>
    <div>
      <span slot="label" class="q-caption">{{statusLabel}}</span>
    </div>
  </div>
</template>


<script>
  import {getDelegationStatusLabel} from '@services/delegations/business-logic'
  import config from '@configs'


  const ICON_MAP = {
    [config.delegations.delegationStatuss.ACTIVE]: {name: 'check_circle', color: 'positive'},
    [config.delegations.delegationStatuss.IS_EXPIRING]: {name: 'check_circle', color: 'warning'},
    [config.delegations.delegationStatuss.REFUSED]: {name: 'mdi-close-circle', color: 'negative'},
    [config.delegations.delegationStatuss.REVOKED]: {name: 'remove_circle', color: 'warning'},
    [config.delegations.delegationStatuss.NOT_ACTIVE]: {name: 'mdi-close-circle', color: 'faded'},
    [config.delegations.delegationStatuss.EXPIRED]: {name: 'mdi-close-circle', color: 'faded'},
  }


  export default {
    name: 'CsiDelegationsListItemStatus',
    components: {},
    props: {
      status: {type: String, required: true},
      iconRight: {type: Boolean, required: false, default: false}
    },
    computed: {
      statusLabel() {
        return getDelegationStatusLabel(this.status)
      },
      iconName() {
        return ICON_MAP[this.status].name
      },
      iconColor() {
        return ICON_MAP[this.status].color
      }
    }
  }
</script>
