// -- Currencies
export const UPDATE_CURRENCIES = '@splitbits/UPDATE_CURRENCIES';
export const updateCurrenciesAction = currencies => ({
  type: UPDATE_CURRENCIES,
  currencies,
});

// -- Device
export const UPDATE_DEVICE = '@splitbits/UPDATE_DEVICE';
export const updateDeviceAction = device => ({
  type: UPDATE_DEVICE,
  device,
});

// -- Error
export const ERROR = '@splitbits/ERROR';
export const errorAction = error => ({
  type: ERROR,
  error,
});

// -- Recipient
export const UPDATE_RECIPIENT = '@splitbits/UPDATE_RECIPIENT';
export const updateRecipientAction = recipient => ({
  type: UPDATE_RECIPIENT,
  recipient,
});

// -- Reset
export const RESET = '@splitbits/RESET';
export const resetAction = () => ({
  type: RESET,
});

// -- Token
export const ADD_TOKEN = '@splitbits/ADD_TOKEN';
export const addTokenAction = token => ({
  type: ADD_TOKEN,
  token,
});

// -- Transaction
export const UPDATE_TRANSACTIONS = '@splitbits/UPDATE_TRANSACTIONS';
export const updateTransactionsAction = transactions => ({
  type: UPDATE_TRANSACTIONS,
  transactions,
});

// -- Wallet
export const ADD_WALLET = '@splitbits/ADD_WALLET';
export const addWalletAction = wallet => ({
  type: ADD_WALLET,
  wallet,
});

export const REMOVE_WALLET = '@splitbits/REMOVE_WALLET';
export const removeWalletAction = wallet => ({
  type: REMOVE_WALLET,
  wallet,
});

export const UPDATE_WALLET = '@splitbits/UPDATE_WALLET';
export const updateWalletAction = wallet => ({
  type: UPDATE_WALLET,
  wallet,
});
