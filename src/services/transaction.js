export default {
  async list(walletId) {
    return (
      [
        {
          id: 't1',
          amount: 10.239,
          createdAt: new Date(),
          wallet: { name: 'mikel', image: 'http://' },
          symbol: 'BTC',
        },
        {
          id: 't2',
          amount: -3.5,
          createdAt: new Date(),
          wallet: { name: 'mikel', image: 'http://' },
          symbol: 'LTC',
        },
        {
          id: 't3',
          amount: 3.5,
          createdAt: new Date(),
          wallet: { name: 'Javi Jimenez', image: 'http://soyjavi.com/assets/images/soyjavi.png' },
          symbol: 'LTC',
        },
        {
          id: 't4',
          amount: 3.5,
          createdAt: new Date(),
          wallet: { name: 'mikel', image: 'http://' },
          symbol: 'LTC',
        },
      ]
    );
  },
};
