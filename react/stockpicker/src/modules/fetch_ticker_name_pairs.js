var axios = require('axios');

//var S3_LOCATION = 'https://spio-middleware-resources.s3.amazonaws.com';
//var FILENAME = 'ticker_name_pairs.json';

module.exports = function (options, callback) {

  axios.get('https://s3.amazonaws.com/spio-middleware-resources/ticker_name_pairs.json')
    .then(function(response) {
      if (callback) { callback(response.data); }
    })
    .catch(function(error) {
      console.error(error);
    });
};
