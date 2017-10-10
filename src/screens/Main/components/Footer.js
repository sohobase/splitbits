import { func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Option } from '../../../components';
import { SHAPE, STYLE } from '../../../config';
import styles from './Footer.style';

const Footer = ({ device: { requests = [] }, navigate }) => (
  <View style={[STYLE.ROW, STYLE.CENTERED, styles.footer]}>
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
  device: SHAPE.DEVICE,
  navigate: func,
};

Footer.defaultProps = {
  device: {},
  navigate: undefined,
};

const mapStateToProps = ({ device }) => ({
  device,
});

export default connect(mapStateToProps)(Footer);
