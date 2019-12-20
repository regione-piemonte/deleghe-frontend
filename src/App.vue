
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <div id="q-app">
    <csi-app-bootstrap>
      <router-view />
    </csi-app-bootstrap>
  </div>
</template>

<script>
  import CsiAppBootstrap from 'components/global/common/CsiAppBootstrap'

  export default {
    name: 'App',
    components: {
      CsiAppBootstrap,
    },
    data() {
      return {}
    },
  }
</script>

<style>
</style>
