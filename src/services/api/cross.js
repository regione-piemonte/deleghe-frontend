
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {axiosPublicInstance} from '@plugins/axios'
import {config} from '@plugins/config'

const BASE_PATH = config.global.basePaths.apiCross

export const getServices = (config = {}) => {
  const URL = `${BASE_PATH}/servizi`
  return axiosPublicInstance.get(URL, config)
}

export const getCountries = (config = {}) => {
  const URL = `${BASE_PATH}/nazioni`
  return axiosPublicInstance.get(URL, config)
}

export const getCities = (config = {}) => {
  const URL = `${BASE_PATH}/comuni`
  return axiosPublicInstance.get(URL, config)
}
