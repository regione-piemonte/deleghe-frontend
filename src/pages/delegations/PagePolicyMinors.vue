
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page padding>
    <csi-page-title title="Termini e condizioni d'uso" @back="onBack" />
    <csi-policy :src="policyUrl" class="q-mt-md" />
  </q-page>
</template>


<script>
  import CsiPolicy from 'components/global/common/CsiPolicy'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'

  export default {
    name: 'PagePolicyMinors',
    components: {CsiPageTitle, CsiPolicy},
    data() {
      return {}
    },
    computed: {
      policyUrl() {
        return 'statics/terms-and-conditions/delegations-minors.html'
      }
    },
    methods: {
      onBack() {
        this.$router.go(-1)
      }
    },
  }
</script>


<style scoped lang="stylus"></style>
