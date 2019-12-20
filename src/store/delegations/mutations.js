
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
export const setDelegator = (state, person) => state.delegator = person
export const setMinorDelegator = (state, person) => state.minor = person


export default {
  setDelegator,
  setMinorDelegator
}
