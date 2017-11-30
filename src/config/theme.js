import Color from 'color';
import { Dimensions, Platform } from 'react-native';

const UNIT = 10;
const OFFSET = UNIT * 1.6;
const WHITE = '#ffffff';
const BLACK = '#000000';
const DISABLED = 0.38;
const IPHONEX_OFFSET = 28;
const HEADER_SIZE = UNIT * 6;
const FOOTER_SIZE = UNIT * 5.6;
const isIphoneX = () => {
  const { height, width } = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};

export default {
  ANIMATION: {
    DURATION: 900,
    EASING: 'ease-in-out-sine',
  },
  AVATAR_SIZE: UNIT * 4,

  BORDER_RADIUS: UNIT / 2,
  BUTTON_CIRCLE_SIZE: UNIT * 6.4,

  COLOR: {
    PRIMARY: '#2d126c', // '#303498'
    ACCENT: '#5edeb3', // '#ff4566'

    BACKGROUND: Color(WHITE).darken(0.03),
    BACKGROUND_HIGHLIGHT: Color(WHITE).alpha(0.15),
    BACKGROUND_DARK: Color(BLACK).alpha(0.5),
    BACKGROUND_DISABLED: Color(BLACK).alpha(DISABLED),

    DIVIDER: Color(WHITE).darken(0.1),

    TEXT_DEFAULT: Color(BLACK).alpha(0.87),
    TEXT_SECONDARY: Color(BLACK).alpha(0.54),
    TEXT_DISABLED: Color(BLACK).alpha(DISABLED),
    TEXT_HIGHLIGHT: Color(WHITE).alpha(1),
    TEXT_HIGHLIGHT_SECONDARY: Color(WHITE).alpha(0.7),
    TEXT_HIGHLIGHT_DISABLED: Color(WHITE).alpha(0.45),

    ACCEPT: '#32dba8',
    CANCEL: '#F44336',
    WHITE,
    BLACK,
  },

  DISABLED,

  FONT: {
    SIZE: {
      TINY: UNIT * 1,
      SMALL: UNIT * 1.2,
      DEFAULT: UNIT * 1.6,
      LARGE: UNIT * 2,
      EXTRA_LARGE: UNIT * 2.4,
    },
    WEIGHT: {
      LIGHT: '200',
      DEFAULT: '400',
      BOLD: '700',
    },
  },

  FOOTER_OFFSET: isIphoneX() ? IPHONEX_OFFSET : 0,
  FOOTER_SIZE,

  HEADER_SIZE: isIphoneX() ? (HEADER_SIZE + IPHONEX_OFFSET) : HEADER_SIZE,

  ICON_SIZE: UNIT * 3.2,

  MODAL_PADDING_BOTTOM: (2 * OFFSET) + (isIphoneX() ? IPHONEX_OFFSET : 0),

  OFFSET,

  QR_SIZE: 12.8 * UNIT,

  ROW_MIN_HEIGHT: UNIT * 6.4,

  UNIT,

  WALLET_HEIGHT: UNIT * 14.4,
  WALLET_WIDTH: UNIT * 22.4,
};
