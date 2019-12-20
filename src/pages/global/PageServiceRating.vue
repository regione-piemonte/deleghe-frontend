
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page padding>
    <csi-page-title :title="pageTitle" @back="onBack" class="q-mb-md" />
    <csi-policy v-if="link" :src="link" :iframe-styles="{height: '780px'}" />
  </q-page>
</template>


<script>

  import {config} from '@plugins/config'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import CsiPolicy from 'components/global/common/CsiPolicy'

  const LINK_MAP = {
    [config.global.appServiceCodes.onlineReports]: 'https://webform.portali.csi.it/it/form/ritiro-referti-customer-satisfac',
    [config.global.appServiceCodes.delegations]: 'https://webform.portali.csi.it/it/form/gestione-deleghe-customer-satisf',
    [config.global.appServiceCodes.healthPayments]: 'https://webform.portali.csi.it/it/form/pagamenti-sanitari-customer-sati',
  }

  export default {
    name: 'PageServiceRating',
    components: {CsiPolicy, CsiPageTitle},
    data() {
      return {}
    },
    computed: {
      serviceCode() {
        return this.$route.query.servizio
      },
      service() {
        if (!this.serviceCode) return
        return this.$store.getters['global/appService'](this.serviceCode)
      },
      serviceName() {
        if (!this.service) return ''
        return this.service.descrizione
      },
      pageTitle() {
        return `Valuta il servizio ${this.serviceName}`
      },
      link() {
        return LINK_MAP[this.serviceCode]
      }
    },
    methods: {
      onBack() {
        this.$router.back()
      }
    }
  }
</script>


<style scoped lang="stylus"></style>
