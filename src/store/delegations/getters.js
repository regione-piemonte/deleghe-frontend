
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {isDelegatorMinor} from '@services/delegations/business-logic'

export const adultDelegators = (state, getters) => (delegators) => {
  return delegators.filter(d => !isDelegatorMinor(d))
}

export const minorDelegators = (state, getters) => (delegators) => {
  return delegators.filter(d => isDelegatorMinor(d))
}

export const getDelegator = (state) => state.delegator
export const getMinorDelegator = (state) => state.minor


export default {
  adultDelegators,
  minorDelegators,
  getDelegator,
  getMinorDelegator,
}
