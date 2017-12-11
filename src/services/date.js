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
    if (Intl) return Intl.DateTimeFormat(encode, options).format(new Date(date));
    return new Date(date).toLocaleString(encode);
  },
};
