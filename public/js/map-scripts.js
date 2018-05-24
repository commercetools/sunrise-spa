$(window).load(function() {
  var addressList = $('.store-location-wrapper .addresses .list');
  var addressItem = addressList.find('.item');
  var coordsContainer = ".gm-computed-distance"
  var coordValueLat = "data-coord-lat";
  var coordValueLng = "data-coord-lng";
  var activeClass = "address--active";

  // change the location onClick
  addressList.on('click', '.item', function() {
    var changeLocationLat = parseFloat($(this).find(coordsContainer).attr(coordValueLat));
    var changeLocationLng = parseFloat($(this).find(coordsContainer).attr(coordValueLng));
    setLocation(changeLocationLat, changeLocationLng);
    addressItem.removeClass(activeClass);
    $(this).addClass(activeClass);
  });

  // checks if google maps API is loaded
  if (typeof google === 'object' && typeof google.maps === 'object') {
    var userPosition;

    var success = function(position) {
      // gets user geolocation
      userPosition = position;
      distanceFromLat = userPosition.coords.latitude;
      distanceFromLng = userPosition.coords.longitude;

      // calculates and updates the text (km) inside div
      $(coordsContainer).each(function() {
        var distanceToLat = parseFloat($(this).attr(coordValueLat));
        var distanceToLng = parseFloat($(this).attr(coordValueLng));
        $(this).html(computeDistance(distanceFromLat, distanceFromLng, distanceToLat, distanceToLng));
      });

      // after updating it will sort based on the shortest distance
      var sortByDistance = addressItem.sort(function(a,b){
          var a = $(a).find(coordsContainer).text();
          var b = $(b).find(coordsContainer).text();
          return a - b;
      });
      addressList.html(sortByDistance);

      // adds the active class and centers map based on shortest distance item
      var closestItem = addressItem.eq(0);
      var setLocationLat = parseFloat(closestItem.find(coordsContainer).attr(coordValueLat));
      var setLocationLng = parseFloat(closestItem.find(coordsContainer).attr(coordValueLng));
      addressItem.removeClass(activeClass);
      closestItem.addClass(activeClass);
      setLocation(setLocationLat, setLocationLng);
    };

    var error = function(error) {
      window.console&&console.log('Error occurred. Error code: ' + error.code);

      switch(error.code) {
        case 0:
          alert('Unknown error');
          break;
        case 1:
          alert('Permission for location denied. Change your privacy settings or allow it manually');
          break;
        case 2:
          alert('Position Unavailable');
          break;
        case 3:
          alert('Time out response. Try reloading the page');
          break;
      }
      $(coordsContainer).each(function() {
        $(this).html('?');
      });
    };
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Couldn't load google maps. Please, refresh the page.");
  }
});


function setLocation(newLat, newLng) {
    map.setCenter({
        lat : newLat,
        lng : newLng
    });
    map.setZoom(15);
}
