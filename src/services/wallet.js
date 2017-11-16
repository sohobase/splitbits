import './node-hacks'
import bitcoinjs from 'bitcoinjs-lib'
import { PushService } from './';
import { service } from './modules';

const networks = {
  BTC: bitcoinjs.networks.bitcoin,
  LTC: bitcoinjs.networks.litecoin
};


export default {
  create(props) {
    const ecPair = new bitcoinjs.ECPair.makeRandom({ network:  networks[props.coin] });
    return this.import({ ...props, wif: ecPair.toWIF() })
  },

  async import(props) {
    const { coin, name, wif } = props;
    const address = bitcoinjs.ECPair.fromWIF(wif).getAddress()
    const resp = await service('wallet', { method: 'POST', body: JSON.stringify({coin, name, address}) });
    return { ...resp, wif }
  },
};
