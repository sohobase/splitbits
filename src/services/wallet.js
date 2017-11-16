import './node-hacks'
import bitcoinjs from 'bitcoinjs-lib'
import { PushService } from './';
import { service } from './modules';
import { CRYPTO_NAMES } from '../config/constants'

export default {
  create(props) {
    const network = bitcoinjs.networks[CRYPTO_NAMES[props.network]];
    const ecPair = new bitcoinjs.ECPair.makeRandom({ network });
    return this._save({ ...props, imported: false, wif: ecPair.toWIF() });
  },

  import(props) {
    return this._save({ ...props, imported: true });
  },

  async _save(props) {
    const { coin, name, wif } = props;
    const address = bitcoinjs.ECPair.fromWIF(wif).getAddress()
    const resp = await service('wallet', { method: 'POST', body: JSON.stringify({coin, name, address}) });
    return { ...resp, wif }
  }
};
