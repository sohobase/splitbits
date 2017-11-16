import { Buffer } from 'buffer'
global.Buffer = Buffer; // node modules expect Buffer to be available as a global
process.browser = true;

// Polyfill window.crypto.getRandomValues. TODO: Use CSPRNG
global.crypto = {
  getRandomValues: function(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i] = Math.floor(Math.random()*0xFF);
    }
  }
};
