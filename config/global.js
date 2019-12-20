
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
let config = {}

// Proxy verso tutte le variabili d'ambiente impostate
config.envs = process.env

// Costanti utili per definire l'ambiente in cui gira l'applicativo
config.isDevelopment = config.envs.ENVIRONMENT === 'development'
config.isTest = config.envs.ENVIRONMENT === 'test'
config.isAlpha = config.envs.ENVIRONMENT === 'alpha'
config.isProduction = config.envs.ENVIRONMENT === 'production'
config.areMocksEnabled = config.envs.MOCKS_ENABLED === true

const getVersion = () => {
  return config.envs.__ENV.npm_package_version
}

config.version = getVersion()

// ---------------------------------------------------------------------------------------------------------------------
config.basePaths = {
  apiCross: '/apisancross/api/v1',
  bff: '/bff',
  delegations: '/apisanaut/api/v1',
  profile: '/apisanprof/api/v1',
}

// Mappa dei codici dei servizi restituite dalle API di apisancross
config.appServiceCodes = config.envs.APP_SERVICES_CODES


config.appServiceCode2Label = {
  [config.appServiceCodes.delegations]: 'Deleghe',
}

config.errorContacts = false
config.isToUpdate = false

export default config
