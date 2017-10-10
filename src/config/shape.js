import { array, date, func, number, object, shape, string } from 'prop-types';

const WALLET = shape({
  id: string,
  balance: number,
  image: string,
  name: string,
  progress: number,
  qr: string,
  symbol: string,
  trend: number,
});

export default {
  BUTTON: shape({
    delay: number,
    icon: string,
    onPress: func,
  }),
  CURRENCIES: shape({
    BTC: number,
    LTC: number,
  }),
  DEVICE: shape({
    id: string,
    currency: string,
    devices: array,
    image: string,
    name: string,
    push: string,
    private: object, // { capture: string, passport: string, phone: string },
    requests: array,
    state: string,
    token: string,
    createdAt: date,
  }),
  NAVIGATION: shape({
    navigate: func,
    setParams: func,
  }),
  TRANSACTION: shape({
    id: string,
    amount: number,
    charge: number,
    coin: string,
    confirmations: number,
    createdAt: date,
    fee: number,
    state: string,
    walletFrom: string,
    walletTo: string,
  }),
  WALLET,
};
