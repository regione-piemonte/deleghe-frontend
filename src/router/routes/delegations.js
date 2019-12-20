
/*
* SPDX-License-Identifier: EUPL-1.2
* (C) Copyright 2019-2020 Regione Piemonte
*/
import {config} from '@plugins/config'

export const NO_PIEDMONT_HOME = {
  path: 'no-piemonte/home',
  name: 'delegationsNoPiedmontHome',
  component: () => import('pages/delegations/PageNoPiedmontHome'),
  meta: {
    prettyName: 'Home',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const NO_PIEDMONT = {
  path: 'no-piemonte',
  name: 'delegationsNoPiedmont',
  redirect: NO_PIEDMONT_HOME,
  meta: {
    prettyName: 'No Piemonte',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const PIEDMONT_DELEGATES = {
  path: 'delegati',
  name: 'delegationsPiedmontDelegates',
  component: () => import('pages/delegations/PagePiedmontDelegates'),
  meta: {
    prettyName: 'Delegati',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const PIEDMONT_DELEGATE_EDIT = {
  path: 'piemonte/delegati/:delegateCf/modifica',
  name: 'delegationsPiedmontDelegateEdit',
  component: () => import('pages/delegations/PagePiedmontDelegateEdit'),
  meta: {
    prettyName: 'Delegato',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const PIEDMONT_DELEGATORS = {
  path: 'deleganti',
  name: 'delegationsPiedmontDelegators',
  component: () => import('pages/delegations/PagePiedmontDelegators'),
  meta: {
    prettyName: 'Deleganti',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const PIEDMONT_MINORS = {
  path: 'minori',
  name: 'delegationsPiedmontMinors',
  component: () => import('pages/delegations/PagePiedmontMinors'),
  meta: {
    prettyName: 'Gestione minori',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const PIEDMONT_HOME = {
  path: '',
  name: 'delegationsPiedmontHome',
  redirect: PIEDMONT_DELEGATES,
  meta: {
    prettyName: 'Piemonte',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const PIEDMONT = {
  path: 'piemonte',
  name: 'delegationsPiedmont',
  component: () => import('pages/delegations/PagePiedmont'),
  redirect: PIEDMONT_HOME,
  meta: {
    prettyName: 'Piemonte',
    appServiceCode: config.global.appServiceCodes.delegations,
  },
  children: [
    PIEDMONT_HOME,
    PIEDMONT_DELEGATES,
    PIEDMONT_DELEGATORS,
    PIEDMONT_MINORS,
  ],
}

export const NEW_DELEGATE = {
  path: 'nuovo-delegato',
  name: 'delegationsNewDelegate',
  component: () => import('pages/delegations/PageNewDelegate'),
  meta: {
    prettyName: 'Nuovo delegato',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const NEW_JOINT_DECLARATION = {
  path: 'dichiarazioni/congiunta/nuova',
  name: 'delegationsNewJointDeclaration',
  component: () => import('pages/delegations/PageNewJointDeclaration'),
  meta: {
    prettyName: 'Nuova dichiarazione congiunta',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}


export const DELEGATE_HISTORY = {
  path: 'delegati/:taxCode/storico',
  name: 'delegationsDelegateHistory',
  component: () => import('pages/delegations/PageDelegateHistory'),
  meta: {
    prettyName: 'Storico delegato',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}


export const POLICY = {
  path: 'termini-e-condizioni',
  name: 'delegationsPolicy',
  component: () => import('pages/delegations/PagePolicy'),
  meta: {
    prettyName: 'Termini e condizioni',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const POLICY_MINORS = {
  path: 'termini-e-condizioni-minori',
  name: 'delegationsPolicyMinors',
  component: () => import('pages/delegations/PagePolicyMinors'),
  meta: {
    prettyName: 'Termini e condizioni minori',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const DECLARATION_CONFIRM = {
  path: 'dichiarazioni/:id/conferma',
  name: 'declarationConfirm',
  component: () => import('pages/delegations/PageDeclarationConfirm'),
  meta: {
    prettyName: 'Conferma dichiarazione',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}


export const DECLARATION_REVOKE = {
  path: 'dichiarazioni/:id/revoca',
  name: 'declarationRevoke',
  component: () => import('pages/delegations/PageDeclarationRevoke'),
  meta: {
    prettyName: 'Revoca dichiarazione',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}


export const CONFIRM_REVOKE = {
  path: 'dichiarazioni/:id/revoca/confirm-revoke',
  name: 'confirmRevoke',
  component: () => import('pages/delegations/PageConfirmRevoke'),
  meta: {
    prettyName: 'confirmRevoke',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}


export const CONFIRM_DECLARATION = {
  path: 'dichiarazioni/:id/revoca/confirm-declaration',
  name: 'confirmDeclaration',
  component: () => import('pages/delegations/PageConfirmDeclarations'),
  meta: {
    prettyName: 'confirmDeclarations',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const FAQ = {
  path: 'faq',
  name: 'delegationsHelpFaq',
  component: () => import('pages/delegations/PageHelpFaq'),
  meta: {
    prettyName: 'FAQ',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const CONTACTS = {
  path: 'contatti',
  name: 'delegationsHelpContacts',
  component: () => import('pages/delegations/PageHelpContacts'),
  meta: {
    prettyName: 'Contacts',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}

export const HELP = {
  path: 'aiuto',
  name: 'delegationsHelp',
  component: () => import('pages/delegations/PageHelp'),
  meta: {
    prettyName: 'Help',
    appServiceCode: config.global.appServiceCodes.delegations,
  },
  children: [
    CONTACTS,
    FAQ
  ]

}


export const HOME = {
  path: '',
  name: 'delegationsHome',
  component: () => import('pages/delegations/PageDelegationsHome'),
  meta: {
    prettyName: 'Home',
    appServiceCode: config.global.appServiceCodes.delegations,
  }
}


export const APP = {
  path: 'deleghe',
  name: 'delegationsApp',
  redirect: HOME,
  component: () => import('pages/delegations/AppDelegations'),
  meta: {
    prettyName: 'Gestione deleghe',
    appServiceCode: config.global.appServiceCodes.delegations,
  },
  children: [
    HOME,
    NO_PIEDMONT,
    NO_PIEDMONT_HOME,
    PIEDMONT,
    NEW_JOINT_DECLARATION,
    NEW_DELEGATE,
    PIEDMONT_DELEGATE_EDIT,
    DELEGATE_HISTORY,
    POLICY,
    POLICY_MINORS,
    DECLARATION_CONFIRM,
    DECLARATION_REVOKE,
    CONFIRM_REVOKE,
    CONFIRM_DECLARATION,
    HELP
  ]
}

