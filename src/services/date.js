import timeago from 'timeago.js';

export default {
  ago(date) {
    return timeago().format(date);
  },
};
