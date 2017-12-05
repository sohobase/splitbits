import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { SHAPE, STYLE } from '../../../config';
import WalletItem from './WalletItem';
import styles from './Wallets.style';

const { WALLET } = SHAPE;

class Wallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
    };
  }

  componentWillReceiveProps({ wallets: nextWallets = [] }) {
    const { wallets = [] } = this.props;
    // @TODO: React-Native-Swiper is buggy with dynamic elements.
    if (nextWallets.length !== wallets.length) {
      this.setState({ processing: true });
      setTimeout(() => this.setState({ processing: false }), 500);
    }
  }

  render() {
    const {
      props: {
        onSwipe, onNew, onOptions, wallets,
      },
      state: { processing },
    } = this;

    return (
      processing
        ?
          <View style={styles.wallets} />
        :
          <Swiper
            activeDotStyle={STYLE.SWIPER_DOT_ACTIVE}
            bounces
            dotStyle={STYLE.SWIPER_DOT}
            key={wallets.length}
            loop={false}
            onIndexChanged={onSwipe}
            paginationStyle={styles.pagination}
            removeClippedSubviews={false}
            style={styles.wallets}
          >
            {[
              ...wallets.map(item => <WalletItem key={item.address} data={item} onPress={onOptions} />),
              <WalletItem key="new" onOption={onNew} />,
            ]}
          </Swiper>
    );
  }
}

Wallets.propTypes = {
  onSwipe: func,
  onNew: func,
  onOptions: func,
  wallets: arrayOf(shape(WALLET)),
};

Wallets.defaultProps = {
  onSwipe() {},
  onNew() {},
  onOptions() {},
  wallets: [],
};

const mapStateToProps = ({ wallets }) => ({
  wallets,
});

export default connect(mapStateToProps)(Wallets);
