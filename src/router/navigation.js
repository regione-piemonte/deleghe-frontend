
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {APP as DELEGATIONS_APP} from '@router/routes/delegations'
import CsiIconMenuDelegations from 'components/global/icons/CsiIconMenuDelegations'
import {config} from '@plugins/config'


export const DELEGATIONS_ITEM = {
  route: DELEGATIONS_APP,
  meta: {
    navigationLabel: 'Gestione Deleghe',
    navigationDescription: `Delega un altro soggetto adulto ad utilizzare per conto tuo uno dei servizi on line`,
    iconComponent: CsiIconMenuDelegations
  }
}


const NAVIGATION_TEST = [DELEGATIONS_ITEM,]
const NAVIGATION_PROD = [DELEGATIONS_ITEM,]
export const NAVIGATION = config.global.isProduction ? NAVIGATION_PROD : NAVIGATION_TEST
