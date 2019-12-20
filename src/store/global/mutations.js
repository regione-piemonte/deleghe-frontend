
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
const setUserIdentity = (state, userIdentity) => {
  state.userIdentity = userIdentity
}

const deleteUser = (state) => {
  state.user = undefined
}

const setAppServices = (state, appServices) => {
  state.appServices = appServices
}

const setEnrollmentInfo = (state, enrollmentInfo) => {
  state.enrollmentInfo = enrollmentInfo
}

const setUserProfile = (state, userProfile) => {
  state.userProfile = userProfile
}

export const setAppConfig = (state, appConfig) => {
  state.appConfig = appConfig
}

export default {
  setUserIdentity,
  setAppServices,
  setEnrollmentInfo,
  setUserProfile,
  setAppConfig,
}
