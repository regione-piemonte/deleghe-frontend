
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped="" lang="stylus"></style>

<template>
  <q-page>
    <csi-page-title title="Aiuto" @back="onBack" class="q-mt-lg q-ml-lg" />
    <q-tabs>
      <q-route-tab
        slot="title"
        label="Contatti"
        :to="CONTACTS"
      />
      <q-route-tab
        slot="title"
        label="FAQ"
        :to="FAQ"
      />
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
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import {CONTACTS, FAQ} from '@router/routes/delegations'
  import PageHelpFaq from 'pages/delegations/PageHelpFaq'
  import PageHelpContacts from 'pages/delegations/PageHelpContacts'

  export default {
    name: 'PageHelp',
    components: {PageHelpFaq, PageHelpContacts, CsiPageTitle},
    data() {
      return {
        CONTACTS,
        FAQ,
        keepAlive: [
          PageHelpFaq.name,
          PageHelpContacts.name,
        ]
      }
    },
    methods: {
      onBack() {
        this.$router.back()
      }
    }
  }

</script>
