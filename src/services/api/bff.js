
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {axiosInstance} from '@plugins/axios'
import {axiosPublicInstance} from '@plugins/axios'
import {config} from '@plugins/config'

const BASE_PATH = config.global.basePaths.bff

export const getIdentity = (config = {}) => {
  const URL = `${BASE_PATH}/identity`
  return axiosInstance.get(URL, config)
}

export const getConfiguration = (nameConfiguration, config = {}) => {
  const URL = `${BASE_PATH}/apps/${nameConfiguration}`
  return axiosPublicInstance.get(URL, config)
}
