import { PushService } from './';
import { service } from './modules';

import { Buffer } from 'buffer'
global.Buffer = Buffer; // node modules expect Buffer to be available as a global
process.browser = true;
import BigInteger from 'bigi'
const bitcoinjs = require('bitcoinjs-lib');
import ecurve from 'ecurve';
const secp256k1 = ecurve.getCurveByName('secp256k1');

const networks = {
  BTC: bitcoinjs.networks.bitcoin,
  LTC: bitcoinjs.networks.litecoin
};

const randomPrivateKey = () => {
  do {
    let b = Buffer.alloc(32);
    for (let i = 0; i < 32; i++) { // TODO: use a CSPRNG
      b[i] = Math.floor(Math.random() * 256);
    }
    var d = BigInteger.fromBuffer(b);
  } while(d.signum() <= 0 || d.compareTo(secp256k1.n) >= 0)
  return d;
};

export default {

  create(props) {
    const ecPair = new bitcoinjs.ECPair(randomPrivateKey(), null, { network:  networks[props.coin]});
    return this.import({ ...props, wif: ecPair.toWIF() })
  },

  async import(props) {
    const { coin, name, wif } = props;
    const address = bitcoinjs.ECPair.fromWIF(wif).getAddress()
    const resp = await service('wallet', { method: 'POST', body: JSON.stringify({coin, name, address}) });
    return { ...resp, wif }
  },
};
