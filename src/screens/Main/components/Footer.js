import { bool, func, shape } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Option } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './Footer.style';

const Footer = ({
  device: { requests = [] }, i18n, elevation, navigate,
}) => (
  <View style={[STYLE.ROW, STYLE.CENTERED, STYLE.ELEVATION, styles.footer, (elevation && styles.elevation)]}>
    <Option
      activity={requests.length > 0}
      caption={i18n.FRIENDS}
      centered
      icon="face"
      onPress={() => navigate('Profile')}
      style={styles.option}
    />
    <Option
      caption={i18n.SETTINGS}
      centered
      icon="settings"
      onPress={() => navigate('Settings')}
      style={styles.option}
    />
  </View>
);

Footer.propTypes = {
  device: shape(SHAPE.DEVICE).isRequired,
  elevation: bool,
  i18n: shape({}).isRequired,
  navigate: func,
};

Footer.defaultProps = {
  elevation: true,
  navigate: undefined,
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

export default connect(mapStateToProps)(Footer);
