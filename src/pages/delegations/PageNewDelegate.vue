
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style></style>


<template>
  <q-page>

    <csi-page-title
      title="Nuova delega"
      @back="onBack"
      class="q-pa-md"
    />


    <csi-stepper
      ref="stepper"
      v-model="currentStep"
      alternative-labels
      contractable
      @step="onStep">

      <!-- Step 1 -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <q-step default title="Delegato" :name="STEPS.DELEGATE">

        <q-card>
          <q-card-title>
            Dati del delegato
          </q-card-title>
          <q-card-main>
            <csi-form-person
              :name.sync="name"
              :surname.sync="surname"
              :birth-date.sync="birthDate"
              :birth-place.sync="birthPlace"
              :tax-code.sync="taxCode"
              :gender.sync="gender"
              :min-birth-date="delegateMinBirthDate"
              :max-birth-date="delegateMaxBirthDate"
              :$v="$v"
              @has-warning-update="onWarningUpdateStep1"
            />
          </q-card-main>
        </q-card>

        <transition
          enter-active-class="animated fadeIn fast"
          leave-active-class="animated fadeOut faster"
          mode="out-in">
          <q-alert v-if="showWarningAlertStep1" color="warning" class="q-mt-lg">
            <p>Ci sono dei campi che potrebbero essere sbagliati.</p>
            <p>Per favore, controlla prima di andare avanti</p>
            <div class="text-right">
              <q-btn flat @click="goToStep2">Ok, ho controllato</q-btn>
            </div>
          </q-alert>

          <csi-buttons v-else class="q-mt-lg">
            <csi-button primary label="Continua" :loading="isCheckingStep" @click="onNextStep1" />
          </csi-buttons>
        </transition>

      </q-step>


      <!-- Step 2 -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <q-step title="Servizi" :name="STEPS.SERVICES">

        <q-card>
          <q-card-title>Scelta servizi</q-card-title>
          <q-card-main>
            <csi-delegate-handle-item
              :delegations="delegations"
              @change-delegation-status="onChangeDelegationStatus"
              @change-delegation-start-date="onChangeDelegationStartDate"
              @change-delegation-end-date="onChangeDelegationEndDate"
              @select-all="onSelectAll"
              @deselect-all="onDeselectAll"
              @are-valid="areDelegationsValid = true"
              @are-invalid="areDelegationsValid = false"
            />
          </q-card-main>
        </q-card>

        <csi-buttons class="q-mt-lg">
          <csi-button primary label="Continua" :disable="!areDelegationsValid" @click="onNextStep2" />
          <csi-button secondary label="Indietro" @click="$refs.stepper.previous()" />
        </csi-buttons>
      </q-step>


      <!-- Step 3 -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <q-step title="Riepilogo" :name="STEPS.SUMMARY">

        <!-- DATI DELEGATO -->
        <!-- ------------- -->
        <q-card>
          <q-card-title>
            <q-item class="no-padding">
              <q-item-side>
                <q-item-tile>
                  <csi-icon-base class="csi-svg-icon--lg">
                    <csi-icon-avatar-person :is-female="gender === 'F'" />
                  </csi-icon-base>
                </q-item-tile>
              </q-item-side>
              <q-item-main>
                <q-item-tile label>Dati del delegato</q-item-tile>
              </q-item-main>
              <q-item-side right class="q-card-title-extra">
                <q-item-tile>
                  <q-btn
                    @click="$refs.stepper.goToStep(STEPS.DELEGATE)"
                    flat
                    round
                    dense
                    icon="edit"
                    color="primary"
                  />
                </q-item-tile>
              </q-item-side>
            </q-item>
          </q-card-title>

          <q-card-main>
            <div class="row gutter-y-sm">
              <div class="col-12 col-sm-6">
                <div class="q-body-1">Nome</div>
                <div class="q-body-2">{{name}}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="q-body-1">Cognome</div>
                <div class="q-body-2">{{surname}}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="q-body-1">Data di nascita</div>
                <div class="q-body-2">{{birthDate | format}}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="q-body-1">Codice fiscale</div>
                <div class="q-body-2">{{taxCode}}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="q-body-1">Comune di nascita</div>
                <div class="q-body-2">{{birthPlace}}</div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="q-body-1">Sesso</div>
                <div class="q-body-2">{{gender === 'M' ? 'Maschio' : 'Femmina'}}</div>
              </div>
            </div>
          </q-card-main>
        </q-card>


        <!-- SCELTA SERVIZI -->
        <!-- -------------- -->
        <q-card class="q-mt-md">
          <q-card-title>
            Scelta servizi
            <q-btn
              slot="right"
              @click="$refs.stepper.goToStep(STEPS.SERVICES)"
              flat
              round
              dense
              icon="edit"
              color="primary"
            />
          </q-card-title>
          <q-card-main>
            <div v-for="delegation in activeDelegations"
                 :key="delegation.uuid"
                 class="row q-mt-sm">
              <div class="col-12 col-sm-6 q-body-2">{{getServiceName(delegation.codice_servizio)}}</div>
              <div class="col-12 col-sm-6 q-body-1">
                <span class="q-body-2">Valida </span>
                <span v-if="delegation.data_inizio_delega">
                dal {{delegation.data_inizio_delega | format}}
                </span>
                <span v-if="delegation.data_inizio_delega && delegation.data_fine_delega">
                  -
                </span>
                <span v-if="delegation.data_fine_delega">
                al {{delegation.data_fine_delega | format}}
                </span>
              </div>
            </div>
          </q-card-main>
        </q-card>

        <!-- INFORMATIVA -->
        <!-- -------------- -->
        <q-card class="q-mt-md">
          <q-card-title>Informativa</q-card-title>
          <q-card-main>
            <csi-policy src="statics/terms-and-conditions/delegations-adults.html" />
            <q-toggle
              v-model="hasAcceptedPolicy"
              label="Dichiaro di aver letto l'informativa e di accettare le condizioni d'uso"
              class="q-mt-lg"
            />
          </q-card-main>
        </q-card>


        <csi-buttons class="q-mt-lg">
          <csi-button primary label="Conferma" :loading="isSavingDelegate" @click="checkLastStep() && onConfirm()" />
          <csi-button secondary label="Indietro" @click="$refs.stepper.previous()" />
        </csi-buttons>
      </q-step>


      <!-- Step 4 - FINE -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <q-step title="Fine" :name="STEPS.END">

        <q-alert type="positive">
          <p>
            Hai delegato <strong>{{name}} {{surname}}</strong> ad utilizzare i seguenti servizi online:
          </p>

          <ul>
            <li v-for="delegation in activeDelegations" :key="delegation.uuid">
              {{getServiceName(delegation.codice_servizio)}}
            </li>
          </ul>
        </q-alert>

        <csi-buttons class="q-mt-lg">
          <csi-button primary label="Home" @click="$router.push($routes.DELEGATIONS.PIEDMONT_DELEGATES)" />
        </csi-buttons>
      </q-step>


    </csi-stepper>


    <!-- MODALS -->
    <!-- ----------------------------------------------------------------------------------------------------------- -->
    <q-modal v-model="isDelegateDuplicateModalVisible" :content-css="{maxWidth: '800px'}">
      <q-modal-layout v-if="delegateDuplicated">
        <q-toolbar slot="header">
          <q-toolbar-title>
            Cittadino già delegato
          </q-toolbar-title>
          <q-btn
            flat
            round
            icon="close"
            v-close-overlay>
          </q-btn>
        </q-toolbar>
        <q-card inline class="cursor-pointer">
          <q-card-title class="text-center">
            Hai già delegato questa persona
          </q-card-title>
          <q-card-main>
            <csi-delegate-item
              :delegate="delegateDuplicated"
              read-only
            />

            <csi-buttons class="q-mt-md">
              <csi-button primary label="Gestisci" @click="goToDelegateDetail(delegateDuplicated)" />
            </csi-buttons>
          </q-card-main>
        </q-card>
      </q-modal-layout>
    </q-modal>

  </q-page>
