const { Constants: { deviceId = 'unknown' } } = Expo || {};

export default {
  currencies: [],
  deviceId,
  pushToken: undefined,
  devices: [],
  transactions: [],
  wallets: [],
};
