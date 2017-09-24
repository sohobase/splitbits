export default {
  async list() {
    return (
      [
        {
          id: 'a',
          name: 'coinbase',
          amount: 10098.23,
          symbol: 'btc',
          qr: 'https://coinbase.com',
        },
        {
          id: 'b',
          name: 'blockchain.org',
          amount: 0.02923,
          symbol: 'btc',
          qr: 'https://sohobase.com',
        },
        {
          id: 'c',
          name: 'bittrex',
          amount: 1.23,
          symbol: 'ltc',
          qr: 'https://sohobase.com',
        },
      ]
    );
  },
};
