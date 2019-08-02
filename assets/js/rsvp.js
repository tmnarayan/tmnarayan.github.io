function generateSelectorHtml(label, numGuests, id) {
  var base = "<br>" + label + ": <select id='" + id + "'>";
  for (i = 0; i <= numGuests; i++) {
    base += "<option value='" + i + "'>" + i + "</option>";
  }
  base += "</select>";
  return base;
}

function searchInvites() {
  var firstname = $('#firstname').val();
  var lastname = $('#lastname').val();
  var searchUrl = "https://us-central1-round-carver-683.cloudfunctions.net" +
    "/searchInvites?firstname=" + firstname + "&lastname=" + lastname;
  $.get(searchUrl, function(data, status) {
    var row = data;
    if (row != '') {
      $('#welcome').html(row[0] + ":\n" +
        "\nWe're delighted to welcome you on our special day!" +
        "\nHow many guests from your party should we expect?");
      if (row[3] > 0) {
        var friday_html = generateSelectorHtml('Rehearsal Dinner', row[3], 'friday');
        var saturday_html = generateSelectorHtml('Wedding & Reception', row[4], 'saturday');
        var sunday_html = generateSelectorHtml('Sunday Brunch', row[5], 'sunday');
        $('#forms').html(friday_html);
        $('#forms').append(saturday_html);
        $('#forms').append(sunday_html);
      } else if (row[3] == 0 && row[5] > 0) {
        var saturday_html = generateSelectorHtml('Wedding & Reception', row[4], 'saturday');
        var sunday_html = generateSelectorHtml('Sunday Brunch', row[5], 'sunday');
        $('#forms').html(saturday_html);
        $('#forms').append(sunday_html);
      } else {
        var saturday_html = generateSelectorHtml('Wedding & Reception', row[4], 'saturday');
        $('#forms').html(saturday_html);
      }
      $('#forms').append("<br><br>Please inform us of any dietary restrictions: <input id='diet'></input>");
      $('#forms').append("<button type='button' id='submitrsvp'>Submit RSVP!</button>");
      $('#submitrsvp').click(function() {
        submitRSVP(row[0]);
      });
    } else {
      $('#error').css("display", "block");
    }
  });
}

function submitRSVP(guestName) {
  let friday_rsvp = $('#friday').val();
  let saturday_rsvp = $('#saturday').val();
  let sunday_rsvp = $('#sunday').val();
  let dietary_restrictions = $('#diet').val();
  let postBody = {name: guestName, friday: friday_rsvp,
                  saturday: saturday_rsvp, sunday: sunday_rsvp,
                  diet: dietary_restrictions};

  let rsvpUrl = 'https://us-central1-round-carver-683.cloudfunctions.net/saveRSVP';
  $.post(rsvpUrl, postBody, function(data, status) {
    $('#forms').html('');
    $('#welcome').html('RSVP Submitted!');
  });
}
