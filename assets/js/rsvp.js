const SEARCH_URL = "https://us-central1-round-carver-683.cloudfunctions.net/searchInvites";
const RSVP_URL = "https://us-central1-round-carver-683.cloudfunctions.net/saveRSVP";

function searchInvites() {
  var firstname = $('#firstname').val();
  var lastname = $('#lastname').val();
  var searchUrl = SEARCH_URL + "?firstname=" + firstname +
                  "&lastname=" + lastname;
  $.get(searchUrl, function(data, status) {
    var row = data;
    if (row != '') {
      displayWelcome(row[0]);
      appendForm(row);
    } else {
      $('#error').css("display", "inline-block");
    }
  });
}

function displayWelcome(name) {
  $('#welcome').prepend('<br>' + name + '<br><br>');
  $('#welcome').css("display", "inline-block");
}

function appendForm(row) {
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
  $('#forms').append("<br><br>Please inform us of any dietary restrictions:  " +
                     "<input id='diet'></input>");
  $('#forms').append("<br><br><button type='button' id='submitrsvp'>Submit RSVP!</button>");
  $('#submitrsvp').click(function() {
    submitRSVP(row[0]);
  });
}

function generateSelectorHtml(label, numGuests, id) {
  var base = "<br>" + label + ": <select id='" + id + "'>";
  for (i = 0; i <= numGuests; i++) {
    base += "<option value='" + i + "'>" + i + "</option>";
  }
  base += "</select>";
  return base;
}

function submitRSVP(guestName) {
  let friday_rsvp = $('#friday').val();
  let saturday_rsvp = $('#saturday').val();
  let sunday_rsvp = $('#sunday').val();
  let dietary_restrictions = $('#diet').val();
  let postBody = {name: guestName, friday: friday_rsvp,
                  saturday: saturday_rsvp, sunday: sunday_rsvp,
                  diet: dietary_restrictions};

  $.post(RSVP_URL, postBody, function(data, status) {
    $('#forms').html('');
    $('#welcome').html('RSVP Submitted!');
  });
}

$(document).ready(function() {
  $('#findinvite').click(function() {
    $('#error').css("display", "none");
    searchInvites();
  });
});
