
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page>
    <p class="q-title q-pa-sm q-mt-md">Conferma dichiarazione</p>
    <q-alert type="positive">
      <p>
        Hai confermato la dichiarazione congiunta di responsabilità genitoriale e la conseguente delega ad operare per i
        seguenti figli:
      </p>
      <ul>
        <li v-if="minore">
          <strong>{{minore.nome | capitalize }} {{minore.cognome | capitalize }}</strong>
        </li>
      </ul>
      <p v-if="parent">Una notifica è stata inoltrata a <strong>{{parent[0].nome | capitalize }} {{parent[0].cognome |
        capitalize }}</strong></p>
    </q-alert>
    <csi-buttons class="q-mt-lg q-mb-md">
      <csi-button primary label="Nuova dichiarazione" @click="$router.push($routes.DELEGATIONS.PIEDMONT_MINORS)" />
      <csi-button secondary label="Torna ai tuoi figli minori"
                  @click="$router.push($routes.DELEGATIONS.PIEDMONT_MINORS)" />
    </csi-buttons>
  </q-page>
</template>

<style scoped lang="stylus"></style>


<script>
  export default {
    name: 'PageConfirmRevoke',
    data() {
      return {
        minore: null,
        parent: null
      }
    },
    created() {
      this.parent = this.$store.getters['delegations/getDelegator']
      this.minore = this.$store.getters['delegations/getMinorDelegator']
    }
  }
</script>
