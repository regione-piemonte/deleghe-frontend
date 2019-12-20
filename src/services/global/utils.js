
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {scroll} from 'quasar'
import localeIt from 'date-fns/locale/it'
import __format from 'date-fns/format'
import __distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import __distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import {Platform} from 'quasar-framework'

const {getScrollTarget, setScrollPosition} = scroll

export const DEFAULT_SCROLL_DURATION = 500

export const scrollToElement = (element, duration = DEFAULT_SCROLL_DURATION) => {
  let target = getScrollTarget(element)
  let offset = element.offsetTop
  setScrollPosition(target, offset, duration)
}


// LODASH REPLACEMENT
// ---------------------------------------------------------------------------------------------------------------------
export const defaultTo = (value, defaultValue) => (value == null || value !== value) ? defaultValue : value

export const get = (object, path, defaultValue) => {
  let levels = path.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(l => l !== '')
  let result = levels.reduce((prev, cur) => prev && prev[cur], object)
  return defaultTo(result, defaultValue)
}

// @see: https://30secondsofcode.org/object#defaults
export const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj)

// @see https://30secondsofcode.org/type#isnil
export const isNil = val => val === undefined || val === null

// @see https://30secondsofcode.org/type#isempty
export const isEmpty = val => val == null || !(Object.keys(val) || val).length

// @see https://30secondsofcode.org/string#capitalize
export const capitalize = ([first, ...rest], lowerRest = false) => {
  return first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
}

// @see https://30secondsofcode.org/string#capitalizeeveryword
export const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

// @see https://30secondsofcode.org/string#tocamelcase
export const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

// @see https://30secondsofcode.org/string#fromcamelcase
export const fromCamelCase = (str, separator = ' ') => {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase()
}

// @see https://30secondsofcode.org/index#last
export const last = arr => arr[arr.length - 1]

// @see https://30secondsofcode.org/object#orderby
export const orderBy = (arr, props, orders) => {
  return [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0)
  )
}

// @see https://30secondsofcode.org/object#deepclone
export const deepClone = obj => {

  if (obj === undefined) return undefined
  if (obj === null) return null

  let clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )

  if (Array.isArray(obj)) {
    clone.length = obj.length
    clone = Array.from(clone)
  }

  return clone
}

// @see https://30secondsofcode.org/index#uniqueelementsby
export const uniqueElementsBy = (arr, fn) => {
  return arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v)
    return acc
  }, [])
}


// @see https://30secondsofcode.org/index#unionby
export const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn))
  return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]))
}



// @see https://30secondsofcode.org/index#intersectionby
const _intersectionBy = (a, b, fn) => {
  let s = new Set(b.map(fn))
  return a.filter(x => s.has(fn(x)))
}

export const intersectionBy = (...args) => {
  let fn = args[args.length - 1]
  let initial = args[0]
  let arrays = args.slice(1, -1)
  return arrays.reduce((result, array) => _intersectionBy(result, array, fn), initial)
}


// DATE-FSN WRAPPERS
// @see: https://date-fns.org/v1.29.0/docs/I18n
// ---------------------------------------------------------------------------------------------------------------------
const DEFAULT_DATE_FNS_OPTIONS = {locale: localeIt}

export const format = (date, formatStr, options) => {
  options = defaults(options, DEFAULT_DATE_FNS_OPTIONS)
  return __format(date, formatStr, options)
}

export const distanceInWordsToNow = (date, options) => {
  options = defaults(options, DEFAULT_DATE_FNS_OPTIONS)
  return __distanceInWordsToNow(date, options)
}


export const distanceInWordsStrict = (dateToCompare, date, options) => {
  options = defaults(options, DEFAULT_DATE_FNS_OPTIONS)
  return __distanceInWordsStrict(dateToCompare, date, options)
}


// OTHER
// ---------------------------------------------------------------------------------------------------------------------
export const openUrl = (url) => {

  // Su iOS apriamo il PDF in una nuova tab mentre su tutti gli altri sistemi proviamo ad aprirlo nella stessa tab
  if (Platform.is.ios) {
    console.debug('[iOS] openUrl:', url)
    window.open(url)
  } else {
    console.debug('[!iOS] openUrl:', url)
    window.location.assign(url)
  }

}


// IN ATTESA DI AXIOS 0.19 stabile
// ---------------------------------------------------------------------------------------------------------------------
// @NOTE: Al momento axios 0.18 non offre la possibilità di ottenre la URL che costruisce (es. querystring encodata ecc)
//        Nella versione 0.19 mette a disposizione il metodo getUri() che è proprio quello che ci serve ma introduce
//        alcuni bug per funzionalità che attualmente usiamo: le proprietà custom nella configurazione (es. _no5XXRedirect)
//        Per questo motivo abbiamo momentaneamente riportato qui la logica che usa Axios per costruire le URL. Appena
//        la nuova versione sarà stabile potremo fare uno switch relativamente semplice
//
//  @see https://github.com/axios/axios/issues/2203
// ---------------------------------------------------------------------------------------------------------------------
export const getUri = (cfg) => {

  function isArray(val) {
    return toString.call(val) === '[object Array]'
  }

  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
  }

  function isDate(val) {
    return toString.call(val) === '[object Date]'
  }

  function isObject(val) {
    return val !== null && typeof val === 'object'
  }

  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj]
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj)
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj)
        }
      }
    }
  }

  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']')
  }

  function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url
    }

    let serializedParams
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params)
    } else if (isURLSearchParams(params)) {
      serializedParams = params.toString()
    } else {
      var parts = []

      forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return
        }

        if (isArray(val)) {
          key = key + '[]'
        } else {
          val = [val]
        }

        forEach(val, function parseValue(v) {
          if (isDate(v)) {
            v = v.toISOString()
          } else if (isObject(v)) {
            v = JSON.stringify(v)
          }
          parts.push(encode(key) + '=' + encode(v))
        })
      })

      serializedParams = parts.join('&')
    }

    if (serializedParams) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url
  }


  return buildURL(cfg.url, cfg.params, cfg.paramsSerializer)
}


