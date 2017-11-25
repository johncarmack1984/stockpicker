var axios = require('axios');

//var BACKEND_URL = 'http://127.0.0.1:5000';
//var BACKEND_URL = 'https://api.stockpicker.io/v1';

module.exports = function (options, callback) {
  if (!options.BACKEND_URL) {
    throw new Error('BACKEND_URL expected, received undefined');
  }

  axios.post(`${options.BACKEND_URL}/analyze_portfolio/`, {
      portfolio: options.data
    })
    .then(function (response) {
      if (callback) { callback(response.data); }
    })
    .catch(function (error) {
      console.error(error);
    });
};
