
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped></style>


<template>
  <component :is="iconComponent" />
</template>


<script>
  import CsiIconAvatarMan from 'components/global/icons/CsiIconAvatarManAdd'
  import CsiIconAvatarWoman from 'components/global/icons/CsiIconAvatarWomanAdd'

  export default {
    name: 'CsiIconAvatarPerson',
    props: {
      isFemale: {type: Boolean, required: false, default: false},
      isMinor: {type: Boolean, required: false, default: false}
    },
    computed: {
      iconComponent() {
        if (this.isFemale) return CsiIconAvatarWoman
        return CsiIconAvatarMan
      },
    }
  }
</script>
