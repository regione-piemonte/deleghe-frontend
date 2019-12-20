
<!--
SPDX-License-Identifier: EUPL-1.2
(C) Copyright 2019-2020 Regione Piemonte
-->
<style scoped lang="stylus">
  @require '~variables'
  .background-new-parent {
    background-color: #f0f3f8;
    border-style: none;
    box-shadow: none;
  }

  .minor-form:not(:first-of-type)
    // Come se stessimo aggiungendo class="q-mt-xl" a tutti i .minor-form eccetto il primo
    margin-top: $spaces.xl.y
</style>

<template>
  <q-page>
    <template v-if="!isLoading">
      <!--<p class="q-title q-pa-sm q-mt-md">Nuova dichiarazione congiunta</p>-->
      <csi-page-title
        title="Nuova dichiarazione congiunta"
        @back="onBack"
        class="q-pa-md"
      />
      <csi-stepper
        alternative-labels
        contractable
        class="shadow-0"
        ref="newJointDeclarationStepper"
        @step="onStep">

        <!-- STEP 1 - ALTRO GENITORE -->
        <!-- --------------------------------------------------------------------------------------------------------- -->
        <q-step title="Altro genitore" :name="STEPS.PARENT" class="csi-step-no-padding">
          <q-card class="q-ma-sm background-new-parent " v-if="start === true">
            <q-card-title>Dati dell'altro genitore</q-card-title>
            <q-card-main>
              <div class="row gutter-sm">
                <div class="col-sm-6 col-md-6" :class="{'col-lg': noColumn, 'col-lg-6': yesColumn}"
                     v-for="parent in parentList" :key="parent.codice_fiscale">
                  <q-card>
                    <q-card-main class="fit row">
                      <div class="row full-width q-mb-lg">
                        <div class="col-4 text-center">
                          <csi-icon-base class="csi-svg-icon--lg q-mt-sm">
                            <csi-icon-avatar-person :is-female="parent.sesso === 'F'" />
                          </csi-icon-base>
                        </div>
                        <div class="col-md-4 col-6 q-ml-sm q-mt-sm">
                          <h6 class="text-weight-bold">{{parent.cognome}} {{parent.nome}}</h6>
                          <p>{{parent.codice_fiscale}}</p>
                        </div>
                      </div>
                      <div class="row full-width self-end">
                        <div class="col-12">
                          <csi-button class="cursor-pointer" primary :block="true" label="Scegli"
                                      @click="useTheSameParent(parent)" />
                        </div>
                      </div>
                    </q-card-main>
                  </q-card>
                </div>
                <div class="col-sm-6 col-md-6 col-lg">
                  <q-card class="full-height">
                    <q-card-main class="fit row full-height">
                      <div class="row full-width q-mb-lg">
                        <div class="col-4 text-center">
                          <csi-icon-base class="csi-svg-icon--lg q-mt-sm col">
                            <csi-icon-avatar-person-add :is-female="parent.gender === 'F'" />
                          </csi-icon-base>
                        </div>
                        <div class="col-8">
                          <div class="q-mt-sm col wrap">
                            <p class="q-subheading">Inserisci i dati del nuovo genitore</p>
                          </div>
                        </div>
                      </div>
                      <div class="row full-width self-end">
                        <div class="col-12 ">
                          <csi-button class="cursor-pointer " secondary :block="true" label="Nuovo genitore"
                                      @click="changeStateOfParent" />
                        </div>
                      </div>
                    </q-card-main>
                  </q-card>
                </div>
              </div>
            </q-card-main>
          </q-card>
          <div v-else>
            <q-card class="q-ma-sm">
              <q-card-title>Dati dell'altro genitore</q-card-title>
              <q-card-main>
                <csi-form-person
                  :name.sync="parent.name"
                  :surname.sync="parent.surname"
                  :birth-date.sync="parent.birthDate"
                  :birth-place.sync="parent.birthPlace"
                  :tax-code.sync="parent.taxCode"
                  :gender.sync="parent.gender"
                  :min-birth-date="parentMinBirthDate"
                  :max-birth-date="parentMaxBirthDate"
                  :$v="$v.parent"
                  @has-warning-update="onWarningUpdateStep"
                >
                </csi-form-person>
              </q-card-main>
            </q-card>
            <transition
              enter-active-class="animated fadeIn fast"
              leave-active-class="animated fadeOut faster"
              mode="out-in">
              <q-alert v-if="showWarningAlertStep" color="warning" class="q-mt-lg q-mb-lg">
                <p>Ci sono dei campi che potrebbero essere sbagliati.</p>
                <p>Per favore, controlla prima di andare avanti</p>
                <div class="text-right">
                  <q-btn flat @click="isParentStepValid() && $refs.newJointDeclarationStepper.next()">Ok, ho
                    controllato
                  </q-btn>
                </div>
              </q-alert>
              <csi-buttons v-else class="q-mt-lg q-mb-md ">
                <csi-button primary label="Continua"
                            @click="isParentStepValid() && $refs.newJointDeclarationStepper.next()" />
              </csi-buttons>
            </transition>

          </div>
        </q-step>

        <!-- STEP 2 - FIGLIO/I -->
        <!-- --------------------------------------------------------------------------------------------------------- -->
        <q-step title="Figli" :name="STEPS.CHILDREN" class="csi-step-no-padding">

          <transition-group
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
            <q-card v-for="(minor, index) in minors" :key="index" class="q-ma-sm">
              <q-card-title class="q-title">
                Dati del minore #{{index + 1}}
                <q-btn
                  v-if="index + 1 > 1"
                  @click="removeMinor(minor, index)"
                  slot="right"
                  flat
                  round
                  dense
                  icon="close">
                </q-btn>
              </q-card-title>

              <q-card-main>
                <csi-form-person
                  :name.sync="minor.name"
                  :surname.sync="minor.surname"
                  :birth-date.sync="minor.birthDate"
                  :birth-place.sync="minor.birthPlace"
                  :tax-code.sync="minor.taxCode"
                  :gender.sync="minor.gender"
                  :min-birth-date="minorMinBirthDate"
                  :max-birth-date="minorMaxBirthDate"
                  :useTheParent=true
                  :$v="$v.minors.$each[index]"
                  @has-warning-update="onWarningUpdateStep"
                >
                  <template slot="surname-error-label">
                    <div v-if="!$v.minors.$each[index].surname.required">Campo obbligatorio</div>
                    <div v-if="!$v.minors.$each[index].surname.alpha">Deve essere composto solo da caratteri
                      alfabetici
                    </div>
                    <div v-if="(!$v.minors.$each[index].surname.surnameParents && controlSurname.length === 1)">Deve
                      avere lo stesso cognome del padre
                    </div>
                    <div v-if="(!$v.minors.$each[index].surname.surnameParents && controlSurname.length > 1)">Deve avere
                      lo stesso cognome di uno dei due genitori
                    </div>
                  </template>
                </csi-form-person>
              </q-card-main>
            </q-card>
          </transition-group>

          <div class="text-center q-mt-lg q-px-sm">
            <csi-button secondary color="black" @click="addMinor">
              Vuoi aggiungere un altro minore alla delega?
            </csi-button>
          </div>
          <transition
            enter-active-class="animated fadeIn fast"
            leave-active-class="animated fadeOut faster"
            mode="out-in">
            <q-alert v-if="showWarningAlertStep" color="warning" class="q-mt-lg q-mb-lg">
              <p>Ci sono dei campi che potrebbero essere sbagliati.</p>
              <p>Per favore, controlla prima di andare avanti</p>
              <div class="text-right">
                <q-btn flat @click="isMinorsStepValid() && $refs.newJointDeclarationStepper.next()">Ok, ho controllato
                </q-btn>
              </div>
            </q-alert>
            <csi-buttons v-else class="q-mt-lg q-mb-md ">
              <csi-button primary label="Continua"
                          @click="isMinorsStepValid() && $refs.newJointDeclarationStepper.next()" />
              <csi-button secondary label="Indietro" @click="$refs.newJointDeclarationStepper.previous()" />
            </csi-buttons>
          </transition>
        </q-step>

        <!-- STEP 3 - RIEPILOGO + INFORMATIVA -->
        <!-- --------------------------------------------------------------------------------------------------------- -->
        <q-step title="Riepilogo" :name="STEPS.SUMMARY" class="csi-step-no-padding">

          <q-card class="q-ma-sm">
            <q-item>
              <q-item-side>
                <csi-icon-base class="csi-svg-icon--lg">
                  <csi-icon-avatar-person :is-female="parent.gender === 'F'" />
                </csi-icon-base>
              </q-item-side>

              <q-item-main>
                <q-item-tile label>
                  <strong>Dati altro genitore</strong>
                </q-item-tile>
              </q-item-main>

              <q-item-side right>
                <q-btn
                  @click="$refs.newJointDeclarationStepper.goToStep(STEPS.PARENT)"
                  flat
                  round
                  dense
                  icon="edit"
                />
              </q-item-side>
            </q-item>

            <q-card-main>
              <csi-declaration-summary :person="parent" />
            </q-card-main>
          </q-card>

          <q-card class="q-ma-sm q-mt-md">
            <div v-for="(minor, index) in minors" :key="index">
              <q-item>
                <q-item-side>
                  <csi-icon-base class="csi-svg-icon--lg">
                    <csi-icon-avatar-person is-minor :is-female="minor.gender === 'F'" />
                  </csi-icon-base>
                </q-item-side>

                <q-item-main>
                  <q-item-tile label>
                    <strong>Dati del minore n°{{index + 1}}</strong>
                  </q-item-tile>
                </q-item-main>

                <!-- Mostriamo la matita di edit solo nel primo minore -->
                <q-item-side v-if="index === 0" right>
                  <q-btn
                    @click="$refs.newJointDeclarationStepper.goToStep(STEPS.CHILDREN)"
                    flat
                    round
                    dense
                    icon="edit"
                  />
                </q-item-side>
              </q-item>

              <q-card-main>
                <csi-declaration-summary :person="minor" />
              </q-card-main>

              <q-card-separator class="q-mx-sm" />
            </div>
          </q-card>


          <q-card class="q-ma-sm q-mt-md">
            <q-card-title>
              <strong>Termini e condizioni d'uso</strong>
            </q-card-title>

            <q-card-main>
              <div>
                <csi-policy src="statics/terms-and-conditions/delegations-minors.html" />
              </div>

              <q-field class="q-body-1 q-mt-md q-pa-md">
                <q-toggle
                  v-model="isDisclaimerAccepted"
                  label="Dichiaro di aver preso visione e dell'informativa e di accettare le condizioni d'uso">
                </q-toggle>
              </q-field>
            </q-card-main>
          </q-card>

          <csi-buttons class="q-my-md">
            <csi-button primary label="Conferma" :loading="isSavingDeclarations" @click="onConfirm" />
            <csi-button secondary label="Indietro" @click="$refs.newJointDeclarationStepper.previous()" />
          </csi-buttons>
        </q-step>

        <!-- STEP 4 - Fine -->
        <!-- --------------------------------------------------------------------------------------------------------- -->
        <q-step title="Fine" :name="STEPS.END">

          <q-alert v-if="minorsToPrint.length" type="positive">
            <p>
              Hai inserito una dichiarazione congiunta di responsabilità genitoriale per i seguenti figli:
            </p>
            <ul>
              <li v-for="(minor, i) in minorsToPrint">
                <strong>{{minor.nome}} {{minor.cognome}}</strong>
              </li>
            </ul>

            <p>
              Una notifica è stata inoltrata a <strong>{{parent.name}} {{parent.surname}}</strong> per completare la
              dichiarazione.
            </p>
          </q-alert>

          <q-alert type="negative" v-if="minorsNotToPrint.length" class="q-mt-md">
            <p>
              Non è stato possiible inserire la dichiarazione per i seguenti figli:
            </p>
            <ul>
              <li v-for="(minor, i) in minorsNotToPrint">
                <strong>{{minor.name}} {{minor.surname}}</strong>
              </li>
            </ul>
          </q-alert>
          <div class="q-mt-md text-right">
            <q-btn
              @click="$router.push($routes.DELEGATIONS.PIEDMONT_MINORS)"
              color="primary">
              Torna ai tuoi figli minori
            </q-btn>
          </div>

        </q-step>

      </csi-stepper>
    </template>
    <q-inner-loading :visible="isLoading">
      <q-spinner-mat size="50px" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-page>
