const {Storage} = require('@google-cloud/storage');
const {Firestore} = require('@google-cloud/firestore');

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
    // TODO, add error handling
    const storage = new Storage();
    const bucketName = 'bop-hif-aism';
    const fileName = 'guestlist.csv';
    var firstname = new String(req.query.firstname).toLowerCase().trim();
    var lastname = new String(req.query.lastname).toLowerCase().trim();

    storage.bucket(bucketName).file(fileName).download(function(err, contents) {
      const parse = require('csv-parse');
      parse(contents, function(err, output) {
        for (i = 0; i < output.length; i++) {
          var row = output[i];
          if (firstname === row[1].toLowerCase().trim()
              && lastname === row[2].toLowerCase().trim()) {
            res.send(row);
            return;
          }
        }
        res.send('');
      });
    });
  }
};


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//let serviceAccount = require('/Users/tmn/Downloads/wedding-website-backend-7422680f7727.json');
//admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
let db = admin.firestore();

exports.saveRSVP = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    try {
      let name = req.body.name;
      let rsvpMap = buildRsvpMap(req.body)

      const doc = db.collection('RSVPs').doc(name);
      doc.set(rsvpMap);
      res.send('Ok');
    } catch (err) {
      console.log(err);
      res.send('Something went wrong');
    }
  }
};

function buildRsvpMap (body) {
  let rsvp = {name: body.name};
  if (body.diet) {
    rsvp['diet'] = body.diet;
  }
  if (body.saturday) {
    rsvp['saturday'] = body.saturday;
  }
  if (body.friday) {
    rsvp['friday'] = body.friday;
  }
  if (body.sunday) {
    rsvp['sunday'] = body.sunday;
  }
  return rsvp;
}
