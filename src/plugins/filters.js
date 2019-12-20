
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import * as dateFilters from '@filters/date'
import * as casesFilters from '@filters/cases'
import * as numberFilters from '@filters/numbers'
import * as stringFilters from '@filters/strings'

export default ({app, router, Vue}) => {

  // DATE
  Vue.filter('format', dateFilters.format)
  Vue.filter('formatRelative', dateFilters.formatRelative)

  // CASING
  Vue.filter('lowerCase', casesFilters.lowerCase)
  Vue.filter('toLower', casesFilters.toLower)
  Vue.filter('upperCase', casesFilters.upperCase)
  Vue.filter('toUpper', casesFilters.toUpper)
  Vue.filter('startCase', casesFilters.startCase)
  Vue.filter('capitalize', casesFilters.capitalize)

  // NUMERI
  Vue.filter('toFixed', numberFilters.toFixed)

  // STRINGHE
  Vue.filter('mobilePhoneStripPrefix', stringFilters.mobilePhoneStripPrefix)
}
