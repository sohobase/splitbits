import { Buffer } from 'buffer';

// node modules expect Buffer to be available as a global
global.Buffer = Buffer;
process.browser = true;

// Polyfill window.crypto.getRandomValues.
// @TODO: Use CSPRNG
global.crypto = {
  getRandomValues(value) {
    for (let i = 0, len = value.length; i < len; i += 1) {
      value[i] = Math.floor(Math.random() * 0xFF);
    }

    return value;
  },
};
