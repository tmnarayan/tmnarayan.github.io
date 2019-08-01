function generateSelectorHtml(label, numGuests, id) {
  var base = label + ": <select id='" + id + "'>";
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
    var invite = data;
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
  });
}

function submitRSVP() {

}
