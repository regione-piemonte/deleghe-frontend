
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import CsiButton from 'components/global/design/CsiButton'
import CsiButtons from 'components/global/design/CsiButtons'
import CsiStepper from 'components/global/common/CsiStepper'

export default ({app, router, Vue}) => {
  Vue.component(CsiButton.name, CsiButton)
  Vue.component(CsiButtons.name, CsiButtons)
  Vue.component(CsiStepper.name, CsiStepper)
}
