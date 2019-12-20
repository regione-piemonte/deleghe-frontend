
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import isWithinRange from 'date-fns/is_within_range'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import {distanceInWordsToNow, format as __format} from '@services/global/utils'


export const DEFAULT_FORMAT = 'DD MMM YYYY'

/**
 * @param {Date|String} date - La data da formattare
 * @param {String} format=DEFAULT_FORMAT - Una stringa che descrive come formattare la data attraverso date-fns
 * @returns {String} - La data formattata
 *
 * @description
 * Permette di ottenere una formattazione delle date omogenea in tutto il progetto.
 * Per casi estremi, basta passare il parametro `format` per ottenere la formattazione desiderata.
 */
export const format = (date, format = DEFAULT_FORMAT) => {
  return __format(date, format)
}


/**
 * @param {Date|String} date - La data da formattare
 * @param {Number} daysBefore=null - Se now - daysBefore <= date <= now => formatta la data relativamente
 * @param {Number} daysAfter=null - Se now <= date <= now + daysAfter => formatta la data relativamente
 * @param {String} _format=DEFAULT_FORMAT - Una stringa che descrive come formattare la data attraverso date-fns
 * @returns {string} - La data formattata
 *
 * @description
 * Formatta una data relativamente rispetto a `now()`
 */
export const formatRelative = (date, daysBefore = null, daysAfter = null, _format = DEFAULT_FORMAT) => {

  let options = {unit: 'd'}
  let now = new Date()
  let lowerLimit = date
  let upperLimit = date

  if (daysBefore !== null) {
    lowerLimit = subDays(date, daysBefore)
  }

  if (daysAfter !== null) {
    upperLimit = addDays(date, daysAfter)
  }

  return isWithinRange(now, lowerLimit, upperLimit) ? distanceInWordsToNow(date) : format(date, _format)
}


