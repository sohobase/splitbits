import DEFAULTS from './defaults';
import {
  ADD_TOKEN,
  UPDATE_CURRENCIES,
  UPDATE_DEVICE,
  SELECT_DEVICE,
  UPDATE_TRANSACTIONS,
  ADD_WALLET,
  REMOVE_WALLET,
  UPDATE_WALLET,
} from './actions';

export default function(state = DEFAULTS, action) {
  switch (action.type) {
    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

    // -- Currencies
    case UPDATE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    // -- Device
    case UPDATE_DEVICE:
      return { ...state, device: { ...state.device, ...action.device } };

    case SELECT_DEVICE:
      return { ...state, selectedDevice: action.deviceId };

    // -- Transaction
    case UPDATE_TRANSACTIONS: {
      const { transactions: actionTXs = [] } = action;
      const { transactions: stateTXs = [] } = state;

      return {
        ...state,
        transactions: [
          ...actionTXs.filter(tx => stateTXs.find(({ id }) => id === tx.id) === undefined),
          ...stateTXs.map(tx => actionTXs.find(({ id }) => id === tx.id) || tx),
        ],
      };
    }

    // -- Wallet
    case ADD_WALLET:
      return { ...state, wallets: [...state.wallets, action.wallet] };

    case REMOVE_WALLET: {
      return {
        ...state,
        wallets: state.wallets.filter(({ id }) => (id !== action.wallet.id)),
      };
    }

    case UPDATE_WALLET: {
      const { id, ...props } = action.wallet;

      return {
        ...state,
        wallets: state.wallets.map((wallet) => {
          if (wallet.id === id) return { ...wallet, ...props };
          return wallet;
        }),
      };
    }

    // -- Default
    default:
      return state;
  }
}
