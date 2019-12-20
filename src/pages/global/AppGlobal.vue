
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page padding class="csi-page-global-app-global">

    <!-- CARD LOGIN -->
    <!-- Per attirare l'attenzione dell'utente ed invogliarlo ad autenticarsi -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <div v-if="!isUserLogged" class="q-mb-xl">
      <q-card>
        <q-card-main>

          <div class="row items-center gutter-sm">
            <div class="col-12 col-md-auto" :class="{'text-center': $q.screen.lt.md}">
              <csi-icon-base class="csi-svg-icon--xl">
                <csi-icon-authentication />
              </csi-icon-base>
            </div>

            <div class="col-12 col-md">
              Per utilizzare i servizi de <i>La mia salute</i>, accedi con le tue credenziali
            </div>

            <div class="col-12 col-md-auto">
              <csi-buttons>
                <csi-button primary label="Accedi" @click="onLogin" />
              </csi-buttons>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>


    <!-- LISTA DEI SERVIZI -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <div class="row gutter-sm">
      <div
        v-for="(item, index) in navigation"
        :key="item.meta.navigationLabel"
        class="col-12 col-sm-6 col-lg-4">
        <q-card
          class="csi-home-card"
          @click.native="isInMaintenance(item)"
          :class="{'csi-home-card--unlocked': canUseService(item), 'csi-home-card--locked': !canUseService(item)}">
          <q-item class="csi-home-card-header">
            <q-item-side v-if="item.meta.iconName" :icon="item.meta.iconName" />
            <q-item-side v-if="item.meta.iconComponent">
              <csi-icon-base class="csi-svg-icon--md">
                <component :is="item.meta.iconComponent" class="primary" />
              </csi-icon-base>
            </q-item-side>
            <q-item-main>
              <q-item-tile label class="csi-home-card-header-title">
                {{item.meta.navigationLabel}}
              </q-item-tile>
            </q-item-main>
          </q-item>

          <q-card-main class="csi-home-card-main">
            <p class="csi-home-card-main-text">
              {{item.meta.navigationDescription || ''}}
            </p>
          </q-card-main>

          <q-card-separator class="q-mx-md q-mt-sm" />

          <q-card-actions align="end" class="q-px-md q-py-sm">
            <span v-if="canUseService(item)" class="csi-text--xs">Vai al servizio</span>
            <div v-else class="row items-center gutter-x-xs">
              <div class="col">
                <span class="csi-text--xs">Accedi per usufruire del servizio</span>
              </div>
              <div class="col-auto">
                <q-icon name="lock" class="csi-icon--xs text-grey-8" />
              </div>
            </div>
          </q-card-actions>
        </q-card>

      </div>
    </div>

    <!-- MESSAGGIO VISUALIZZAZIONE SERVIIZI -->
    <q-alert color="info" class="q-mt-md" v-if="$q.platform.is.mobile">
      <div class="q-body-1">
        Per scoprire gli altri servizi accedi da PC. Presto saranno ottimizzati anche per smartphone!
      </div>
    </q-alert>


  </q-page>
</template>


<script>
  import {NAVIGATION} from '@router/navigation'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAuthentication from 'components/global/icons/CsiIconAuthentication'
  import {login} from '@services/global/session'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'


  export default {
    name: 'AppGlobal',
    components: {CsiIconAuthentication, CsiIconBase, CsiPageTitle},
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
      navigation() {
        return NAVIGATION.filter(this.mustShowInHome)
      }
    },
    methods: {
      canUseService(item) {
        return this.isUserLogged || item.route.meta.isPublic
      },
      goToRoute(item) {
        if (!this.canUseService(item)) return
        this.$router.push(item.route)
      },
      // Se siamo su mobile, l'item deve essere mostrato se entrambi i flags sono a false
      mustShowInHome(item) {
        // In test mostriamo sempre tutte le card per comodità
        if (this.$config.global.isTest) return true

        if (!this.$q.platform.is.mobile) return !item.meta.isHiddenInHome
        // if (this.$q.screen.gt.sm) return !item.meta.isHiddenInHome
        return !item.meta.isHiddenInHome && !item.meta.isHiddenInMobileHome
      },
      onLogin() {
        login()
      },
      isInMaintenance(item) {
        this.goToRoute(item)
      }
    }
  }
</script>


<style scoped lang="stylus">

  @require '~variables'

  .csi-home-card
    cursor pointer
    transition all .3s ease

    &--unlocked
      &:hover
        background-color $grey-2

      &:active
        background-color $primary
        color white

    &--locked
      cursor initial
      background-color $grey-2
      box-shadow: $shadow-0
      border 1px solid $grey-5


  /*.csi-home-card-header*/

  .csi-home-card-header-title
    font-weight bold

  .csi-home-card-main
    height 120px

</style>
