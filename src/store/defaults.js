const { Constants: { deviceId = 'unknown' } } = Expo || {};

export default {
  deviceId,
  pushToken: undefined,
  friends: [],
  transactions: [],
  wallets: [],
};
