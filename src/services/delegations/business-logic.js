
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import differenceInYears from 'date-fns/difference_in_years'
import addDays from 'date-fns/add_days'
import {config} from '@plugins/config'
import {defaultTo, orderBy} from '@services/global/utils'

// Restituisce una mappa contenente gli stati delle deleghe
export const getDelegationStatuss = () => config.delegations.delegationStatuss

// Dato uno status, restituisce la label associata
export const getDelegationStatusLabel = status => config.delegations.delegationStatus2Label[status]

// Restituisce una mappa contenente gli stati delle dichiarazioni
export const getDeclarationStatuss = () => config.delegations.declarationStatuss

// Dato uno status, restituisce la label associata(dichiarazioni)
export const getDeclarationStatusLabel = status => config.delegations.declarationStatus2Label[status]

// Restituisce lo stato di default da applicare spesso nei filtri
export const getDefaultDelegationStatus = () => config.delegations.delegationStatuss.ACTIVE

// Dato un servizio, restituisce il numero di giorni massimo di delegabilità
export const getDelegationDaysInterval = service => {
  let value = defaultTo(service.numero_giorni_delegabile, config.delegations.defaultDelegationDaysInterval)
  // Il massimo accettabile è config.delegations.defaultDelegationDaysInterval
  return Math.min(value, config.delegations.defaultDelegationDaysInterval)
}

// Dato uno status, restituisce true se può essere considerato "valido", false altrimenti
export const isDelegationValid = status => {
  return config.delegations.delegationValidStatuss.includes(status)
}

// Dato un delegante, restituisce true se si tratta di un minore, false altrimenti
export const isDelegatorMinor = delegator => {
  return differenceInYears(new Date(), delegator.data_nascita_delega) < 18
}

// Permette di ottenere il path i18n da tradurre della descrizione della delega
export const getServiceDescriptionI18n = serviceCode => {
  let path = ''

  switch (serviceCode) {
    case config.global.appServiceCodes.healthPayments:
      path = 'DELEGATIONS.SERVICES_DESCRIPTIONS.HEALTH_PAYMENTS'
      break
    case config.global.appServiceCodes.onlineReports:
      path = 'DELEGATIONS.SERVICES_DESCRIPTIONS.ONLINE_REPORTS'
      break
    case config.global.appServiceCodes.incomeExemption:
      path = 'DELEGATIONS.SERVICES_DESCRIPTIONS.INCOME_EXEMPTION'
      break
  }

  return path
}


// Permette di ottenere le sole delege attive in una lista di deleghe
export const getActiveDelegations = delegations => {
  return delegations.filter(d => isDelegationValid(d.stato_delega))
}


// Costruisce una delega di default: quella in fase di creazione
export const buildDefaultDelegation = service => {
  let now = new Date()
  let dayDifference = getDelegationDaysInterval(service)

  return {
    codice_servizio: service.codice_servizio,
    data_inizio_delega: now.toISOString(),
    data_fine_delega: addDays(now, dayDifference).toISOString(),
    stato_delega: config.delegations.delegationStatuss.NOT_ACTIVE,
  }
}


// Permette di ottenre l'ultima delega creata per un dato servizio
export const getLastDelegation = (delegations, serviceCode) => {
  let serviceDelegations = delegations.filter(d => d.codice_servizio === serviceCode)
  let serviceDelegationsOrdered = orderBy(serviceDelegations, d => {
    return d.data_revoca || d.data_rinuncia || d.data_inizio_delega
  }, ['desc'])

  return serviceDelegationsOrdered[0]
}


// Permette di ottenere lo stato attuale delle deleghe: per ogni servizio mantiene solo l'ultima delega ed ignora
// il resto che fa parte dello storico
export const getLastDelegations = delegations => {
  let servicesCodes = delegations.map(d => d.codice_servizio)
  let lastDelegations = servicesCodes.map(code => getLastDelegation(delegations, code))
  return lastDelegations
}


// Permette di ottenre solo le deleghe da passare nel payload per la creazione e l'aggiornamento delle deleghe
// Attualmente filtra le deleghe prima per ottenere lo stato attuale e poi rimuove tutte quelle impostate come
// "Non attive"
export const getDelegationPayload = delegations => {
  let lastDelegations = getLastDelegations(delegations)
  return lastDelegations.filter(d => d.stato_delega !== config.delegations.delegationStatuss.NOT_ACTIVE)
}


export const getParentDeclarationDetailItem = (declaration, cf) => {
  return declaration.dettagli.find(d => d.genitore_tutore_curatore.codice_fiscale === cf)
}


export const getOtherParentDeclarationDetailItem = (declaration, cf) => {
  return declaration.dettagli.find(d => d.genitore_tutore_curatore.codice_fiscale !== cf)
}


export const getDeclarationParent = (declaration, cf) => {
  let item = getParentDeclarationDetailItem(declaration, cf)
  return item.genitore_tutore_curatore
}


export const getDeclarationOtherParent = (declaration, cf) => {
  let item = getOtherParentDeclarationDetailItem(declaration, cf)
  return item.genitore_tutore_curatore
}


export const getParentDeclarationRole = (declaration, cf) => {
  let item = getParentDeclarationDetailItem(declaration, cf)
  return item.ruolo_genitore_tutore_curatore
}


export const getOtherParentDeclarationRole = (declaration, cf) => {
  let item = getOtherParentDeclarationDetailItem(declaration, cf)
  return item.ruolo_genitore_tutore_curatore
}


// @TODO: il ruolo "GENITORE_1" indica il genitore che ha richiesto la dichiarazione
// @TODO: il ruolo "GENITORE_2" indica il genitore che deve confermare la dichiarazione
export const isDeclarationRequestingParent = (declaration, cf) => {
  let role = getParentDeclarationRole(declaration, cf)
  // @TODO: spostare questo parametro nella configurazione
  return role.codice === 'GENITORE_1'
}


export const getParentDeclarationStatus = (declaration, cf) => {
  let item = getParentDeclarationDetailItem(declaration, cf)
  return item.stato
}


export const getOtherParentDeclarationStatus = (declaration, cf) => {
  let item = getOtherParentDeclarationDetailItem(declaration, cf)
  return item.stato
}


export const getDeclarationMinor = (declaration) => {
  return declaration.dettagli[0].figlio_tutelato_curato
}
