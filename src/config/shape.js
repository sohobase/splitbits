import { date, number, shape, string } from 'prop-types';

const WALLET = shape({
  id: string,
  amount: number,
  image: string,
  name: string,
  progress: number,
  qr: string,
  symbol: string,
});

export default {
  ACTIVITY: shape({
    id: string,
    amount: number,
    createdAt: date,
    wallet: WALLET,
    symbol: string,
  }),
  WALLET,
};
