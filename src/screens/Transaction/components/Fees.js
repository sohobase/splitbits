import { func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Amount, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import { TransactionService } from '../../../services';
import styles from './Fees.style';

const { FEES, SATOSHI } = C;
const CHARGE_KEY = 'charge';
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
    this._updateFees(amount);
  }

  _updateFees(amount = this.props.amount) {
    const { wallet: { balance, id }, product } = this.props;
    clearTimeout(timeout);
    if (amount > 0 && balance > 0) {
      timeout = setTimeout(async() => {
        this.setState({ fees: await TransactionService.fees(id, amount, product) });
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
      <View style={[STYLE.ROW, styles.container]}>
        {
          Object.keys(fees).map(key => (
            key !== CHARGE_KEY &&
            <Touchable key={key} onPress={() => onPress(key)}>
              <View style={[STYLE.CENTERED, styles.option, styles[key], active === key && styles.active]}>
                <Text style={styles.title}>{key}</Text>
                <Amount
                  coin={currency}
                  style={styles.fee}
                  value={(((fees[key] + fees[CHARGE_KEY]) || 0) * SATOSHI) / conversion}
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
  product: string,
  wallet: shape(SHAPE.WALLET).isRequired,
};

Fees.defaultProps = {
  active: FEES.REGULAR,
  amount: 0,
  conversion: 1,
  currency: undefined,
  product: undefined,
  onPress() {},
};

export default Fees;
