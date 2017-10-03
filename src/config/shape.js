import { date, func, number, shape, string } from 'prop-types';

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
  ACTIVITY: shape({
    id: string,
    amount: number,
    createdAt: date,
    wallet: WALLET,
    symbol: string,
  }),
  BUTTON: shape({
    delay: number,
    icon: string,
    onPress: func,
  }),
  CURRENCIES: shape({
    BTC: number,
    LTC: number,
  }),
  NAVIGATION: shape({
    navigate: func,
    setParams: func,
  }),
  WALLET,
};
