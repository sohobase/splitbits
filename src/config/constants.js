export default {

  MIN_CONFIRMATIONS: 3,

  CRYPTO: {
    BTC: 'BTC',
    LTC: 'LTC',
  },

  DEFAULTS: {
    TOKEN: 'sohobase-splitbits-dev',
  },

  FIAT: {
    EUR: 'EUR',
    USD: 'USD',
  },

  SATOSHI: 0.00000001,

  SERVICE: 'http://localhost:3000/',
  // SERVICE: 'http://100.76.165.45:3000/',
  // SERVICE: 'http://172.17.164.83:3000/',

  STATE: {
    // -- Transactions
    REQUESTED: 'requested',
    UNCONFIRMED: 'unconfirmed',
    CONFIRMED: 'confirmed',
    // -- Devices
    ACTIVE: 'active',
    // -- Common
    DELETED: 'deleted',
    BANNED: 'banned',
  },

  STORE_URL: {
    ANDROID: 'http://',
    IOS: 'http://',
  },

  TYPE: {
    DEFAULT: 'default',
    PRO: 'pro',
    REQUEST: 'request',
    SEND: 'send',
  },

  VERB: {
    CREATE: 'create',
    IMPORT: 'import',
  },
};
