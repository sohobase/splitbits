export default {
  async list(walletId) {
    return (
      [
        {
          id: '0129',
          amount: 10.239,
          createdAt: new Date(),
          wallet: { name: 'mikel', image: 'http://' },
          symbol: 'BTC',
        },
        {
          id: '39s',
          amount: 3.5,
          createdAt: new Date(),
          wallet: { name: 'mikel', image: 'http://' },
          symbol: 'LTC',
        },
        {
          id: '3093',
          amount: 3.5,
          createdAt: new Date(),
          wallet: { name: 'mikel', image: 'http://' },
          symbol: 'LTC',
        },
      ]
    );
  },
};
