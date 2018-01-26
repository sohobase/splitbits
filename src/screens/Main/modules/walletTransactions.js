import { C } from '../../../config';

const { STATE: { ARCHIVED, REQUESTED } } = C;

export default (device = {}, wallet = {}, txs = []) => (
  txs.filter(({
    coin, from, product, state, to,
  }) => (
    coin === wallet.coin &&
    state !== ARCHIVED &&
    (
      [from.address, to.address].includes(wallet.address) ||
      (
        state === REQUESTED &&
        (
          to.wallet === wallet.id || // Request from me: Only from the wallet I requested from
          (from.device === device.id && !product && !wallet.readOnly) // Request to me: show in all non-read-only wallets
        )
      )
    )
  )).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);
