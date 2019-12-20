
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-btn v-if="!square" flat round icon="help">
    <q-popover style="min-width: 180px;">
      <q-list separator link sparse class="no-padding">
        <q-item v-close-overlay @click.native="$emit('contacts-click')">
          <q-item-main>
            <q-item-tile label>Contatti</q-item-tile>
          </q-item-main>
        </q-item>

        <q-item v-close-overlay @click.native="$emit('faq-click')">
          <q-item-main>
            <q-item-tile label>FAQ</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>

    <q-tooltip>Aiuto</q-tooltip>
  </q-btn>

  <div
    v-else-if="multiple"
    class="row gutter-xs"
    :class="{
      'justify-center': $q.screen.lt.sm,
      'justify-end': $q.screen.gt.xs
    }"
  >
    <div class="col-auto">
      <q-btn
        text-color="white"
        flat
        no-caps
        label="Contatti"
        @click="$emit('contacts-click')"
      />
    </div>

    <div class="col-auto">
      <div class="vl"></div>
    </div>

    <div class="col-auto">
      <q-btn
        text-color="white"
        flat
        no-caps
        label="FAQ"
        @click="$emit('faq-click')"
      />
    </div>
  </div>

  <div v-else>
    <q-btn
      text-color="white"
      label="Aiuto"
      flat
      no-caps
      @click="$emit('help-click')"
    />
  </div>

</template>


<script>
  export default {
    name: 'CsiHelpButton',
    components: {},
    props: {
      square: {type: Boolean, default: false},
      multiple: {type: Boolean, default: false}
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


<style scoped lang="stylus">
  .vl {
    display inline-block
    border-left 1px solid white
    height 100%
  }

</style>
