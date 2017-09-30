// -- Token
export const ADD_TOKEN = '@xCryptos/ADD_TOKEN';
export const addTokenAction = token => ({
  type: ADD_TOKEN,
  token,
});

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
