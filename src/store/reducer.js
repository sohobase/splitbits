import { TEXT } from '../config';
import DEFAULTS from './defaults';
import {
  UPDATE_CURRENCIES,
  UPDATE_DEVICE,
  SELECT_DEVICE,
  ERROR,
  RESET,
  ADD_TOKEN,
  UPDATE_TRANSACTIONS,
  ADD_WALLET,
  REMOVE_WALLET,
  UPDATE_WALLET,
} from './actions';

export default function(state = DEFAULTS, action) {
  switch (action.type) {
    // -- Currencies
    case UPDATE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    // -- Device
    case UPDATE_DEVICE: {
      const device = { ...state.device, ...action.device };
      return {
        ...state, device, i18n: TEXT[device.language],
      };
    }

    case SELECT_DEVICE:
      return { ...state, selectedDevice: action.deviceId };

    // -- Error
    case ERROR:
      return { ...state, error: action.error };

    // -- Reset
    case RESET:
      return { ...DEFAULTS };

    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

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
