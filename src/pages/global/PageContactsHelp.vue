
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>

<template>
  <q-page>
    <csi-page-title title="Aiuto" @back="onBack" class="q-mt-md" />
    <csi-help-contacs></csi-help-contacs>
  </q-page>
</template>

<script>
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import CsiHelpContacs from 'components/global/common/CsiHelpContacs'

  export default {
    name: 'PageContactsHelp',
    components: {CsiPageTitle, CsiHelpContacs},
    data() {
      return {}
    },
    computed: {},
    methods: {
      onBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
