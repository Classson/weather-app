
$(document).ready(function() {

// finds location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      currentLat = position.coords.latitude;
      currentLong = position.coords.longitude;

      // reverse geolocation
      locationURL = 'https://api.geocod.io/v1.2/reverse?q=' + currentLat + ',' + currentLong + '&api_key=0f0709bb95a0b127ab111baba9575121a11ba95'
      locationGet = new XMLHttpRequest();
      locationGet.open('GET', locationURL, true);
      locationGet.send();
      locationGet.onload = function() {
        locationInfo = JSON.parse(locationGet.responseText);

        state = locationInfo.results[0].address_components.state;
        city = locationInfo.results[0].address_components.city;
        console.log(state);
        console.log(city);

        // get weather info from weatherunderground
        weatherObject = new XMLHttpRequest();
        cityURL = 'https://api.wunderground.com/api/72ef49057aa67bbf/conditions/q/' + state + '/' + city + '.json'
        jsonp =  "callback"
        dataType = "jsonp"

        weatherObject.open('GET', cityURL, true);
        console.log(weatherObject)
        weatherObject.send();
        weatherObject.onload = function() {

          weatherInfo = JSON.parse(weatherObject.responseText);
          icon = weatherInfo.current_observation.icon;

          dayIcon = "https://icons.wxug.com/i/c/i/" + icon + ".gif";
          nightIcon = "https://icons.wxug.com/i/c/i/" + "nt_" + icon + ".gif";

          document.getElementById('currentTemp').innerHTML = weatherInfo.current_observation.temp_f + "&deg F";
          document.getElementById('w_icon').src = "https://icons.wxug.com/i/c/i/" + "nt_" + icon + ".gif";
          document.getElementById('currentLoc').innerHTML = city;

          fTemp = weatherInfo.current_observation.temp_f;
          cTemp = weatherInfo.current_observation.temp_c;

        }
      }
  });
}
})

//F and C buttons
function fConvertFunct() {
  document.getElementById("currentTemp").innerHTML = fTemp +"&deg F";
}

function cConvertFunct() {
  document.getElementById("currentTemp").innerHTML = cTemp +"&deg C";
}

// spinner overlay
function loaderFunct() {
  document.querySelector('#w_icon').addEventListener('load', function(){
  document.getElementById("overlay").className = "hide";
});
}
loaderFunct();


