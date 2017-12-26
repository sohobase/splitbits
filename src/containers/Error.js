import { func, shape } from 'prop-types';
import React, { Component } from 'react';
import { Modal as ReactNativeModal, Text, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { connect } from 'react-redux';
import { Button } from '../components';
import { SHAPE, STYLE, THEME } from '../config';
import { errorAction } from '../store/actions';
import styles from './Error.style';

const { ANIMATION: { DURATION } } = THEME;

class Error extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    const { removeError } = this.props;
    removeError();
  }

  render() {
    const { _onPress, props: { error: { code, message } = {}, i18n } } = this;
    const visible = code !== undefined || message !== undefined;

    if (visible) console.log('[error]', this.props.error); // eslint-disable-line

    return (
      <ReactNativeModal transparent visible={visible} onRequestClose={_onPress}>
        <Motion
          animation={visible ? 'bounceInUp' : 'bounceOutDown'}
          duration={DURATION}
          style={[STYLE.ELEVATION, styles.container]}
        >
          <View style={[STYLE.ROW, styles.error]}>
            <View style={styles.content}>
              <Text style={styles.message}>{message}</Text>
              { code && <Text style={styles.code}>{`Error ${code}`}</Text> }
            </View>
            <Button caption={i18n.ACCEPT} onPress={_onPress} raised style={styles.button} />
          </View>
        </Motion>
      </ReactNativeModal>
    );
  }
}

Error.propTypes = {
  error: shape(SHAPE.ERROR),
  i18n: shape(SHAPE.I18N).isRequired,
  removeError: func,
};

Error.defaultProps = {
  error: undefined,
  removeError() {},
};

const mapStateToProps = ({ error, i18n }) => ({
  error,
  i18n,
});

const mapDispatchToProps = dispatch => ({
  removeError: () => dispatch(errorAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
