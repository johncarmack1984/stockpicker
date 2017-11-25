var axios = require('axios');

module.exports = function (options, callback) {

  axios.get(`${options.BACKEND_URL}/${options.ticker}/${options.timeFrame}/`)
    .then(function(response) {
      if (callback) { callback(response.data); }
    })
    .catch(function(error) {
      console.error(error);
    });
};
