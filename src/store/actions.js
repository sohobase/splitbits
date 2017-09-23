// -- Token
export const ADD_TOKEN = '@xCryptos/ADD_TOKEN';
export const addTokenAction = token => ({
  type: ADD_TOKEN,
  token,
});

// -- Wallet
export const ADD_WALLET = '@xCryptos/ADD_WALLET';
export const addAlertAction = wallet => ({
  type: ADD_WALLET,
  wallet,
});

export const REMOVE_WALLET = '@xCryptos/REMOVE_WALLET';
export const removeAlertAction = wallet => ({
  type: REMOVE_WALLET,
  wallet,
});
