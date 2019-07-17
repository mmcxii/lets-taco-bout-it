
let api_url = 'https://api.opencagedata.com/geocode/v1/json'
let api_key = '2e9cd35643fe49fc961504b9f362dff5'
let long;
let lat;
let query_url;
let localZip;
geolocation();

function geolocation(){
    var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;

    lat = crd.latitude
    long = crd.longitude
    query_url = api_url 
    + '?' 
    + 'key=' 
    + api_key 
    + '&q=' + encodeURIComponent(lat + ',' + long);
    //getZip();
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function getZip(){
    fetch(query_url)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        localZip = myJson.results[0].components.postcode
    })
}

