
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {Notify} from 'quasar-framework'

export const isResponseError = (response) => {
  return response instanceof Error
}

// Un errore ha la proprietà "response" quando:
// The request was made and the server responded with a status code
// that falls out of the range of 2xx
export const errorHasResponse = (response) => {
  return isResponseError(response) && !!response.response
}

// Un errore contiene la proprietà "request" quando:
// The request was made but no response was received
// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
// http.ClientRequest in node.js
export const responseHasRequest = (response) => {
  return isResponseError(response) && !!response.request
}

export const getRequest = (response) => {
  if (responseHasRequest(response)) return response.request
}

export const getRequestConfig = (response) => {
  return response.config
}

export const getRequestHeaders = (response) => {
  let config = getRequestConfig(response)
  return config.headers
}


export const getRequestMethod = response => {
  let config = getRequestConfig(response)
  return config.method
}

export const getResponseheaders = (response) => {
  if (!isResponseError(response)) return response.headers
}

export const getResponseStatusCode = (response) => {
  if (!isResponseError(response)) return response.status
  if (errorHasResponse(response)) return response.response.status
}

export const getResponseStatusText = (response) => {
  if (!isResponseError(response)) return response.statusText
  if (errorHasResponse(response)) return response.response.statusText
}

export const getResponseData = (response) => {
  if (!isResponseError(response)) return response.data
}

export const isStatusIn = (response, lowerBound, upperBound) => {
  let status = getResponseStatusCode(response)
  return !!status && status >= lowerBound && status <= upperBound
}

export const is2XX = response => isStatusIn(response, 200, 299)
export const is3XX = response => isStatusIn(response, 300, 399)
export const is4XX = response => isStatusIn(response, 400, 499)
export const is5XX = response => isStatusIn(response, 500, 599)
export const isClientError = response => is4XX(response)
export const isServerError = response => is5XX(response)


/**
 * Un metodo standard per notificare all'utente l'errore
 *
 * @param error
 * @param message
 */
export const notifyError = (error, message) => {

  console.error(error)

  let code = getResponseStatusCode(error)
  let _message = code ? `[${code}] ${message}` : message

  Notify.create({
    color: 'negative',
    message: _message
  })
}

