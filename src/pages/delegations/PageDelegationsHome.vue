
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>


<template>
  <q-page padding>
    <!-- LOADER -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="true" class="bg-transparent">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>

  export default {
    name: 'PageDelegationsHome',
    data() {
      return {}
    },
    computed: {
      isUserLogged() {
        return this.$store.getters['global/isUserLogged']
      },
      isPiedmontUser() {
        return this.$store.getters['global/isPiedmontUser']
      }
    },
    created() {
      if (!this.isUserLogged) return

      // Se l'utente non è piemontese deve atterrare per forza sulla pagina con la lista dei deleganti
      if (!this.isPiedmontUser) {
        this.goToNoPiedmontHome()
        return
      }

      // se l'utente invece è piemontese può atterrare su una delle 3 tab,
      // perciò se nella query string abbiamo il parametro tab, lo usaiamo per decidere su quale delle 3 atterrare.
      let {tab} = this.$route.query

      // di default effettuiamo il redirect alla home
      let route = this.$routes.DELEGATIONS.PIEDMONT
      // Se ci dicono di andare sul tab "deleganti" => andiamo sul tab deleganti
      if (tab === 'deleganti') route = this.$routes.DELEGATIONS.PIEDMONT_DELEGATORS
      // Se ci dicono di andare sul tab "minori" => andiamo sul tab minori
      else if (tab === 'minori') route = this.$routes.DELEGATIONS.PIEDMONT_MINORS

      this.$router.push(route)
    },
    methods: {
      goToNoPiedmontHome() {
        this.$router.push(this.$routes.DELEGATIONS.NO_PIEDMONT)
      }
    },
  }
</script>
