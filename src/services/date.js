import timeago from 'timeago.js';

const { DateTimeFormat } = Intl;
const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'UTC',
  timeZoneName: 'short',
};

export default {
  ago(date) {
    return timeago().format(date);
  },

  locale(date, encode = 'en-US') {
    return DateTimeFormat(encode, options).format(new Date(date));
  },
};
