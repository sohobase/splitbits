import { func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Amount, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import { TransactionService } from '../../../services';
import styles from './Fees.style';

const { FEES, SATOSHI } = C;
let timeout;

class Fees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fees: undefined,
    };
    this._updateFees = this._updateFees.bind(this);
  }

  componentDidMount() {
    this._updateFees();
  }

  componentWillReceiveProps({ amount }) {
    if (amount !== this.props.amount) this._updateFees(amount);
  }

  _updateFees(amount = this.props.amount) {
    const { wallet: { balance, id } } = this.props;
    clearTimeout(timeout);
    if (amount > 0 && balance > 0) {
      timeout = setTimeout(async() => {
        this.setState({ fees: await TransactionService.fees(id, amount) });
      }, 500);
    }
  }

  render() {
    const {
      props: {
        active, conversion, currency, onPress,
      },
      state: { fees = {} },
    } = this;

    return (
      <View style={STYLE.ROW}>
        {
          Object.keys(fees).map(key => (
            <Touchable key={key} onPress={() => onPress(key)}>
              <View style={[STYLE.CENTERED, styles.option, styles[key], active === key && styles.active]}>
                <Text style={styles.title}>{key}</Text>
                <Amount
                  coin={currency}
                  style={styles.fee}
                  value={((fees[key] || 0) * SATOSHI) / conversion}
                />
              </View>
            </Touchable>
          ))
        }
      </View>
    );
  }
}

Fees.propTypes = {
  active: string,
  amount: number,
  conversion: number,
  currency: string,
  onPress: func,
  wallet: shape(SHAPE.WALLET).isRequired,
};

Fees.defaultProps = {
  active: FEES.REGULAR,
  amount: 0,
  conversion: 1,
  currency: undefined,
  onPress() {},
};

export default Fees;
