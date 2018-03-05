
$(document).ready(function() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      currentLat = position.coords.latitude;
      currentLong = position.coords.longitude;

      // reverse geolocation
      locURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + "," + currentLong + '&key=AIzaSyCOcDfOLiweoNHlydUB5P9-9OgeXgAI38U';
      locationGet = new XMLHttpRequest();
      locationGet.open('GET', locURL, true)
      locationGet.send();
      locationGet.onload = function() {
        locationInfo = JSON.parse(locationGet.responseText);
        document.getElementById('currentLoc').innerHTML = locationInfo.results[3].address_components[0].long_name;
        city = locationInfo.results[3].address_components[0].long_name;
        state = locationInfo.results[3].address_components[3].short_name;

        // get weather info from weatherunderground
        weatherObject = new XMLHttpRequest();
        cityURL = 'https://api.wunderground.com/api/72ef49057aa67bbf/conditions/q/' + state + '/' + city + '.json'

        weatherObject.open('GET', cityURL, true);
        weatherObject.send();
        weatherObject.onload = function() {

          weatherInfo = JSON.parse(weatherObject.responseText);
          icon = weatherInfo.current_observation.icon;

          document.getElementById('currentTemp').innerHTML = weatherInfo.current_observation.temp_f + "&deg F";
          document.getElementById('w_icon').src = "https://icons.wxug.com/i/c/i/" + icon + ".gif";
          //document.getElementById('w_icon').src = weatherInfo.current_observation.icon_url;

          fTemp = weatherInfo.current_observation.temp_f;
          cTemp = weatherInfo.current_observation.temp_c;

        }
      }
  });
}
})
function fConvertFunct() {
  document.getElementById("currentTemp").innerHTML = fTemp +"&deg F";
}

function cConvertFunct() {
  document.getElementById("currentTemp").innerHTML = cTemp +"&deg C";
}
