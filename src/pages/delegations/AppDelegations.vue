
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>

<template>
  <csi-service-app-page
    toolbar-title="Gestione deleghe"
    portal-target-name="service-toolbar-delegations"
    @title-click="goToServiceHome">

    <template slot="toolbar-title-after">
      <!-- aggiunto -->
      <csi-help-button
        @contacts-click="goToContacts"
        @faq-click="goToFaq"
      />
    </template>

    <transition
      enter-active-class="animated fadeIn csi-animation-duration--300"
      leave-active-class="animated fadeOut csi-animation-duration--300"
      mode="out-in"
    >
      <!-- Qui vengono renderizzate tutte le pagine relative all'accelleratore "Gestione deleghe" -->
      <router-view></router-view>
    </transition>
  </csi-service-app-page>
</template>


<script>
  import CsiServiceAppPage from 'components/global/common/CsiServiceAppPage'
  import CsiHelpButton from 'components/global/common/CsiHelpButton'

  export default {
    name: 'AppDelegations',
    components: {CsiHelpButton, CsiServiceAppPage},
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goToServiceHome() {
        this.$router.push(this.$routes.DELEGATIONS.APP)
      },
      goToContacts() {
        this.$router.push(this.$routes.DELEGATIONS.CONTACTS)
      },
      goToFaq() {
        this.$router.push(this.$routes.DELEGATIONS.FAQ)
      },
    }
  }
</script>
