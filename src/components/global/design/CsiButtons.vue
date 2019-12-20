
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <div class="csi-buttons row text-right group"
       :class="classes">
    <slot />
  </div>
</template>


<script>
  export default {
    name: 'CsiButtons',
    components: {},
    props: {
      padding: {type: Boolean, required: false, default: false},
    },
    computed: {
      classes() {
        return {
          'q-pa-md': this.padding,
          'reverse': this.$q.screen.gt.xs,
        }
      }
    },
  }
</script>


<style lang="stylus">


</style>
