import { array, date, func, number, object, shape, string } from 'prop-types';

const WALLET = shape({
  id: string,
  address: string,
  balance: number,
  coin: string,
  name: string,
  lastBlockheight: string,
  progress: number,
  trend: number,
  type: string,
  wif: string,
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
    concept: string,
    confirmations: number,
    createdAt: date,
    fee: number,
    state: string,
    from: object,
    to: object,
  }),
  WALLET,
};
