import { Buffer } from 'buffer';

// node modules expect Buffer to be available as a global
global.Buffer = Buffer;
process.browser = true;

// Polyfill window.crypto.getRandomValues.
// @TODO: Use CSPRNG
global.crypto = {
  getRandomValues(value) {
    return value.map(() => Math.floor(Math.random() * 0xFF));
  },
};
