
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
// Controlla che un il valore in input sia esattamente lo stesso di quello fornito in input come "match"
export const is = (match) => value => value === match
// Come "is" ma permette all'utente di definire una funzione di validazione
export const isBy = (fn) => value => fn(value)
export const isTrue = is(true)
export const isFalse = is(false)
