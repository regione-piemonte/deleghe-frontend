
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
let config = {}

// Nel caso in cui le API non ci dicano qual è il numero di giorni delegabili del servizio
//    => impostiamo il default a 365 giorni
config.defaultDelegationDaysInterval = 364

config.delegationStatuss = {
  ACTIVE: 'ATTIVA',
  NOT_ACTIVE: 'NON ATTIVA',
  REVOKED: 'REVOCATA',
  REFUSED: 'RIFIUTATA',
  IS_EXPIRING: 'IN_SCADENZA',
  EXPIRED: 'SCADUTA',
  UPDATED: 'AGGIORNATA',
}

config.delegationStatus2Label = {
  [config.delegationStatuss.ACTIVE]: 'Attiva',
  [config.delegationStatuss.NOT_ACTIVE]: 'Non attiva',
  [config.delegationStatuss.REVOKED]: 'Revocata',
  [config.delegationStatuss.REFUSED]: 'Rifiutata',
  [config.delegationStatuss.IS_EXPIRING]: 'In scadenza',
  [config.delegationStatuss.EXPIRED]: 'Scaduta',
  [config.delegationStatuss.UPDATED]: 'Aggiornata',
}

config.declarationStatuss = {
  DA_APPROVARE: 'DA_APPROVARE',
  VALIDA: 'VALIDA',
  REVOCATA_BLOCCO: 'REVOCATA_BLOCCO',
  REVOCATA: 'REVOCATA',
  SCADUTA: 'SCADUTA',
}

config.declarationStatus2Label = {
  [config.declarationStatuss.DA_APPROVARE]: 'Da approvare',
  [config.declarationStatuss.VALIDA]: 'Valida',
  [config.declarationStatuss.REVOCATA_BLOCCO]: 'Revocata in blocco',
  [config.declarationStatuss.REVOCATA]: 'Revocata',
  [config.declarationStatuss.SCADUTA]: 'Scaduta',
}


// Per quali codici stato consideriamo una delega come valida?
config.delegationValidStatuss = [
  config.delegationStatuss.ACTIVE,
  config.delegationStatuss.IS_EXPIRING,
]


export default config
