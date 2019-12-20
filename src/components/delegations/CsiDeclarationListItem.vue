
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<template>
  <q-card class="q-mt-sm">

    <div v-if="mustConfirm" class="q-py-sm q-px-md bg-red-2 report-list-item__header-info">
      <span>Dichiarazione da confermare</span>
    </div>

    <div v-if="mustConfirmOtherParent" class="q-py-sm q-px-md bg-red-2 report-list-item__header-info">
      <span>Dichiarazione in attesa di conferma da parte di {{otherParentFullName}}</span>
    </div>

    <q-item>
      <q-item-side>
        <csi-icon-base class="csi-svg-icon--lg">
          <csi-icon-avatar-person is-minor :is-female="isMinorFemale" />
        </csi-icon-base>
      </q-item-side>

      <q-item-main>
        <q-item-tile label class="text-bold">{{minorFullName | startCase}}</q-item-tile>
        <q-item-tile sublabel>{{minor.codice_fiscale}}</q-item-tile>
      </q-item-main>

      <q-item-side v-if="!mustConfirm" right>
        <csi-declaration-list-item-status :status="status" />
      </q-item-side>
    </q-item>

    <q-card-main>
      <p>
        Altro genitore: <br />
        <strong>{{otherParentFullName}} - {{otherParent.codice_fiscale}}</strong>
      </p>
    </q-card-main>

    <csi-buttons v-if="mustConfirm || canRevoke || (status === 'REVOCATA') " class="q-pa-sm">
      <csi-button
        v-if="mustConfirm"
        primary
        label="Conferma dichiarazione"
        @click="$emit('confirm')"
      />
      <csi-button
        v-if="canRevoke"
        secondary
        color="negative"
        label="Revoca delega"
        @click="$emit('revoke')"
      />
      <csi-button
        v-if="status === 'REVOCATA'"
        secondary
        color="negative"
        label="Riattiva delega"
        @click="$emit('newDeclaration')"
      />
    </csi-buttons>
  </q-card>
</template>


<script>
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'
  import CsiDeclarationListItemStatus from 'components/delegations/CsiDeclarationListItemStatus'
  import {
    getDeclarationMinor,
    getDeclarationOtherParent,
    getParentDeclarationRole,
    getParentDeclarationStatus,
    isDeclarationRequestingParent
  } from '@services/delegations/business-logic'


  export default {
    name: 'CsiDeclarationListItem',
    components: {CsiDeclarationListItemStatus, CsiIconAvatarPerson, CsiIconBase},
    props: {
      declaration: {type: Object, required: true},
    },
    data() {
      return {
        isLoadingConfirm: false,
        isLoadingRevoke: false,
      }
    },
    computed: {
      user() {
        return this.$store.getters['global/user']
      },
      minor() {
        return getDeclarationMinor(this.declaration)
      },
      minorFullName() {
        return `${this.minor.nome} ${this.minor.cognome}`
      },
      isMinorFemale() {
        return this.minor.sesso === 'F'
      },
      otherParent() {
        return getDeclarationOtherParent(this.declaration, this.user.cf)
      },
      otherParentFullName() {
        return `${this.otherParent.nome} ${this.otherParent.cognome}`
      },
      role() {
        return getParentDeclarationRole(this.declaration, this.user.cf).codice
      },
      status() {
        return getParentDeclarationStatus(this.declaration, this.user.cf).codice
      },
      isRequestingParent() {
        return isDeclarationRequestingParent(this.declaration, this.user.cf)
      },
      mustConfirm() {
        return !this.isRequestingParent && this.status === 'DA_APPROVARE'
      },
      mustConfirmOtherParent() {
        return this.isRequestingParent && this.status === 'DA_APPROVARE'
      },
      canRevoke() {
        return !this.mustConfirm && this.status !== 'REVOCATA' && this.status !== 'SCADUTA'
      },
    },
    created() {
    },
    methods: {},
  }
</script>


<style scoped lang="stylus"></style>
