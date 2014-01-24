// Generated by CoffeeScript 1.6.3
(function() {
  var populateDisplayStation;

  $(document).on('pagebeforeshow', '#display_station_page', function() {
    var code;
    code = window.sessionStorage.getItem('stationCode');
    return $.ajax({
      url: "http://10.0.2.2:3000/station_info.json",
      data: {
        data: code
      },
      type: 'get',
      dataType: 'json',
      timeout: 10000,
      success: function(result) {
        return populateDisplayStation(result);
      },
      error: function(error) {
        return console.log('Display station get station info ajax failed ' + JSON.stringify(error));
      }
    });
  });

  populateDisplayStation = function(json) {
    console.log('displayStation ajax success ' + JSON.stringify(json));
    $('#stationTitle').text("" + json.coords.stationName);
    createMap(json.coords.lat, json.coords.lon, json.coords.stationName, 'stationMap');
    $('#stationTimeTable').empty();
    return $(json.station).each(function() {
      return $('#stationTimeTable').append("<a href=\"#\" onclick=\"displayThisTrain('" + this.code + "')\">Origin: " + this.origin + ", Destination: " + this.destination + " <br>Arrival: " + this.arrival + ", Departure: " + this.depart + " </a><hr> ");
    });
  };

  window.displayThisTrain = function(trainCode) {
    window.sessionStorage.setItem('trainCode', trainCode);
    return $.mobile.changePage('../displayTrain/displayTrain.html', {
      transition: 'slide',
      changeHash: true
    });
  };

}).call(this);
