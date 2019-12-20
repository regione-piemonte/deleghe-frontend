
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style>
  .csi-policy-link {
    cursor: pointer;
    text-decoration: underline;
  }

</style>


<template>
  <q-card :inline="inline" class="bg-secondary text-white full-height" @click.native="$emit('go')">

    <q-card-title class="text-center">
      <slot name="header">
        <slot name="header-icon">
          <q-icon v-if="headerIcon" :name="headerIcon" size="56px"></q-icon>
        </slot>
        <slot name="title">
          <p v-if="title">{{title}}</p>
        </slot>
      </slot>
    </q-card-title>

    <q-card-main class="text-center">
      <slot></slot>

      <div v-if="policy" class="q-mt-lg q-caption">
        <a @click="isPolicyModalOpen = true" class=csi-policy-link>
          Scopri di più
        </a>
      </div>
    </q-card-main>


    <csi-modal-policy
      v-model="isPolicyModalOpen"
      :policy="policy"
      minimized>
    </csi-modal-policy>

  </q-card>
</template>

<script>
  import CsiModalPolicy from 'components/global/common/CsiModalPolicy'

  export default {
    name: 'CsiCardSelection',
    components: {CsiModalPolicy},
    props: {
      inline: {type: Boolean, required: false, default: true},
      headerIcon: {type: String, required: false, default: ''},
      title: {type: String, required: false, default: ''},
      policy: {type: String, required: false, default: ''},
    },
    data() {
      return {
        isPolicyModalOpen: false,
      }
    }
  }
</script>


