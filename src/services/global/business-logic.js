
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import differenceInCalendarYears from 'date-fns/difference_in_calendar_years'

export const isFemale = gender => ['F'].includes(gender)
export const isMale = gender => !isFemale(gender)
export const isMinor = birthDate => differenceInCalendarYears(new Date(), birthDate) < 18
export const isAdult = birthDate => !isMinor(birthDate)


