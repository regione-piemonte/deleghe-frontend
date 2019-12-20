
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import * as GLOBAL_ROUTES from './global'
import * as DELEGATIONS_ROUTES from './delegations'


export const LAYOUT_APP = {
  path: '/',
  component: () => import('layouts/LayoutApp'),
  meta: {isPublic: true},
  children: [
    GLOBAL_ROUTES.APP,
    GLOBAL_ROUTES.SERVICE_RATING,
    DELEGATIONS_ROUTES.APP,
  ]
}


export default [
  LAYOUT_APP,
]


export const ROUTES_BOOK = {
  LAYOUT_APP,
  GLOBAL: GLOBAL_ROUTES,
  DELEGATIONS: DELEGATIONS_ROUTES,
}
