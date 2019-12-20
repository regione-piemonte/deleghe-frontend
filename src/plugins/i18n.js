
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

export default ({ app, Vue }) => {
  Vue.use(VueI18n);

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'it-IT',
    fallbackLocale: 'it-IT',
    messages
  })
}
