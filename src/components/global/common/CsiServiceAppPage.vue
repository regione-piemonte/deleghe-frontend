
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus">
</style>


<template>
  <div class="csi-service-app-page" :class="appPageClasses">


    <portal to="layout-app-toolbar-after">
      <div>
        <slot name="before-toolbar"></slot>

        <q-toolbar color="secondary">
          <slot name="toolbar-content">
            <q-toolbar-title @click.native="$emit('title-click')" class="cursor-pointer">
              {{toolbarTitle}}
            </q-toolbar-title>

            <slot name="toolbar-title-after" />
            <portal-target v-if="portalTargetName" :name="portalTargetName">
              <!--
              This component can be located anwhere in your App.
              The slot content of the above portal component will be rendered here.
              -->
            </portal-target>
          </slot>

          <csi-active-delegation-button
            v-if="delegationMode"
            :delegators="delegators"
            :has-ajax-error="hasAjaxError"
            @click="setActiveDelegator"
          />
        </q-toolbar>

        <csi-active-delegation-toolbar
          v-if="delegationMode && activeDelegation"
          :full-name="delegationFullName"
          @unset="unsetActiveDelegation"
        />

        <slot name="after-toolbar"></slot>
      </div>
    </portal>


    <slot />
  </div>
</template>


<script>

  import {getServiceDelegators} from '@services/api/delegations'
  import {isDelegationValid} from '@services/delegations/business-logic'

  export default {
    name: 'ServiceAppPage',
    components: {},
    props: {
      serviceCode: {type: String, required: false, default: null},
      toolbarTitle: {type: String, default: ''},
      portalTargetName: {type: String, default: undefined},
      delegationMode: {type: Boolean, default: false},
      activeDelegation: {type: Object, default: null},
    },
    data() {
      return {
        delegators: [],
        hasAjaxError: false,
      }
    },
    computed: {
      appPageClasses() {
        return {
          'delegation-mode': this.delegationMode && this.activeDelegation
        }
      },
      delegationFullName() {
        if (!this.activeDelegation) return ''
        return `${this.activeDelegation.nome_delega} ${this.activeDelegation.cognome_delega}`
      }
    },
    methods: {
      setActiveDelegator(delegator) {
        this.$emit('set-delegation', delegator)
      },
      unsetActiveDelegation() {
        this.$emit('unset-delegation')
      }
    },
    async created() {
      if (this.delegationMode && this.serviceCode) {

        let user = this.$store.getters['global/user']

        // Se non riusciamo ad ottenere i deleganti per qualche motivo => non facciamo il redirect alla schermata
        // del robottino ma semplicemente facciamo finta che non ci siano deleganti
        try {
          let response = await getServiceDelegators(user.cf, this.serviceCode, {_no5XXRedirect: true})
          this.delegators = response.data.filter(delegator => {
            return delegator.deleghe.some(delegation => {
              return delegation.codice_servizio === this.serviceCode && isDelegationValid(delegation.stato_delega)
            })
          })
        } catch (e) {
          this.hasAjaxError = true
        }

      }
    }
  }
</script>
