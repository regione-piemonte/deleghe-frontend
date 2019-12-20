
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>


<template>
  <div>

    <div class="row gutter-y-sm">

      <div class="col-12 col-sm-6">
        <div class="q-body-2">Nome</div>
        <div class="q-body-1">{{person.name}}</div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="q-body-2">Cognome</div>
        <div class="q-body-1">{{person.surname}}</div>
      </div>

      <div v-if="!minimal" class="col-12 col-sm-6">
        <div class="q-body-2">Data di nascita</div>
        <div class="q-body-1">{{person.birthDate | format}}</div>
      </div>
      <div v-if="!minimal" class="col-12 col-sm-6">
        <div class="q-body-2">Comune di nascita</div>
        <div class="q-body-1">{{person.birthPlace}}</div>
      </div>

      <div v-if="!minimal" class="col-12 col-sm-6">
        <div class="q-body-2">Sesso</div>
        <div class="q-body-1">{{person.gender}}</div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="q-body-2">Codice Fiscale</div>
        <div class="q-body-1">{{person.taxCode}}</div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'CsiDeclarationSummary',
    props: {
      person: Object,
      minimal: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    }
  }
</script>
