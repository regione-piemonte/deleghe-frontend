
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {axiosInstance} from '@plugins/axios'
import {config} from '@plugins/config'

const BASE_PATH = config.global.basePaths.delegations

export const getDelegators = (cf, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/deleganti`
  return axiosInstance.get(URL, config)
}


export const getServiceDelegators = async (cf, serviceCode, config = {}) => {
  let response = await getDelegators(cf, config)
  response.data = response.data.filter(delegator => {
    return delegator.deleghe.some(delegation => delegation.codice_servizio === serviceCode)
  })
  return response
}


export const getDelegates = (cf, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/delegati`
  return axiosInstance.get(URL, config)
}


export const getDelegate = (userCf, delegateCf, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${userCf}/delegati/${delegateCf}`
  return axiosInstance.get(URL, config)
}


export const saveDelegate = (cf, data, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/delegati`
  return axiosInstance.post(URL, data, config)
}


// Modifica delle deleghe
export const editDelegate = (cf, delegateCf, data, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/delegati/${delegateCf}`
  return axiosInstance.put(URL, data, config)
}

// Rinuncia alla delega
export const waiveDelegation = (cf, delegatorCf, delegationId, data = {}, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/deleganti/${delegatorCf}/servizi/${delegationId}`
  return axiosInstance.put(URL, data, config)
}


export const getDeclarations = (cf, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/dichiarazioni`
  return axiosInstance.get(URL, config)
}


// @TODO: chiedere endpoint per ottenere la singola dichiarazione
export const getDeclaration = async (cf, id, config = {}) => {
  let response = await getDeclarations(cf, config)
  let result = response.data.find(d => d.uuid === id)
  if (!result) throw new Error(`Nessuna dichiarazione trovata per l'id ${id}`)
  response.data = result
  return response
}


// Permette di salvare una dichiarazione
export const saveDeclaration = (cf, data, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/dichiarazioni`
  return axiosInstance.post(URL, data, config)
}


export const updateDeclaration = (cf, id, data, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/dichiarazioni/${id}`
  return axiosInstance.put(URL, data, config)
}
