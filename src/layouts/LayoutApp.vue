
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-layout>

    <!-- APP HEADER -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <csi-app-header
      no-menu-button
      @logo-click="$router.push($routes.GLOBAL.APP)">

      <template slot="toolbar-right">
        <q-btn v-if="!isUserLogged" @click="onLogin" flat dense>
          Accedi
        </q-btn>

        <div v-else>
          <q-btn flat round dense class="bg-tertiary q-ml-xs">
            {{user.nome.charAt(0).toUpperCase()}}{{user.cognome.charAt(0).toUpperCase()}}
            <q-tooltip>{{user.nome}} {{user.cognome}}</q-tooltip>
          </q-btn>
        </div>
      </template>
    </csi-app-header>


    <!-- PAGE CONTAINER -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>


    <!-- FOOTER -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <csi-app-footer :no-rating="!isRatingVisible" @rating-click="goToRatingPage" />
  </q-layout>
</template>


<script>
  import {login, logout} from '@services/global/session'
  import CsiAppFooter from 'components/global/common/CsiAppFooter'
  import CsiAppHeader from 'components/global/common/CsiAppHeader'

  export default {
    name: 'LayoutApp',
    components: {CsiAppHeader, CsiAppFooter},
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.getters['global/user']
      },
      isUserLogged() {
        return this.$store.getters['global/isUserLogged']
      },
      isRatingVisible() {
        return this.$route && this.$route.meta && this.$route.meta.appServiceCode
      },
    },
    created() {
    },
    methods: {
      onLogin() {
        login()
      },
      onLogout() {
        logout()
      },
      goToRatingPage() {
        if (!this.$route.meta || !this.$route.meta.appServiceCode) return
        let query = {servizio: this.$route.meta.appServiceCode}
        let route = {name: this.$routes.GLOBAL.SERVICE_RATING.name, query}
        this.$router.push(route)
      },
    },
  }
</script>


<style></style>
