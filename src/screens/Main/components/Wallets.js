import { arrayOf, func, number, shape } from 'prop-types';
import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';

import { SHAPE, THEME } from '../../../config';
import WalletItem from './WalletItem';
import styles from './Wallets.style';

const { WALLET } = SHAPE;
const { WALLET_WIDTH } = THEME;

const Wallets = ({
  index, onSwipe, onNew, onOptions, wallets,
}) => (
  <Carousel
    containerCustomStyle={styles.wallets}
    customAnimationType="spring"
    data={[...wallets, { key: 'new' }]}
    enableMomentum
    firstItem={index}
    inactiveSlideOpacity={0.75}
    inactiveSlideScale={0.75}
    itemWidth={WALLET_WIDTH}
    onSnapToItem={onSwipe}
    renderItem={({ item }) =>
      <WalletItem key={item.key || item.address} data={item} onPress={item.key ? onNew : onOptions} />}
    slideStyle={styles.item}
    sliderWidth={Dimensions.get('window').width}
  />
);

Wallets.propTypes = {
  index: number,
  onSwipe: func,
  onNew: func,
  onOptions: func,
  wallets: arrayOf(shape(WALLET)),
};

Wallets.defaultProps = {
  index: 0,
  onSwipe() {},
  onNew() {},
  onOptions() {},
  wallets: [],
};

const mapStateToProps = ({ wallets }) => ({
  wallets,
});

export default connect(mapStateToProps)(Wallets);
