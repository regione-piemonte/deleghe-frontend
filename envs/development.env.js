
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
module.exports = {
  // Definisce l'ambiente su cui sta girando l'applicativo.
  // In questo modo l'applicazione può configurarsi di conseguenza.
  ENVIRONMENT: JSON.stringify('development'),

  // Permette di definire il path nel quale verrà hostata l'applicazione di front-end.
  PUBLIC_PATH: JSON.stringify('dummy/..'),

  // Definisce l'URL di base per le chiamate AJAX.
  API_BASE_URL: JSON.stringify('http://localhost:8000/auth'),
  API_PUBLIC_BASE_URL: JSON.stringify('http://localhost:8000/public'),

  APP_SERVICES_CODES: JSON.stringify({
    delegations: 'deleghe',
  })
}
