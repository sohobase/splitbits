import { func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Option } from '../../../components';
import { STYLE } from '../../../config';
import styles from './Footer.style';

const Footer = ({ navigate }) => (
  <View style={[STYLE.ROW, STYLE.CENTERED, styles.footer]}>
    <Option activity centered icon="profile" caption="Profile" onPress={() => navigate('Profile')} style={styles.option} />
    <Option centered icon="settings" caption="Settings" onPress={() => navigate('Settings')} style={styles.option} />
  </View>
);

Footer.propTypes = {
  navigate: func,
};

Footer.defaultProps = {
  navigate: undefined,
};

export default Footer;
