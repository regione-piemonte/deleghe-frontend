
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {
  capitalize as _capitalize,
  capitalizeEveryWord,
  fromCamelCase,
  toCamelCase,
} from "@services/global/utils";


// '--Foo-Bar--' => '--foo-bar--'
// 'fooBar' => 'foobar'
export const toLower = s => s.toLowerCase();

// '--Foo-Bar--' => 'foo bar'
// 'fooBar' => 'foo bar'
export const lowerCase = s => toLower(fromCamelCase(toCamelCase(s), ' '));

// '--Foo-Bar--' => '--FOO-BAR--'
// 'fooBar' => 'FOOBAR'
export const toUpper = s => s.toUpperCase();

// '--Foo-Bar--' => 'FOO BAR'
// 'fooBar' => 'FOO BAR'
export const upperCase = s => toUpper(fromCamelCase(toCamelCase(s), ' '));

// '--Foo-Bar--' => 'Foo Bar'
// 'fooBar' => 'Foo Bar'
export const startCase = s => capitalizeEveryWord(fromCamelCase(toCamelCase(s), ' '));


// 'FRED' => 'Fred'
// 'fred' => 'Fred'
export const capitalize = s => _capitalize(s, true);
