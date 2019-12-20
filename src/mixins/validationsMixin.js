
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {alphaNum, required} from 'vuelidate/lib/validators'
import {taxCodeCin, taxCodeLength, taxCodeMonth, taxCodeName, taxCodeSurname} from '@validators/taxCode'
import getMonth from 'date-fns/get_month'

/**
 * Mixin per la validazione della persona.
 * Da usare quando si ha una form che chiede i dati tipici di una persona:
 *  - Nome
 *  - Cognome
 *  - Data di nascita
 *  - Luogo di nascita
 *  - Sesso
 *  - Codice fiscale
 *
 * @type {{methods: {personValidationMixin_getSchema(): *}}}
 */
export const personValidationMixin = {
  methods: {
    personValidationMixin_getSchema() {
      return {
        name: {required},
        surname: {required},
        birthDate: {required},
        birthPlace: {required},
        gender: {required},
        taxCode: {
          required,
          alphaNum,
          taxCodeLength,
          taxCodeCin,
          taxCodeName: (taxCode, person) => taxCodeName(person.name)(taxCode),
          taxCodeSurname: (taxCode, person) => taxCodeSurname(person.surname)(taxCode),
          taxCodeMonth: (taxCode, person) => taxCodeMonth(person.birthDate ? getMonth(person.birthDate) : undefined)(taxCode)
        },
      }
    }
  },
}
