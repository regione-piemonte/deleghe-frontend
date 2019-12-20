
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {axiosInstance} from '@plugins/axios'
import {config} from '@plugins/config'

const BASE_PATH = config.global.basePaths.profile

export const getProfile = (cf, config = {}) => {
  const URL = `${BASE_PATH}/cittadini/${cf}/profilo`
  return axiosInstance.get(URL, config)
}

