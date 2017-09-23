import {
  ADD_TOKEN,
  ADD_WALLET,
  REMOVE_WALLET,
} from './actions';
import { C } from '../config';

const initialState = {
  token: undefined,
  wallets: [],
};

export default function (state = initialState, action) {
  switch (action.type) {

    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

    // -- Wallet
    case ADD_WALLET:
      return { ...state, wallets: [...state.wallets, action.wallet] };

    case REMOVE_WALLET: {
      return {
        ...state,
        wallets: state.wallets.filter(({ id }) => (id !== action.wallet.id)),
      };
    }

    // -- Default
    default:
      return state;
  }
}
