export default {

  DEFAULTS: {
    TOKEN: 'sohobase-splitwallet-dev',
  },

  SATOSHI: 0.00000001,

  STATE: {
    // -- Transactions
    REQUESTED: 'requested',
    UNCONFIRMED: 'unconfirmed',
    PROCESSING: 'processing',
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
  // SERVICE: 'http://172.17.164.83:3000/',

  TYPE: {
    REQUEST: 'request',
    SEND: 'send',
  },
};
