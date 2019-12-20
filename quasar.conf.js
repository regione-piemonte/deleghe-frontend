// Configuration for your app
const path = require('path');

let ENV_DEVELOPMENT = require('./envs/development.env');
let ENV_TEST = require('./envs/test.env');
let ENV_PRODUCTION = require('./envs/production.env');


module.exports = function (ctx) {

  // Identifichiamo prima l'ambiente su cui stiamo buildando
  let IS_TEST = process.env.BUILD_ENVIRONMENT === 'test';
  let IS_PRODUCTION = process.env.BUILD_ENVIRONMENT === 'production';

  // Impostiamo le variabili d'ambiente associate all'ambiente di building
  let env = ENV_DEVELOPMENT;
  if (IS_TEST) env = ENV_TEST;
  if (IS_PRODUCTION) env = ENV_PRODUCTION;

  // Aggiungiamo delle variabili utili all'applicazione
  env.BUILD_ENVIRONMENT = JSON.stringify(process.env.BUILD_ENVIRONMENT);
  env.__ENV = JSON.stringify(process.env);


  return {
    // app plugins (/src/plugins)
    plugins: [
      'config',
      'axios',
      'i18n',
      'portalVue',
      'vuelidate',
      'filters',
      'components',
      'routes',
    ],
    css: [
      'app.styl'
    ],
    extras: [
      // ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'hash',
      env: env,
      publicPath: JSON.parse(env.PUBLIC_PATH),
      extendWebpack(cfg) {

        cfg.resolve.alias = {
          // Aggiungiamo prima gli alias di impostati da Quasar:
          //
          // 'quasar' -> 'node_modules/quasar-framework/dist/quasar.<configured-theme>.esm.js'
          // 'src' -> '/src'
          // 'components' -> '/src/components'
          // 'layouts' -> '/src/layouts'
          // 'pages' -> '/src/pages'
          // 'assets' -> '/src/assets'
          // 'plugins' -> '/src/plugins'
          // 'variables' -> '/.quasar/variables.styl'
          ...cfg.resolve.alias,

          // Poi aggiungiamo i nostri alias
          '@services': path.resolve(cfg.resolve.alias.src, './services'),
          '@plugins': path.resolve(cfg.resolve.alias.plugins),
          '@store': path.resolve(cfg.resolve.alias.src, './store'),
          '@router': path.resolve(cfg.resolve.alias.src, './router'),
          '@validators': path.resolve(cfg.resolve.alias.src, './validators'),
          '@filters': path.resolve(cfg.resolve.alias.src, './filters'),

          '@mixins': path.resolve(cfg.resolve.alias.src, './mixins'),
          '@envs': path.resolve(__dirname, './envs'),
          '@configs': path.resolve(__dirname, './config'),
        };


        cfg.plugins = [
          ...cfg.plugins,
          // Aggiungi qui plugin webpack
        ];
      },
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    framework: {
      components: [
        // STYLE & IDENTITY
        'QIcon',

        // LAYOUT
        'QLayout',
        'QLayoutHeader',
        'QLayoutFooter',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QPageSticky',

        // BUTTONS
        'QBtn',
        'QBtnGroup',

        // NAVIGATION
        'QToolbar',
        'QToolbarTitle',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',

        // FORM COMPONENTS
        'QField',
        'QInput',
        'QAutocomplete',
        'QSearch',
        'QRadio',
        'QCheckbox',
        'QToggle',
        'QSelect',
        'QOptionGroup',
        'QDatetime',
        "QDatetimePicker",
        'QUploader',

        // GROUPING
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCollapsible',
        'QTable',
        'QTd',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QItemSeparator',
        'QStepper',
        'QStep',
        'QStepperNavigation',

        // POPUPS
        'QDialog',
        'QModal',
        'QModalLayout',
        'QPopover',
        'QTooltip',

        // PROGRESS
        'QInnerLoading',
        'QSpinner',
        'QSpinnerMat',
        'QSpinnerGrid',
        'QSpinnerDots',

        // SCROLLING
        'QInfiniteScroll',
        'QScrollArea',

        // ANIMATION
        'QSlideTransition',

        // OTHER
        'QAlert',
        'QChip',
        'QChatMessage',
        'QTimeline',
        'QTimelineEntry'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Screen',
        'SessionStorage',
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'it' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [
      'fadeIn',
      'fadeOut',
      'fadeInDown',
      'fadeInUp',
      'fadeOutRight',
    ],
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        exclude: [/\.jpg$/, /\.png$/, /\.svg$/, /\.pdf$/]
      },
      manifest: {
        name: 'Deleghe',
        short_name: 'Deleghe',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon_mdpi.png',
            'sizes': '48x48',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon_hdpi.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon_xhdpi.png',
            'sizes': '96x96',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon_xxhdpi.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon_xxxhdpi.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/play_store.png',
            'sizes': '512x512',
            'type': 'image/png'
          },
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
};
