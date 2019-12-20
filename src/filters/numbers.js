
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
/**
 * @param {Number} value - Il numero con la virgola da troncare
 * @param {Number} digitNumber - Il numero di cifre dopo la virgola ammesse
 * @returns {string} - Il numero troncato
 *
 * @description
 * Limita i float/double ad un certo numero di cifre dopo la virgola.
 */
export const toFixed = (value, digitNumber = 2) => {
  return Number(value).toFixed(digitNumber);
};
