
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-layout-header reveal>

    <slot name="before-toolbar" />

    <!-- MAIN TOOLBAR -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-toolbar>
      <slot name="toolbar-left">
        <q-btn v-if="!noMenuButton" flat round dense icon="menu" @click="$emit('menu-click')" />
      </slot>

      <q-toolbar-title @click.native="$emit('logo-click')" class="cursor-pointer">
        <img
          src="statics/images/logo-la-mia-salute.png"
          alt="La mia salute"
          class="vertical-middle csi-app-logo"
        >
        <!--<span slot="subtitle">Sottotitolo</span>-->
      </q-toolbar-title>


      <slot name="toolbar-right" />
    </q-toolbar>


    <slot name="after-toolbar" />
  </q-layout-header>
</template>


<script>
  export default {
    name: 'CsiAppHeader',
    components: {},
    props: {
      noMenuButton: {type: Boolean, required: false, default: false}
    },
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {},
  }
</script>


<style scoped lang="stylus">

</style>
