
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {ROUTES_BOOK} from '@router/routes'

export const routes = ROUTES_BOOK
export default ({app, router, Vue}) => {
  Vue.prototype.$routes = ROUTES_BOOK
}

