
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'

import delegations from './delegations'


Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    global,

    delegations,

  }
})

export default store
