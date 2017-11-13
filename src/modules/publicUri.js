import { C } from '../config';

const { SERVICE } = C;

export default uri => `${SERVICE}public/${uri}?timestamp=${new Date().getTime().toString()}`;
