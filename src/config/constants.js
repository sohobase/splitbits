export default {

  DEFAULTS: {
    TOKEN: 'sohobase-splitwallet-dev',
  },

  FIAT: {
    EUR: 'EUR',
    USD: 'USD',
  },

  SATOSHI: 0.00000001,

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

  SERVICE: 'http://localhost:3000/',
  // SERVICE: 'http://100.76.165.45:3000/',
  // SERVICE: 'http://172.17.164.83:3000/',

  TYPE: {
    DEFAULT: 'default',
    PRO: 'pro',
    REQUEST: 'request',
    SEND: 'send',
  },
};
