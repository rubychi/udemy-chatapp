const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
  };
};

const generateLocationMessage = (from, latitude, longitude, time) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: time || moment().valueOf(),
  };
};

module.exports = { generateMessage, generateLocationMessage };
