function generateSelectorHtml(numGuests) {
  var base = "<select>";
  for (i = 0; i <= numGuests; i++) {
    base += "<option value='" + i + "'>" + i + "</option>";
  }
  base += "</select>";
  return base;
}
function searchInvites() {
  // Loads the JavaScript client library and invokes `start` afterwards.
  gapi.load('client', start);
}
function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyBUY5uCU7BNZyCmSOTHykGHCOJciIXVD0w',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1TGQBJ7ODbCc82ZvVSRw702Rf8VSzwOL7iIMWEKBbBE8',
      range: 'Expanded!A:F',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        var entered_firstname = $('#firstname').val();
        var entered_lastname = $('#lastname').val();
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          if (entered_firstname === row[1]
            && entered_lastname === row[2]) {
              $('#result').html(row[0] + ", party of " + row[3] +
                "\nWe're delighted to welcome you on our special day!" +
                "\nHow many of you will be joining for each event?");
              var receiption_html = generateSelectorHtml(row[3]);
              var wedding_html = generateSelectorHtml(row[4]);
              var brunch_html = generateSelectorHtml(row[5]);
              $('#rsvp').html(receiption_html);
              $('#rsvp').append(wedding_html);
              $('#rsvp').append(brunch_html);
              break;
          }
        }
      }
    }, function(response) {
      console.log(response.result.error.message);
    });
  });
}
