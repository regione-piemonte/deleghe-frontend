
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus"></style>


<template>
  <q-page padding>

    <template v-if="!isLoading">
      <div class="row items-center justify-center q-mb-lg">
        <div class="col-auto">
          <q-chip color="info" text-color="black" v-if="isEmpty(declarations)">
            <strong>
              <span>Non hai deleghe nei confronti di minori</span>
              <!--<span v-else-if="declarations.length === 1">Hai 1 deleghe nei confronti di minori disponibile</span>
              <span v-else>Hai {{declarations.length}} deleghe nei confronti di minori disponibili</span>-->
            </strong>
          </q-chip>
        </div>
      </div>
      <!-- STATO VUOTO -->
      <!-- ----------------------------------------------------------------------------------------------------------- -->
      <div v-if="isEmpty(declarations)">
        <q-card>
          <q-card-main>
            <csi-banner image-src="statics/images/banners/img_gestione_minori.svg">
              <template slot="text">
                <p>Questo servizio permette di certificare la propria responsabilità genitoriale (affidata ad entrambi
                  genitori ai sensi dell’<a href="https://it.wikisource.org/wiki/Codice_civile/Libro_I/Titolo_IX"
                                            target="_blank">art. 316 del c.c., come sostituito dal D. Lgs. n.
                    154/2013)</a> ed ottenere delega ed abilitazione ad accedere, per conto dei propri figli minorenni,
                  ai servizi telematici disponibili.</p>
                <p>Alla responsabilità genitoriale sono sottoposti tutti i figli minori non emancipati, sia nati nel
                  matrimonio sia nati fuori dal matrimonio. Ciò vale anche nel caso di figli adottivi, nel caso in cui i
                  loro genitori adottivi, per effetto dell'adozione (legittimante), acquistano a tutti gli effetti la
                  responsabilità genitoriale.</p>
                <p>La funzionalità telematica, ad oggi, attivata richiede l’istanza di un genitore maggiorenne e la
                  dichiarazione di conferma da parte dell’altro genitore maggiorenne attraverso il sistema pubblico di
                  identità digitale (SPID), o in alternativa con credenziali di Tessera Sanitaria con microchip TS-CNS
                  (Tessera Sanitaria – Carta Nazionale dei Servizi) o qualsiasi Carta Nazionale Servizi.</p>
                <p>Al momento il servizio non abilita le funzionalità di delega su dichiarazione fatta da un solo
                  genitore, che non riceve la conferma telematica del secondo genitore.</p>
                <q-btn
                  @click="newJointDeclaration"
                  color="primary"
                  class="full-width">
                  Nuova dichiarazione
                </q-btn>
              </template>
            </csi-banner>
          </q-card-main>
        </q-card>
      </div>

      <!-- STATO PIENO -->
      <!-- ----------------------------------------------------------------------------------------------------------- -->
      <div v-else>

        <!-- FILTRI -->
        <div class="row items-center gutter-xs q-mb-md" :class="{'reverse': $q.screen.gt.sm}">
          <div class="col-12 col-md-auto">
            <csi-buttons>
              <csi-button primary label="Nuova dichiarazione" @click="newJointDeclaration" />
            </csi-buttons>
          </div>
        </div>

        <!-- LISTA DELEGANTI MINORI -->
        <!-- --------------------------------------------------------------------------------------------------------- -->
        <div class="csi-group-card">

          <div>
            <csi-declaration-list-item
              v-for="declaration in declarations"
              :key="declaration.uuid"
              :declaration="declaration"
              @confirm="onConfirm(declaration)"
              @revoke="onRevoke(declaration)"
              @newDeclaration="onNewDeclaration(declaration)"
            />
          </div>
        </div>
      </div>
      <div class="q-py-md text-right">
        <router-link :to="$routes.DELEGATIONS.POLICY_MINORS">Termini e condizioni d'uso</router-link>
      </div>
    </template>


    <!-- LOADING -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-inner-loading :visible="isLoading">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>
  import {isEmpty} from '@services/global/utils'
  import {getDeclarations} from '@services/api/delegations'
  import CsiDeclarationListItem from 'components/delegations/CsiDeclarationListItem'
  import CsiBanner from 'components/global/common/CsiBanner'

  export default {
    name: 'PagePiedmontMinors',
    components: {CsiBanner, CsiDeclarationListItem},
    data() {
      return {
        isLoading: false,
        isSelectionModalOpen: false,
        declarationsResponse: null,
      }
    },
    computed: {
      user() {
        return this.$store.getters['global/user']
      },
      declarations() {
        if (!this.declarationsResponse) return []
        return this.declarationsResponse.data
      },
    },
    async created() {
      this.isLoading = true
      this.declarationsResponse = await getDeclarations(this.user.cf)
      this.isLoading = false
    },
    methods: {
      isEmpty,
      newJointDeclaration() {
        let routeName = this.$routes.DELEGATIONS.NEW_JOINT_DECLARATION.name
        let params = {dettagli: this.declarationsResponse.data}
        this.$router.push({name: routeName, params: params})
      },
      onServiceSelected(newValue) {
        this.serviceSelected = newValue
      },
      onDeclarationUpdate(oldValue, newValue) {
        this.declarationsResponse.data = this.declarationsResponse.data.map(d => d.uuid === oldValue.uuid ? newValue : d)
      },
      onConfirm(declaration) {
        let name = this.$routes.DELEGATIONS.DECLARATION_CONFIRM.name
        let params = {id: declaration.uuid}
        this.$router.push({name, params})
      },
      onRevoke(declaration) {
        let name = this.$routes.DELEGATIONS.DECLARATION_REVOKE.name
        let params = {id: declaration.uuid}
        this.$router.push({name, params})
      },
      onNewDeclaration(declaration) {
        let name = this.$routes.DELEGATIONS.NEW_JOINT_DECLARATION.name
        let params = {declaration: declaration}
        this.$router.push({name, params})
      },
    }
  }
</script>