</template>


<script>
  import {minLength, required} from 'vuelidate/lib/validators'
  import CsiPageTitle from 'components/global/common/CsiPageTitle'
  import CsiFormPerson from 'components/global/forms/CsiFormPerson'
  import CsiPolicy from 'components/global/common/CsiPolicy'
  import CsiDeclarationSummary from 'components/delegations/CsiDeclarationSummary'
  import {personValidationMixin} from '@mixins/validationsMixin'
  import subYears from 'date-fns/sub_years'
  import CsiIconBase from 'components/global/icons/CsiIconBase'
  import CsiIconAvatarPerson from 'components/global/icons/CsiIconAvatarPerson'
  import CsiIconAvatarPersonAdd from 'components/global/icons/CsiIconAvatarPersonAdd'
  import {getResponseStatusCode} from '@services/api/utils'
  import {getDeclarations, saveDeclaration} from '@services/api/delegations'
  import {capitalize, capitalizeEveryWord, uniqueElementsBy} from '@services/global/utils'

  export default {
    name: 'PageNewJointDeclaration',
    mixins: [personValidationMixin],
    components: {
      CsiIconAvatarPerson,
      CsiIconBase,
      CsiDeclarationSummary,
      CsiPolicy,
      CsiFormPerson,
      CsiPageTitle,
      CsiIconAvatarPersonAdd
    },
    data() {
      return {
        showWarningAlertStep: false,
        noColumn: true,
        yesColumn: false,
        STEPS: {
          TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
          PARENT: 'PARENT',
          CHILDREN: 'CHILDREN',
          SUMMARY: 'SUMMARY',
          END: 'END',
        },
        isDisclaimerAccepted: false,
        parentMinBirthDate: subYears(new Date(), 18 + 100).toISOString(),
        parentMaxBirthDate: subYears(new Date(), 18).toISOString(),
        minorMinBirthDate: subYears(new Date(), 18).toISOString(),
        minorMaxBirthDate: new Date().toISOString(),
        isParentFormValid: false,
        minorsValidations: [],
        parent: {
          name: '',
          surname: '',
          birthDate: '',
          birthPlace: '',
          taxCode: '',
          gender: 'M'
        },
        minors: [
          this.getDefaultMinor()
        ],
        isSavingDeclarations: false,
        parentList: [],
        start: false,
        declarationsResponse: null,
        isLoading: false,
        controlSurname: [],
        minorsToPrint: [],
        minorsNotToPrint: [],
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
    validations() {
      let minorSchema = {...this.personValidationMixin_getSchema()}

      minorSchema.surname.surnameParents = (surname => {
        let surnames = this.controlSurname.map(s => s.toLowerCase())
        if (surnames.includes(surname.toLowerCase()))
          return true
        else {
          let responses = []
          for (let i = 0; i < surnames.length; i++) {
            responses[i] = surname.split(' ').map(part => {
              return surnames[i].includes(part.toLowerCase())
            })
          }

          let result = responses.map(response => response.includes(true))

          return result.includes(true)
        }
      })


      let schema = {
        parent: this.personValidationMixin_getSchema(),
        minors: {
          required,
          minLength: minLength(1),
          $each: minorSchema
        }
      }

      // rimuoviamo dallo schema di validazione del genitore il sesso dal momento che non è inserito dall'utente ma è dedotto.
      delete schema.parent.gender
      return schema
    },
    methods: {
      onStep() {
        // Al cambio di step resettiamo gli errori
        this.showWarningAlertStep = false
      },
      onWarningUpdateStep(val) {
        this.hasWarningStep = val
      },
      onBack() {
        this.$router.push(this.$routes.DELEGATIONS.PIEDMONT_MINORS)
      },
      useTheSameParent(parent, flag) {
        //setto il parente che mi passo dalla route
        this.parent.name = capitalize(parent.nome, true)
        this.parent.surname = capitalizeEveryWord(parent.cognome, true)
        this.parent.birthDate = parent.data_nascita
        this.parent.birthPlace = parent.comune_nascita
        this.parent.taxCode = parent.codice_fiscale
        this.parent.gender = parent.sesso
        this.generateSurnameToControl()
        if (!flag) this.$refs.newJointDeclarationStepper.next()
      },
      resetParent() {
        return {
          name: '',
          surname: '',
          birthDate: '',
          birthPlace: '',
          taxCode: '',
          gender: 'M'
        }
      },
      changeStateOfParent() {
        this.start = false
        this.parent = this.resetParent()
      },
      generateSurnameToControl() {
        this.controlSurname = []
        if (this.user.profile.info_anag.dati_primari.sesso === 'M')
          this.controlSurname.push(this.user.cognome)

        if (this.parent.gender === 'M')
          this.controlSurname.push(this.parent.surname)
      },
      isParentStepValid() {

        this.$v.parent.$touch()

        this.generateSurnameToControl()

        this.parent.name = capitalize(this.parent.name, true)
        this.parent.surname = capitalizeEveryWord(this.parent.surname, true)

        if (this.hasWarningStep) {
          if (this.showWarningAlertStep === true)
            return !this.$v.parent.$error
          else
            this.showWarningAlertStep = true
        } else
          return !this.$v.parent.$error
      },
      isMinorsStepValid() {
        this.$v.minors.$touch()
        this.minors.map(minor => {
          minor.name = capitalize(minor.name, true)
          minor.surname = capitalizeEveryWord(minor.surname, true)
        })
        if (this.hasWarningStep) {
          if (this.showWarningAlertStep === true)
            return !this.$v.parent.$error
          else
            this.showWarningAlertStep = true
        } else
          return !this.$v.minors.$error
      },
      isResumeStepValid() {

        if (!this.isDisclaimerAccepted) {
          this.$q.notify({
            type: 'negative',
            message: `Non puoi andare avanti senza accettare l'informativa`
          })
        }

        return this.isDisclaimerAccepted
      },
      getSaveDeclarationData(parent1TaxCode, parent2, minor) {

        let parent2Data = {
          codice_fiscale: parent2.taxCode,
        }

        let minorData = {
          codice_fiscale: minor.taxCode,
        }

        let myDetail = {
          stato: {codice: 'DA_APPROVARE'},
          genitore_tutore_curatore: {codice_fiscale: parent1TaxCode},
          ruolo_genitore_tutore_curatore: {codice: 'GENITORE_1'},
          figlio_tutelato_curato: minorData,
          ruolo_figlio_tutelato_curato: {codice: 'FIGLIO'},
        }

        let otherDetail = {
          stato: {codice: 'DA_APPROVARE'},
          genitore_tutore_curatore: parent2Data,
          ruolo_genitore_tutore_curatore: {codice: 'GENITORE_2'},
          figlio_tutelato_curato: minorData,
          ruolo_figlio_tutelato_curato: {codice: 'FIGLIO'},
        }

        let data = {
          tipo: {codice: 'CONGIUNTA'},
          stato: {codice: 'DA_COMPLETARE'},
          modo: {codice: 'ON_LINE'},
          dettagli: [myDetail, otherDetail]
        }

        return data
      },
      async onConfirm() {
        if (!this.isResumeStepValid()) return

        // Generiamo una lista di dichiarazioni da salvare
        let declarations = this.minors.map(m => this.getSaveDeclarationData(this.user.cf, this.parent, m))
        let promises = declarations.map(d => saveDeclaration(this.user.cf, d, {_no5XXRedirect: true}))

        this.isSavingDeclarations = true

        let responses = await Promise.all(promises.map(p => {
          return p.then(data => {
            this.minorsToPrint.push(data.data.dettagli[0].figlio_tutelato_curato)
          }).catch(error => {
            if (error.response.status !== 502) {
              this.$q.notify({
                type: 'negative',
                message: `[${getResponseStatusCode(error)}] Non è stato possibile modificare alcune deleghe`
              })
            }
          })
        }))

        this.minorsToPrint = this.minorsToPrint.map(minor => {
          minor.nome = capitalize(minor.nome, true)
          minor.cognome = capitalizeEveryWord(minor.cognome, true)
          return minor
        })

        this.$refs.newJointDeclarationStepper.next()

        if (this.minorsToPrint.length !== this.minors.length) {
          if (this.minorsToPrint.length > 0) {
            this.minorsNotToPrint = this.minors.filter(obj => {
              return this.minorsToPrint.some(obj2 => {
                return obj.taxCode !== obj2.codice_fiscale
              })
            })
            this.minorsNotToPrint = this.minorsNotToPrint.map(minor => {
              minor.nome = capitalize(minor.nome, true)
              minor.cognome = capitalizeEveryWord(minor.cognome, true)
            })
          } else
            this.minorsNotToPrint = this.minors
        }

        this.isSavingDeclarations = false
      },
      getDefaultMinor() {
        return {
          name: '',
          surname: '',
          birthDate: null,
          birthPlace: '',
          taxCode: '',
          gender: 'M'
        }
      },
      addMinor() {
        this.minors.push(this.getDefaultMinor())
      },
      removeMinor(minor, index) {
        this.minors.splice(index, 1)
      },
      checkGender() {
        if (this.user.profile.info_anag.dati_primari.sesso === 'M')
          return 'F'
        else
          return 'M'
      },
      checkNumberOfColumns() {
        if (this.parentList.length > 2) {
          this.noColumn = false
          this.yesColumn = true
        } else {
          this.noColumn = true
          this.yesColumn = false
        }
      }
    },
    mounted() {
      if (this.$route.params.declaration)
        this.$refs.newJointDeclarationStepper.goToStep(this.STEPS.SUMMARY)
    },
    async created() {
      if (this.$route.params.declaration) {
        this.start = false
        if (this.user.cf !== this.$route.params.declaration.cittadino.codice_fiscale)
          this.useTheSameParent(this.$route.params.declaration.cittadino, true)
        else if (this.user.cf !== this.$route.params.declaration.dettagli[1].genitore_tutore_curatore.codice_fiscale)
          this.useTheSameParent(this.$route.params.declaration.dettagli[1].genitore_tutore_curatore, true)
        else
          this.useTheSameParent(this.$route.params.declaration.dettagli[0].genitore_tutore_curatore, true)

        this.minors[0] = {
          name: capitalize(this.$route.params.declaration.dettagli[0].figlio_tutelato_curato.nome, true),
          surname: capitalizeEveryWord(this.$route.params.declaration.dettagli[0].figlio_tutelato_curato.cognome, true),
          birthDate: this.$route.params.declaration.dettagli[0].figlio_tutelato_curato.data_nascita,
          birthPlace: this.$route.params.declaration.dettagli[0].figlio_tutelato_curato.comune_nascita,
          taxCode: this.$route.params.declaration.dettagli[0].figlio_tutelato_curato.codice_fiscale,
          gender: this.$route.params.declaration.dettagli[0].figlio_tutelato_curato.sesso
        }
      } else {
        if (!this.$route.params.dettagli) {
          this.isLoading = true
          this.declarationsResponse = await getDeclarations(this.user.cf)
          this.$route.params.dettagli = this.declarationsResponse.data
        }

        for (let i = 0; i < this.$route.params.dettagli.length; i++) {
          this.parentList = this.parentList.concat(this.$route.params.dettagli[i].dettagli.map(dettaglio =>
            dettaglio.genitore_tutore_curatore).filter(dettaglio => dettaglio.codice_fiscale != this.user.cf))
        }

        if (this.parentList.length > 0) {
          this.start = true
          this.checkNumberOfColumns()
          this.parentList = uniqueElementsBy(this.parentList, (a, b) => {
            return a.codice_fiscale == b.codice_fiscale
          })
        }

      }
      this.isLoading = false
      this.parent.gender = this.checkGender()
    }
  }
</script>
