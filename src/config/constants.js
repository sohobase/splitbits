import { Constants } from 'expo';
import { Platform } from 'react-native';

const DEV = __DEV__; //eslint-disable-line

export default {

  BLOCKCHAIN_EXPLORER_URL: 'https://chain.so/address',

  CONNECTION: {
    CELLULAR: 'cellular',
    WIFI: 'wifi',
  },

  CONVERSION: {
    BTC: 0.000001,
    LTC: 0.001,
  },

  CRYPTO: {
    BTC: 'BTC',
    ETH: 'ETH',
    LTC: 'LTC',
  },

  DEV,

  FIAT: {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    JPY: 'JPY',
  },

  IS_DEVICE: Constants.isDevice,

  LANGUAGES: {
    EN: 'English',
    ES: 'Español',
  },

  MIN_CONFIRMATIONS: 3,

  NETWORKS: {
    BTC: DEV ? 'testnet' : 'bitcoin',
    LTC: DEV ? 'testnet' : 'litecoin',
    ETH: DEV ? 'testnet' : 'ethereum',
  },

  SYMBOL: {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',

    BTC: Platform.OS === 'android' && Platform.Version < 26 ? 'Ƀ' : '₿',
    ETH: 'Ξ',
    LTC: 'Ł',

    FRIENDLY: {
      BTC: 'bits',
      LTC: 'lites',
    },
  },

  SATOSHI: 0.00000001,

  SERVICE: DEV
    ? Constants.linkingUrl.replace(/^\w+:\/\/([^:/]+):\d+\/.*$/, 'http://$1:3000/')
    : 'https://splitbits.sohobase.co/',

  SOHOBASE_SUPPORT: 'support@sohobase.co',

  STATE: {
    // -- Transactions
    REQUESTED: 'requested',
    UNCONFIRMED: 'unconfirmed',
    CONFIRMED: 'confirmed',
    // -- Devices
    ACTIVE: 'active',
    // -- Common
    ARCHIVED: 'archived',
    BANNED: 'banned',
  },

  STORE_URL: {
    ANDROID: 'http://',
    IOS: 'http://',
  },

  TIMEOUT_SERVICE: 3000,

  TOKEN: 'sohobase-splitbits-dev',

  TYPE: {
    CREATE: 'create',
    DEFAULT: 'default',
    IMPORT: 'import',
    PRO: 'pro',
    RECOVER: 'recover',
    REQUEST: 'request',
    SEND: 'send',
  },

  WALLET: {
    ADDRESS: {
      BTC: 0,
      BTC_SEGWIT: 169,
      BTC_TESTNET: 111,
      LTC: 48,
    },
    WIF: {
      BTC: 128,
      BTC_TESTNET: 239,
      LTC: 176,
    },
  },
};
