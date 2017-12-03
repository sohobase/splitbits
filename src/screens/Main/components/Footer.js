import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Option } from '../../../components';
import { SHAPE, STYLE, TEXT } from '../../../config';
import styles from './Footer.style';

const { DEVICE } = SHAPE;
const { EN: { FRIENDS, SETTINGS } } = TEXT;

const Footer = ({ device: { requests = [] }, elevation, navigate }) => (
  <View style={[STYLE.ROW, STYLE.CENTERED, STYLE.ELEVATION, styles.footer, (elevation && styles.elevation)]}>
    <Option
      activity={requests.length > 0}
      caption={FRIENDS}
      centered
      icon="face"
      onPress={() => navigate('Profile')}
      style={styles.option}
    />
    <Option
      caption={SETTINGS}
      centered
      icon="settings"
      onPress={() => navigate('Settings')}
      style={styles.option}
    />
  </View>
);

Footer.propTypes = {
  device: shape(DEVICE).isRequired,
  elevation: bool,
  navigate: func,
};

Footer.defaultProps = {
  elevation: true,
  navigate: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(Footer);