</template>

<script>

  import CsiDelegateHandleItem from 'components/delegations/CsiDelegateHandleItem'
  import CsiInputTaxCode from 'components/global/forms/CsiInputTaxCode'
  import {LENGTH} from '@services/global/tax-code'
  import CsiFormPerson from 'components/global/forms/CsiFormPerson'
  import {personValidationMixin} from '@mixins/validationsMixin'
  import {getDelegate, saveDelegate} from '@services/api/delegations'
  import subYears from 'date-fns/sub_years'
  import CsiPolicy from 'components/global/common/CsiPolicy'
  import {buildDefaultDelegation, isDelegationValid} from '@services/delegations/business-logic'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'
  import {getResponseStatusCode, isStatusIn} from '@services/api/utils'
  import CsiDelegateItem from 'components/delegations/CsiDelegateItem'
  import {capitalize} from '@services/global/utils'

  const STEPS = {
    DELEGATE: 'DELEGATE',
    SERVICES: 'SERVICES',
    SUMMARY: 'SUMMARY',
    END: 'END',
  }

  export default {
    name: 'PageNewDelegate',
    mixins: [personValidationMixin],
    components: {
      CsiDelegateItem,
      CsiIconAvatarPerson,
      CsiIconBase,
      CsiPageTitle,
      CsiPolicy,
      CsiFormPerson,
      CsiInputTaxCode,
      CsiDelegateHandleItem
    },
    data() {
      return {
        TAX_CODE_LENGTH: LENGTH,
        STEPS,
        currentStep: STEPS.DELEGATE,
        name: '',
        surname: '',
        birthDate: null,
        birthPlace: '',
        taxCode: '',
        gender: 'M',
        hasAcceptedPolicy: false,
        delegations: [],
        areDelegationsValid: true,
        delegateMinBirthDate: subYears(new Date(), 120).toISOString(),
        delegateMaxBirthDate: subYears(new Date(), 18).toISOString(),
        isSavingDelegate: false,
        hasWarningStep1: true,
        showWarningAlertStep1: false,
        isCheckingStep: false,
        isDelegateDuplicateModalVisible: false,
        delegateDuplicated: null,
      }
    },
    computed: {
      user() {
        return this.$store.getters['global/user']
      },
      delegableAppServices() {
        return this.$store.getters['global/delegableAppServices']
      },
      activeDelegations() {
        return this.delegations.filter(delegation => isDelegationValid(delegation.stato_delega))
      },
    },
    validations() {
      return this.personValidationMixin_getSchema()
    },
    created() {
      this.delegations = this.delegableAppServices.map(buildDefaultDelegation)
    },
    methods: {
      onBack() {
        this.$router.push(this.$routes.DELEGATIONS.APP)
      },
      onStep() {
        // Al cambio di step resettiamo gli errori
        this.showWarningAlertStep1 = false
      },
      async onNextStep1() {
        if (!this.isStep1Valid()) return

        this.name = capitalize(this.name, true)
        this.surname = capitalize(this.surname, true)

        this.isCheckingStep = true

        try {
          let response = await getDelegate(this.user.cf, this.taxCode)
          // Se siamo qui => l'utente ha già delegato la persona con questo codice fissale
          // perciò avvisiamo l'utente
          this.isCheckingStep = false
          this.delegateDuplicated = response.data
          this.isDelegateDuplicateModalVisible = true
          return
        } catch (e) {
          this.isCheckingStep = false

          // Se non si tratta di un 404 => si è verificato uno strano errore
          if (!isStatusIn(e, 404, 404)) {
            this.$q.notify({
              color: 'warning',
              message: 'Non è stato possibile controllare se hai già delegato questa persona, per favore riprova'
            })
            return
          }

          // Si è verificato un 404 => tutto normale, l'utente non ha già delegato questo cittadino
          // perciò lo facciamo proseguire nello stepper
        }


        if (this.hasWarningStep1) {
          this.showWarningAlertStep1 = true
          return
        }
        this.goToStep2()
      },
      onNextStep2() {

        // L'utente non può andare avanti senza aver attivato almeno una delega
        if (this.activeDelegations.length <= 0) {
          this.$q.notify({
            type: 'negative',
            message: 'Attiva almeno una delega prima di proseguire'
          })

          return
        }

        this.$refs.stepper.next()
      },
      goToStep2() {
        if (!this.isStep1Valid()) return
        this.$refs.stepper.next()
      },
      onWarningUpdateStep1(val) {
        this.hasWarningStep1 = val
      },
      getServiceName(serviceCode) {
        let service = this.$store.getters['global/appService'](serviceCode)
        return service.descrizione
      },
      onStatusActive(delegation) {
        let status = this.$config.delegations.delegationStatuss.ACTIVE
        delegation.stato_delega = status
      },
      onStatusDeactivate(delegation) {
        let status = this.$config.delegations.delegationStatuss.NOT_ACTIVE
        delegation.stato_delega = status
      },
      onChangeDelegationStatus(delegation, value) {
        value ? this.onStatusActive(delegation) : this.onStatusDeactivate(delegation)
      },
      onChangeDelegationStartDate(delegation, startDate) {
        delegation.data_inizio_delega = startDate
      },
      onChangeDelegationEndDate(delegation, endDate) {
        delegation.data_fine_delega = endDate
      },
      onSelectAll() {
        this.delegations.forEach(d => this.onChangeDelegationStatus(d, true))
      },
      onDeselectAll() {
        this.delegations.forEach(d => this.onChangeDelegationStatus(d, false))
      },
      isStep1Valid() {
        this.$v.$touch()
        return !this.$v.$error
      },
      checkLastStep() {
        if (!this.hasAcceptedPolicy) {
          this.$q.notify({
            type: 'negative',
            message: `Non puoi andare avanti senza accettare l'informativa`
          })
        }

        return this.hasAcceptedPolicy
      },
      async onConfirm() {

        let user = this.$store.getters['global/user']
        let data = [
          {
            codice_fiscale_delega: this.taxCode,
            nome_delega: this.name,
            cognome_delega: this.surname,
            data_nascita_delega: new Date(this.birthDate),
            luogo_nascita_delega: this.birthPlace,
            sesso_delega: this.gender,
            deleghe: this.activeDelegations.map(d => {
              return {
                codice_servizio: d.codice_servizio,
                data_inizio_delega: d.data_inizio_delega,
                data_fine_delega: d.data_fine_delega,
                stato_delega: d.stato_delega,
              }
            }),
          }
        ]

        try {
          this.isSavingDelegate = true
          let response = await saveDelegate(user.cf, data)
          this.$refs.stepper.next()
        } catch (e) {
          this.$q.notify({
            type: 'negative',
            message: `[${getResponseStatusCode(e)}] Non è stato possibile salvare la delega`
          })
        }

        this.isSavingDelegate = false
      },
      goToDelegateDetail(delegate) {
        this.isDelegateDuplicateModalVisible = false
        let name = this.$routes.DELEGATIONS.PIEDMONT_DELEGATE_EDIT.name
        let params = {delegateCf: delegate.codice_fiscale_delega, delegate: delegate}
        this.$router.push({name, params})
      }
    },
  }
</script>
