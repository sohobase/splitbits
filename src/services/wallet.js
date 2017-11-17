import BitcoinJS from 'bitcoinjs-lib';
import { service } from './modules';
import { C } from '../config';

const { CRYPTO_NAMES } = C;

const save = async(props) => {
  const {
    coin, name, wif, imported,
  } = props;
  const address = BitcoinJS.ECPair.fromWIF(wif).getAddress();
  const response = await service('wallet', {
    method: 'POST',
    body: JSON.stringify({
      coin, name, address, imported,
    }),
  });

  return response;
};

export default {
  create(props) {
    const network = BitcoinJS.networks[CRYPTO_NAMES[props.coin]];
    const ecPair = new BitcoinJS.ECPair.makeRandom({ network }); //eslint-disable-line

    return save({ ...props, imported: false, wif: ecPair.toWIF() });
  },

  import(props) {
    return save({ ...props, imported: true });
  },

  async archive(props) {
    return service('wallet', {
      method: 'DELETE',
      body: JSON.stringify(props),
    });
  },
};
