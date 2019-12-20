
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
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


  const ICON_MAP = {
    'VALIDA': {name: 'check_circle', color: 'positive', label: 'Attiva'},
    'DA_APPROVARE': {name: 'hourglass_empty', color: 'warning', label: 'In Attesa'},
    'REVOCATA': {name: 'remove_circle', color: 'warning', label: 'Revocata'},
    'REVOCATA_BLOCCO': {name: 'mdi-close-circle', color: 'negative', label: 'Revocata'},
    'SCADUTA': {name: 'mdi-close-circle', color: 'negative', label: 'Scaduta'},
  }

  export default {
    name: 'CsiDeclarationListItemStatus',
    props: {
      status: {type: String, required: true},
      iconRight: {type: Boolean, required: false, default: false}
    },
    computed: {
      statusLabel() {
        return ICON_MAP[this.status].label
      },
      iconName() {
        return ICON_MAP[this.status].name
      },
      iconColor() {
        return ICON_MAP[this.status].color
      }
    },
  }
</script>


<style scoped lang="stylus">
  .separator {
    width: 4px;
  }
</style>
