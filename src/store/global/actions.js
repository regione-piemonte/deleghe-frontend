
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {getConfiguration, getIdentity} from '@services/api/bff'
import {getProfile} from '@services/api/profile'

import {getServices} from '@services/api/cross'

const loadAppServices = async (context, payload) => {

  let services = []

  try {
    let response = await getServices()
    services = response.data
    context.commit('setAppServices', services)
  } catch (e) {
    console.error(e)
  }

  return services
}


const loadUserIdentity = async (context, payload) => {

  let user = undefined

  try {
    let response = await getIdentity()
    user = response.data
  } catch (e) {
    user = null
  }

  context.commit('setUserIdentity', user)
  return user
}


const loadUserProfile = async (context, payload) => {

  let {user} = payload
  let profile

  try {
    let response = await getProfile(user.cf, {_no5XXRedirect: true})
    profile = response.data
  } catch (e) {
    profile = null
  }

  context.commit('setUserProfile', profile)
  return profile
}


const loadUser = async (context, payload = {}) => {

  // Prendiamo in input un eventuale user mockato
  let user = payload.user
  if (user) {
    context.commit('setUserIdentity', user)
  } else {
    user = await context.dispatch('loadUserIdentity')
  }

  if (user) {
    let userProfilePromise = context.dispatch('loadUserProfile', {user})
    let userProfile = await userProfilePromise
  }

  return context.getters['user']
}


export const loadAppConfig = async (context, payload = {}) => {
  const APP_NAME = 'la-mia-salute'

  try {
    let response = await getConfiguration(APP_NAME)
    context.commit('setAppConfig', response.data.configurazione)
  } catch (e) {
    console.error(e)
  }

  return context.getters['appConfig']
}


export default {
  loadAppServices,
  loadUserIdentity,
  loadUserProfile,
  loadUser,
  loadAppConfig,
}
