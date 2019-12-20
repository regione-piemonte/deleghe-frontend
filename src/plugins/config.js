
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import config from '@configs'

export {config}
export default ({app, router, Vue}) => {
  Vue.prototype.$config = config
}
