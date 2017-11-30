import { Buffer } from 'buffer';

// node modules expect Buffer to be available as a global
global.Buffer = Buffer;
process.browser = true;
