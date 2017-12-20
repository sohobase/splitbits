import { TEXT } from '../config';

export default ({ language }) => ({ i18n: TEXT[language] || TEXT.EN });
