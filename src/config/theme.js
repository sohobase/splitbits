import Color from 'color';

const UNIT = 10;
const WHITE = '#ffffff';
const BLACK = '#000000';

export default {
  ANIMATION: {
    DURATION: 400,
    EASING: 'ease-in-out-sine',
  },

  COLOR: {
    PRIMARY: '#3f51b5',
    ACCENT: '#e91e63',
    BACKGROUND: Color(WHITE).darken(0.03),
    DIVIDER: Color(WHITE).darken(0.1),
    TEXT_DEFAULT: Color(BLACK).alpha(0.87),
    TEXT_SECONDARY: Color(BLACK).alpha(0.54),
    TEXT_DISABLED: Color(BLACK).alpha(0.38),
    TEXT_HIGHLIGHT: Color(WHITE).alpha(1),
    TEXT_HIGHLIGHT_SECONDARY: Color(WHITE).alpha(0.7),
    TEXT_HIGHLIGHT_DISABLED: Color(WHITE).alpha(0.45),
    WHITE,
    BLACK,
  },

  FONT: {
    SIZE: {
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

  BORDER_RADIUS: UNIT / 2,
  BUTTON_CIRCLE_SIZE: 64,
  OFFSET: UNIT * 1.6,
  UNIT,
};
