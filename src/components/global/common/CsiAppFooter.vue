
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-layout-footer>

    <!-- VALUTAZIONE -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <div v-if="!noRating" class="bg-secondary q-px-md q-py-lg row justify-center">
      <div class="text-white row gutter-x-sm no-margin">
        <q-icon name="chat_bubble_outline" class="col-auto csi-icon--md"></q-icon>
        <div class="col cursor-pointer" @click="$emit('rating-click')">
          <div class="q-headline">Valuta questo servizio</div>
          <div class="q-body-1">Aiutaci a migliorare</div>
        </div>
      </div>
    </div>

    <!-- HELP -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <div class="bg-primary q-pa-md">
      <div class="row gutter-y-md justify-between">

        <div class="col-12 col-sm-auto text-center">
          <img src="statics/images/logo-regione-piemonte.svg"
               alt="Regione Piemonte"
               class="csi-logo-regione">
        </div>

        <template v-if="!noHelp">
          <div class="col-12 col-sm column text-white"
               :class="{
           'text-center': $q.screen.lt.sm,
           'text-right': $q.screen.gt.xs,
          }">
            <div class="q-title" style="font-size: 20px;">Hai bisogno di aiuto?</div>


            <csi-help-button
              class="q-title"
              square
              :multiple="buttonCanSee"
              @help-click="goToHelp"
              @contacts-click="goToContacts"
              @faq-click="goToFaq"
            />
          </div>
        </template>
      </div>
    </div>


    <!-- LINKS -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <div class="bg-blue-10 q-pa-md text-white text-center row justify-between items-center gutter-y-md no-margin">

      <div class="col-12 col-sm-auto">
        <div class="q-title">Sistemapiemonte</div>
        <div class="q-caption">Un servizio a cura della regione Piemonte</div>
        <div class="q-caption">P.Iva 02843860012 - CF 80087670016</div>
      </div>


      <div class="col-12 col-sm-auto">
        <img src="statics/images/logo-csi.png" alt="Logo CSI" class="responsive" style="max-width: 96px;">
      </div>
    </div>

    <!-- VERSION -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <div v-if="!noVersion" class="text-right q-caption text-white q-py-xs q-px-md bg-blue-10">
      Versione: <strong>{{$config.global.version}}</strong>
    </div>

  </q-layout-footer>
</template>


<script>

  import {config} from '@plugins/config'
  import {routes} from '@plugins/routes'
  import CsiHelpButton from 'components/global/common/CsiHelpButton'

  const BUTTONS_CODES = [
    config.global.appServiceCodes.delegations,
  ]

  const FAQ_ROUTE_MAP = {
    [config.global.appServiceCodes.delegations]: routes.DELEGATIONS.FAQ,
  }

  const CONTACTS_ROUTE_MAP = {
    [config.global.appServiceCodes.delegations]: routes.DELEGATIONS.CONTACTS,
  }


  export default {
    name: 'CsiAppFooter',
    components: {CsiHelpButton},
    props: {
      noRating: {type: Boolean, required: false, default: false},
      noVersion: {type: Boolean, required: false, default: false},
      noHelp: {type: Boolean, required: false, default: false},
    },
    data() {
      return {
        buttonCanSee: false
      }
    },
    watch: {
      $route(to, from) {
        this.buttonCanSee = BUTTONS_CODES.includes(to.meta.appServiceCode)
      }
    },
    computed: {},
    created() {
      this.buttonCanSee = BUTTONS_CODES.includes(this.$route.meta.appServiceCode)
    },
    methods: {
      goToHelp() {
        let route = this.$routes.GLOBAL.CONTACTS_HELP
        this.$router.push(route)
      },
      goToFaq() {
        let serviceCode = this.$route.meta.appServiceCode
        let params = {flag: true}
        let route = ''
        route = FAQ_ROUTE_MAP[serviceCode]
        this.$router.push({name: route.name, params})
      },
      goToContacts() {
        let serviceCode = this.$route.meta.appServiceCode
        let params = {flag: false}
        let route = CONTACTS_ROUTE_MAP[serviceCode]
        if (!route) route = this.$routes.GLOBAL.CONTACTS_HELP

        this.$router.push({name: route.name, params})

      }
    }
  }
</script>


<style scoped lang="stylus">
  .csi-logo-regione {
    width: 100%;
    max-width: 160px;
    height: auto;
  }
</style>
