import { shape, string } from 'prop-types';

export default {
  WALLET: shape({
    id: string,
    currency: string,
  }),
};
