
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style></style>


<template>
  <div>

    <q-card>
      <q-item>
        <q-item-side>
          <csi-icon-base class="csi-svg-icon--lg">
            <csi-icon-avatar-person :is-female="delegate.sesso_delega === 'F'" />
          </csi-icon-base>
        </q-item-side>

        <q-item-main>
          <q-item-tile label class="text-bold">{{delegateFullName | startCase}}</q-item-tile>
          <q-item-tile sublabel>{{delegate.codice_fiscale_delega}}</q-item-tile>
        </q-item-main>

        <q-item-side v-if="!readOnly" right>
          <q-item-tile icon="more_vert">
            <q-popover>
              <q-list separator link>
                <q-item
                  @click.native="goToHistory"
                  v-close-overlay>
                  Storico delegato
                </q-item>
              </q-list>
            </q-popover>
          </q-item-tile>
        </q-item-side>
      </q-item>

      <q-card-main class="no-padding">
        <q-list no-border separator>
          <csi-delegations-list-item
            v-for="delegation in delegations"
            :key="delegation.uuid"
            :delegation="delegation"
          />
        </q-list>
      </q-card-main>

      <csi-buttons v-if="!readOnly" class="q-pa-sm">
        <csi-button secondary @click="$emit('handle')" label="Gestisci" />
      </csi-buttons>
    </q-card>

  </div>
</template>


<script>
  import CsiDelegationsListItem from 'components/delegations/CsiDelegationsListItem'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'

  export default {
    name: 'CsiDelegateItem',
    components: {CsiIconAvatarPerson, CsiIconBase, CsiDelegationsListItem},
    props: {
      delegate: {type: Object, required: true},
      status: {required: false, default: undefined},
      readOnly: {type: Boolean, required: false, default: false},
    },
    data() {
      return {}
    },
    computed: {
      delegateFullName() {
        return `${this.delegate.nome_delega} ${this.delegate.cognome_delega}`
      },
      delegations() {
        let result = this.delegate.deleghe
        if (this.status) result = result.filter(d => d.stato_delega === this.status)
        return result
      }
    },
    methods: {
      goToHistory() {
        let route = this.$routes.DELEGATIONS.DELEGATE_HISTORY
        let params = {taxCode: this.delegate.codice_fiscale_delega}
        this.$router.push({name: route.name, params})
      }
    }
  }
</script>
