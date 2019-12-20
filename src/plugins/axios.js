
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import axios from 'axios'
import {config} from 'plugins/config'
import {errorHasResponse, responseHasRequest} from '@services/api/utils'
import {login} from '@services/global/session'

// Configurazione di base di axios che sarà poi usara internamente da ogni servizio per le API
let axiosConfig = {baseURL: config.global.envs.API_BASE_URL}
let axiosPublicConfig = {baseURL: config.global.envs.API_PUBLIC_BASE_URL}


// Se siamo in modalità 'development' aggiungiamo degli header e dei parametri nella query string
// per poter debuggare lato server
if (config.global.isDevelopment) {
  axiosConfig.params = {XDEBUG_SESSION_START: 'PHPSTORM'}
  axiosPublicConfig.params = {XDEBUG_SESSION_START: 'PHPSTORM'}
}

let axiosInstance = axios.create(axiosConfig)
let axiosPublicInstance = axios.create(axiosPublicConfig)

handleSessionTimeOut(axiosInstance)
handleSessionTimeOut(axiosPublicInstance)

// Esportiamo l'istanza creata e iniettiamole nel prototipo Vue così da poterlo usare `this.$axios`
export {axiosInstance, axiosPublicInstance}
export default ({Vue}) => {
  Vue.prototype.$axios = axiosInstance
  Vue.prototype.$axiosPublic = axiosPublicInstance
}


function getTheVersion() {
  return config.global.version
}


function handleSessionTimeOut(instance) {
  instance.interceptors.response.use(
    response => response,
    error => {

      if (!errorHasResponse(error) && responseHasRequest(error)) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.debug('[Interceptor] Detected unknown error:', {error})

        if (!error.config.url.includes('bff/identity')) {
          console.debug('[Interceptor] Session timeout => redirect to login')
          login()
          return
        }
      }

      console.debug('[Interceptor] It\'s ok, we use this error as app logic')
      return Promise.reject(error)
    }
  )
}

