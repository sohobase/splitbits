import { bool, func, node, string } from 'prop-types';
import React from 'react';
import { Modal as ReactNativeModal, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { STYLE, THEME } from '../config';
import Button from './Button';
import styles from './Modal.style';

const { ANIMATION: { DURATION } } = THEME;

const Modal = ({ children, onClose, title, visible }) => (
  <ReactNativeModal
    transparent
    visible={visible}
    onRequestClose={() => { }}
  >
    <Animatable
      animation={visible ? 'fadeIn' : 'fadeOut'}
      duration={DURATION / 2}
      delay={visible ? 0 : DURATION / 2}
      style={styles.container}
    >
      <Animatable
        animation={visible ? 'bounceInUp' : 'bounceOutDown'}
        delay={visible ? DURATION / 2 : 0}
        duration={DURATION}
        style={styles.content}
      >
        <View style={[STYLE.ROW, STYLE.CENTERED, styles.header]}>
          { title && <Text style={styles.title}>{title}</Text> }
          <Button icon="close" onPress={onClose} raised style={styles.buttonClose} />
        </View>
        <View style={styles.children}>
          { children }
        </View>
      </Animatable>
    </Animatable>
  </ReactNativeModal>
);

Modal.propTypes = {
  children: node,
  onClose: func,
  title: string,
  visible: bool,
};

Modal.defaultProps = {
  children: undefined,
  onClose: undefined,
  title: undefined,
  visible: false,
};

export default Modal;
