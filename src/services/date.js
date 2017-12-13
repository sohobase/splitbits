import { Platform } from 'react-native';
import timeago from 'timeago.js';

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'UTC',
  timeZoneName: 'short',
};

export default {
  ago(date) {
    return timeago().format(date);
  },

  locale(date, encode = 'en-US') {
    return (Platform.OS === 'ios' && Intl)
      ? Intl.DateTimeFormat(encode, options).format(new Date(date))
      : new Date(date).toLocaleString(encode);
  },
};
