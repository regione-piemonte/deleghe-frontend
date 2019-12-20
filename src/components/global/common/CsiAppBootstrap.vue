
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <div class="csi-app-bootstrap">
    <slot v-if="!isLoading" />

    <!-- LOADING -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <csi-app-bootstrap-loader :visible="isLoading" no-transition />
  </div>
</template>


<script>
  import {isEmpty, isNil} from '@services/global/utils'
  import CsiAppBootstrapLoader from 'components/global/common/CsiAppBootstrapLoader'

  export default {
    name: 'CsiAppBootstrap',
    components: {CsiAppBootstrapLoader},
    props: {},
    data() {
      return {
        isLoading: true,
        configuration: null,
      }
    },
    computed: {
      isAppUpdateMandatory() {
        return this.$store.getters['global/isAppUpdateMandatory']
      }
    },
    methods: {},
    async created() {

      console.debug('App config static:', this.$config)
      this.isLoading = true
      this.configuration = await this.$store.dispatch('global/loadAppConfig')
      console.debug('App config dynamic:', this.configuration)

      // Se non riusciamo a scaricare la configurazione dell'app non possiamo capire se la versione attuale
      // dell'app è supportata oppure se i servizi sono in manutenzione ecc.
      // Per questo motivo siamo costretti a redirigere nella pagina di errore di bootstrap
      if (isNil(this.configuration)) {
        this.$router.push(this.$routes.ERRORS.ERROR_BOOTSTRAP)
        this.isLoading = false
        return
      }

      // Se l'update dell'app è obbligatorio => è inutile richiedere altri dati al server
      if (this.isAppUpdateMandatory) {
        this.isLoading = false
        return
      }


      let servicesPromise = this.$store.dispatch('global/loadAppServices')
      let userPromise = this.$store.dispatch('global/loadUser')

      let services = await servicesPromise
      let user = await userPromise

      if (isNil(services) || isEmpty(services)) {
        this.$router.push(this.$routes.ERRORS.ERROR_BOOTSTRAP)
        this.isLoading = false
        return
      }

      // @NOTE: aspettiamo la fine del loading iniziale prima di aggiungere il controllo della navigazione
      // delle route. In questo modo non viene invocato quando non abbiamo tutti i dati restituendo falsi negativi

      // Dopo aver impostato gli hook del router
      // effettuiamo manualmente il primo controllo

      // aspettiamo che il router sia pronto prima di ottenere la route dall'URL
      // altrimenti potrebbe non ottenere la route corretta
      this.$router.onReady(() => {
        console.debug('[FirstAccess] Router ready')
        console.debug('[FirstAccess] Router:', this.$router)
        console.debug('[FirstAccess] Route:', this.$route)
        console.debug('[FirstAccess] matched:', this.$router.getMatchedComponents())
        console.debug('[FirstAccess] current:', this.$router.history.current)

        // Impostiamo la route corrente perchè c'è un bug in Vue Router
        // @see https://github.com/vuejs/vue-router/issues/2385
        let resolved = this.$router.resolve(window.location, this.$router.history.current)
        // let resolved = this.$router.resolve(window.location)
        let route = resolved.route
        console.debug('[FirstAccess] resolved:', resolved)
        console.debug('[FirstAccess] routeResolved:', route)
        console.debug('-------------------------')

        this.isLoading = false
      })

      // Evitiamo di spaccare completamente l'app
      // In questo modo è sempre possibile aggiornarla
      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    }
  }
</script>


<style scoped lang="stylus"></style>
