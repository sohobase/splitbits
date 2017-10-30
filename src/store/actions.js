// -- Token
export const ADD_TOKEN = '@xCryptos/ADD_TOKEN';
export const addTokenAction = token => ({
  type: ADD_TOKEN,
  token,
});

// -- Currencies
export const UPDATE_CURRENCIES = '@xCryptos/UPDATE_CURRENCIES';
export const updateCurrenciesAction = currencies => ({
  type: UPDATE_CURRENCIES,
  currencies,
});

// -- Device
export const UPDATE_DEVICE = '@xCryptos/UPDATE_DEVICE';
export const updateDeviceAction = device => ({
  type: UPDATE_DEVICE,
  device,
});

export const SELECT_DEVICE = '@xCryptos/SELECT_DEVICE';
export const selectDeviceAction = deviceId => ({
  type: SELECT_DEVICE,
  deviceId,
});

// -- Transaction

// -- Wallet
export const ADD_WALLET = '@xCryptos/ADD_WALLET';
export const addWalletAction = wallet => ({
  type: ADD_WALLET,
  wallet,
});

export const REMOVE_WALLET = '@xCryptos/REMOVE_WALLET';
export const removeAlertAction = wallet => ({
  type: REMOVE_WALLET,
  wallet,
});

// --
export const UPDATE_WALLET = '@xCryptos/UPDATE_WALLET';
export const updateWalletAction = wallet => ({
  type: UPDATE_WALLET,
  wallet,
});
