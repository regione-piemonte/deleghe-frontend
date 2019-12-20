
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped>

  .csi-icon-base-wrapper {
    display: inline-block;
  }

  .csi-icon-base-wrapper.has-bg {
    box-sizing: content-box;
    padding: 16px;
  }

  .csi-icon-base-wrapper.bg-round {
    border-radius: 50%;
  }
</style>


<template>
  <div class="csi-icon-base-wrapper"
       :class="[{'has-bg': hasBg, 'bg-round': bgRound}]">
    <svg xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         viewBox="0 0 40 40"
         :aria-labelledby="iconName"
         role="presentation">

      <title :id="iconName">{{ iconName }} icon</title>
      <g>
        <slot />
      </g>
    </svg>
  </div>
</template>


<script>
  export default {
    name: 'CsiIconBase',
    props: {
      iconName: {type: String, default: 'box'},
      width: {type: [Number, String], default: '100%'},
      height: {type: [Number, String], default: '100%'},
      hasBg: {type: Boolean, default: false},
      bgRound: {type: Boolean, default: false},
    }
  }
</script>
