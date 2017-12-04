import timeago from 'timeago.js';

export default {
  ago(date) {
    return timeago().format(date);
  },

  locale(date, encode = 'en-us') {
    return new Date(date).toLocaleString(encode);
  },
};
