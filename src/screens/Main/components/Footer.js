import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Option } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './Footer.style';

const { DEVICE } = SHAPE;

const Footer = ({ device: { requests = [] }, elevation, navigate }) => (
  <View style={[STYLE.ROW, STYLE.CENTERED, STYLE.ELEVATION, styles.footer, (elevation && styles.elevation)]}>
    <Option
      activity={requests.length > 0}
      centered
      icon="profile"
      caption="Profile"
      onPress={() => navigate('Profile')}
      style={styles.option}
    />
    <Option centered icon="settings" caption="Settings" onPress={() => navigate('Settings')} style={styles.option} />
  </View>
);

Footer.propTypes = {
  device: shape(DEVICE),
  elevation: bool,
  navigate: func,
};

Footer.defaultProps = {
  device: {},
  elevation: true,
  navigate: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(Footer);
