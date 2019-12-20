
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
export const SERVICE_RATING = {
  path: 'valutazione',
  name: 'serviceRating',
  component: () => import('pages/global/PageServiceRating'),
  meta: {isPublic: true, prettyName: 'Valuta il servizio'}
}


export const APP = {
  path: '/',
  name: 'appGlobal',
  component: () => import('pages/global/AppGlobal'),
  meta: {
    prettyName: 'Pagina iniziale',
    isPublic: true,
  }
}

