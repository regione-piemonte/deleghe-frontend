
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {isNil} from '@services/global/utils'

export const user = state => {
  return {
    ...state.userIdentity,
    profile: state.userProfile,
    enrollment: state.enrollmentInfo,
  }
}

export const isUserLogged = (state, getters) => !isNil(state.userIdentity)

// L'utente può essere considerato piemontese se è loggato e se la chiamata verso AURA non è fallita
export const isPiedmontUser = (state, getters) => {
  return !!(getters.isUserLogged && state.userProfile)
}


// Restituisce l'array contenente tutti i servizi dell'app
export const appServices = (state, getters) => {
  return state.appServices
}


// Permette di ottenere un servizio salvato nello store a partire da un codice
export const appService = (state, getters) => (serviceCode) => {
  if (!state.appServices) return undefined
  return state.appServices.find(s => s.codice_servizio === serviceCode)
}


// Permette di ottenere solo quei servizi considerati "delegabili"
export const delegableAppServices = (state, getters) => {
  if (!state.appServices) return []
  return state.appServices.filter(s => s.delegabile)
}

// Permette di sapere se l'utente è arruolato
export const isEnlisted = (state, getters) => {
  if (!state.enrollmentInfo) return []
  return state.enrollmentInfo.codice_risposta === '003'
}


export const appConfig = (state, getters) => state.appConfig


export default {
  user,
  isUserLogged,
  isPiedmontUser,
  appServices,
  appService,
  delegableAppServices,
  isEnlisted,
  appConfig,
}
