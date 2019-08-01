const {Storage} = require('@google-cloud/storage');

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.searchInvites = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    const storage = new Storage();
    const bucketName = 'bop-hif-aism';
    const fileName = 'guestlist.csv';
    var firstname = new String(req.query.firstname).toLowerCase();
    var lastname = new String(req.query.lastname).toLowerCase();
    storage.bucket(bucketName).file(fileName).download(function(err, contents) {
      const parse = require('csv-parse');
      parse(contents, function(err, output) {
        for (i = 0; i < output.length; i++) {
          var row = output[i];
          if (firstname === row[1].toLowerCase() && lastname === row[2].toLowerCase()) {
            res.send(row);
          }
        }
      });
    });
  }
};

exports.saveRSVP = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    res.send('Hello World!');
  }
};
