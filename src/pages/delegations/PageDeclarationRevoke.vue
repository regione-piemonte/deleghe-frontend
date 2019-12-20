
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-page padding>

    <csi-page-title
      title="Revoca dichiarazione"
      class="q-mb-lg"
      @back="onBack"
    />

    <div v-if="!isLoading">
      <q-card>

        <q-card-main>
          <div>
            <div class="csi-h5 q-mb-sm">Genitori</div>
            <div class="row q-my-xs">
              <div class="col"><strong>Nome</strong></div>
              <div class="col"><strong>Cognome</strong></div>
              <div class="col"><strong>Codice fiscale</strong></div>
            </div>

            <div v-for="parent in parents" class="row q-my-xs">
              <div class="col">{{parent.nome | capitalize}}</div>
              <div class="col">{{parent.cognome | capitalize}}</div>
              <div class="col">{{parent.codice_fiscale}}</div>
            </div>
          </div>

          <div class="q-mt-md">
            <div class="csi-h5 q-mb-sm">Minore</div>

            <div class="row q-my-xs">
              <div class="col"><strong>Nome</strong></div>
              <div class="col"><strong>Cognome</strong></div>
              <div class="col"><strong>Codice fiscale</strong></div>
            </div>

            <div class="row q-my-xs">
              <div class="col">{{minor.nome | capitalize}}</div>
              <div class="col">{{minor.cognome | capitalize}}</div>
              <div class="col">{{minor.codice_fiscale}}</div>
            </div>
          </div>
        </q-card-main>
      </q-card>

      <q-alert color="warning" class="q-mt-md">
        <p><strong>Attenzione</strong></p>
        <p>
          Confermando la revoca, verrà disabilita la delega per entrambi i genitori collegati al minore che non potranno
          più operare per conto del loro figlio.
        </p>
        <p>
          <!--nome minore-->
          Vuoi confermare la revoca della delega per <strong>{{minor.nome | capitalize }} {{minor.cognome |
          capitalize}}</strong>?
        </p>
      </q-alert>
      <csi-buttons class="q-mt-lg q-mb-md">
        <csi-button primary label="Conferma la revoca" :loading="isLoadingRevoke" @click="onRevoke" />
        <csi-button secondary label="Indietro" @click="onBack" />
      </csi-buttons>
    </div>


    <!-- LOADING -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="isLoading" color="transparent">
      <q-spinner-mat size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>


<script>
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import CsiPolicy from 'components/global/common/CsiPolicy'
  import {getDeclaration, updateDeclaration} from '@services/api/delegations'
  import {getResponseStatusCode} from '@services/api/utils'

  export default {
    name: 'PageDeclarationRevoke',
    components: {CsiPolicy, CsiPageTitle},
    props: {},
    data() {
      return {
        declaration: null,
        isLoading: false,
        isLoadingRevoke: false,
      }
    },
    computed: {
      user() {
        return this.$store.getters['global/user']
      },
      parents() {
        if (!this.declaration) return []
        return this.declaration.dettagli.map(d => d.genitore_tutore_curatore)
      },
      minor() {
        if (!this.declaration) return {}
        return this.declaration.dettagli[0].figlio_tutelato_curato
      }
    },
    async created() {
      let {id, declaration} = this.$route.params

      if (!declaration) {
        this.isLoading = true
        let response = await getDeclaration(this.user.cf, id)
        declaration = response.data
        this.isLoading = false
      }

      this.declaration = declaration
    },
    methods: {
      onBack() {
        this.$router.push(this.$routes.DELEGATIONS.PIEDMONT_MINORS)
      },
      // Aggiorna la dichiarazione impostando i nuovi stati
      async onUpdate(declaration, status, detailStatus) {
        let data = JSON.parse(JSON.stringify(declaration))
        data.stato.codice = status
        data.dettagli.forEach(d => d.stato.codice = detailStatus)
        let response = await updateDeclaration(this.user.cf, declaration.uuid, data)
        this.$emit('update', response.data)
        return response
      },
      async onRevoke() {
        let parentToSave = this.parents.filter(parent => parent.codice_fiscale !== this.user.cf)
        this.$store.commit('delegations/setDelegator', parentToSave)
        this.$store.commit('delegations/setMinorDelegator', this.minor)
        let status = 'REVOCATA'
        let detailStatus = 'REVOCATA'
        this.isLoadingRevoke = true

        try {
          let response = await this.onUpdate(this.declaration, status, detailStatus)
          this.isLoadingRevoke = false
          this.$router.push(this.$routes.DELEGATIONS.CONFIRM_REVOKE)
        } catch (e) {
          this.isLoadingRevoke = false
          this.$q.notify({
            type: 'negative',
            message: `[${getResponseStatusCode(e)}] Non è stato possibile revocare la dichiarazione`
          })
        }

      },
    },
  }
</script>


<style scoped lang="stylus"></style>
