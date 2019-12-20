
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>


<template>
  <q-page>

    <q-tabs>
      <q-route-tab
        slot="title"
        label="Chi hai delegato"
        :to="$routes.DELEGATIONS.PIEDMONT_DELEGATES">
      </q-route-tab>
      <q-route-tab
        slot="title"
        label="Chi ti ha delegato"
        :to="$routes.DELEGATIONS.PIEDMONT_DELEGATORS">
      </q-route-tab>
      <q-route-tab
        slot="title"
        label="I tuoi Figli Minori"
        :to="$routes.DELEGATIONS.PIEDMONT_MINORS">
      </q-route-tab>
    </q-tabs>

    <transition
      enter-active-class="animated fadeIn csi-animation-duration--300"
      leave-active-class="animated fadeOut csi-animation-duration--300"
      mode="out-in">
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </q-page>
</template>


<script>
  import PagePiedmontDelegates from 'pages/delegations/PagePiedmontDelegates'
  import PagePiedmontDelegators from 'pages/delegations/PagePiedmontDelegators'
  import PagePiedmontMinors from 'pages/delegations/PagePiedmontMinors'

  export default {
    name: 'PagePiedmont',
    components: {PagePiedmontMinors, PagePiedmontDelegators, PagePiedmontDelegates},
    data() {
      return {
        keepAlive: [
          PagePiedmontDelegates.name,
          PagePiedmontDelegators.name,
          PagePiedmontMinors.name,
        ]
      }
    }
  }
</script>
