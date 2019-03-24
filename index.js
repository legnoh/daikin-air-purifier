const axios = require('axios');

var config = {
    url: '/cleaner/set_control_info',
    baseURL: 'https://daikinsmartdb.jp',
    params: {
        id: 'legnoh',
        spw: 'za6wrdcHLkoJDkYA',
        port: '30050',
        pow: '1',
    }
};

// Make a request for a user with a given ID
axios.request(config)
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });