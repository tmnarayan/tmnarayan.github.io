function generateSelectorHtml(label, numGuests, id) {
  var base = label + ": <select id='" + id + "'>";
  for (i = 0; i <= numGuests; i++) {
    base += "<option value='" + i + "'>" + i + "</option>";
  }
  base += "</select>";
  return base;
}

function testAjax (data) {
  $('#rsvp').append(data);
}

function searchInvites() {
  // Loads the JavaScript client library and invokes `start` afterwards.
  var searchUrl = "us-central1-round-carver-683.cloudfunctions.net/helloGET";
  $.ajax({
    url: searchUrl,
    datatype: "jsonp",
    success: function(response) {
      console.log(response);
    }
  });
  $.get(searchUrl, function(data, status) {
    $('#rsvp').append(data);
  });
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
              $('#welcome').html(row[0] + ":\n" +
                "\nWe're delighted to welcome you on our special day!" +
                "\nHow many guests from your party should we expect?");
              if (row[3] > 0) {
                var friday_html = generateSelectorHtml('Rehearsal Dinner', row[3], 'friday');
                var saturday_html = generateSelectorHtml('Wedding & Receiption', row[4], 'saturday');
                var sunday_html = generateSelectorHtml('Sunday Brunch', row[5], 'sunday');
                $('#forms').html(friday_html);
                $('#forms').append(saturday_html);
                $('#forms').append(sunday_html);
              } else if (row[3] == 0 && row[5] > 0) {
                var saturday_html = generateSelectorHtml('Wedding & Receiption', row[4], 'saturday');
                var sunday_html = generateSelectorHtml('Sunday Brunch', row[5], 'sunday');
                $('#forms').html(saturday_html);
                $('#forms').append(sunday_html);
              } else {
                var saturday_html = generateSelectorHtml('Wedding & Receiption', row[4], 'saturday');
                $('#forms').html(saturday_html);
              }
              $('#forms').append("<br><br>Please inform us of any dietary restrictions: <input id='diet'></input>");
              $('#forms').append("<button type='button' onclick='submitRSVP()'>Submit RSVP!</button>");
              break;
          }
        }
      }
    }, function(response) {
      console.log(response.result.error.message);
    });
  });
}

function submitRSVP() {

}
