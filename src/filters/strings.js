
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/

export const PREFIX_ITALY = '0039'


/**
 * @description
 * Rimuove dall'inizio della stringa, in questo caso un numero di telefono mobile, il prefisso internazionale desiderato.
 * Di default rimuove il predisso internazionale italiano (0039).
 *
 * @param {String} s -  Il numero di telefono mobile da formattare rimuovendo il numero di prefisso
 * @param {String} prefix - Il prefisso da rimuovere se presente. Di default prova a rimuovere il prefisso italiano
 * @returns {String} il numero di telefono senza prefisso
 */
export const mobilePhoneStripPrefix = (s, prefix = PREFIX_ITALY) => {
  return s.replace(new RegExp(`^${prefix}`), '')
};
