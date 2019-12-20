
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-inner-loading :visible="visible">

    <template v-if="noTransition">
      <img src="statics/icons/icon_hdpi.png" alt="Icona la mia salute" class="responsive block">
      <q-spinner-dots size="50px" color="faded" class="q-mt-sm block" />
    </template>

    <template v-else>
      <transition enter-active-class="animated fadeInDown" appear>
        <img src="statics/icons/icon_hdpi.png" alt="Icona la mia salute" class="responsive block"
             style="animation-duration: 2s">
      </transition>
      <transition enter-active-class="animated fadeInUp" appear>
        <q-spinner-dots size="50px" color="faded" class="q-mt-sm block" style="animation-delay: 700ms" />
      </transition>
    </template>

  </q-inner-loading>
</template>


<script>
  export default {
    name: 'CsiAppBootstrapLoader',
    components: {},
    props: {
      visible: {type: Boolean, required: true},
      noTransition: {type: Boolean, required: false, default: false}
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


<style scoped lang="stylus"></style>
