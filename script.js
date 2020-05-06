/*var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}*/

/*var map;
function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(-33.91722, 151.23064), zoom: 16});

}*/

var markerGroups = {
  "fire": [],
  "clothing": [],
  "food": [],
  "shelter": [],
  "volunteer": [],
  "transport": []
};

var markerTypes = ["fire", "clothing", "food", "shelter", "volunteer", "transport"];

var init = 0;

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      //infoWindow.open(map);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        icon: 'placeholder.png',
        map: map,
      });
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
  '<form>' + '<h5>Help Request</h5>' + '<div>' +
  '<label for="name">Name: </label>' +
  '<input id="name" name="name" type="text" placeholder="John Smith" required>' + '</div>' + '<div>' +
  '<label for="location">Location: </label>' +
  '<input id="location" name="location" type="text" placeholder="Davis, CA" required>' + '</div>' + '<div>' +
  '<div class="custom-control custom-switch">' +
    '<input type="checkbox" class="custom-control-input" id="customSwitch1" required>' +
    '<label class="custom-control-label" for="customSwitch1">Victim (Y/N)</label>' +
  '</div>' + '<div>' +
  '<div class="custom-control custom-switch">' +
    '<input type="checkbox" class="custom-control-input" id="customSwitch1" required>' +
    '<label class="custom-control-label" for="customSwitch1">Helper (Y/N)</label>' +
  '</div>' +'<div>' +
  '<label for="categories">Category: </label>' +
  '<select name="options" onChange="this.form.event_name.value=this.options[this.selectedIndex].value">' + 
  '<option value= "Clothing">Clothing</option>' +
  '<option value= "Food">Food</option>' +
  '<option value= "Shelter">Shelter</option>' +
  '<option value= "Transport">Transport</option>' +
  '<option value= "Volunteer">Volunteer</option>' +
  '</select>' + '</div>' + '<div>' +
  '<label for="time">Time: </label>' +
  '<select name="options" onChange="this.form.event_name.value=this.options[this.selectedIndex].value">' + 
  '<option value= "12:00AM">12:00 AM</option>' +
  '<option value= "1:00AM">1:00 AM</option>' +
  '<option value= "2:00AM">2:00 AM</option>' +
  '<option value= "3:00AM">3:00 AM</option>' +
  '<option value= "4:00AM">4:00 AM</option>' +
  '<option value= "5:00AM">5:00 AM</option>' +
  '<option value= "6:00AM">6:00 AM</option>' +
  '<option value= "7:00AM">7:00 AM</option>' +
  '<option value= "8:00AM">8:00 AM</option>' +
  '<option value= "9:00AM">9:00 AM</option>' +
  '<option value= "10:00AM">10:00 AM</option>' +
  '<option value= "11:00AM">11:00 AM</option>' +
  '<option value= "12:00PM">12:00 PM</option>' +
  '<option value= "1:00PM">1:00 PM</option>' +
  '<option value= "2:00PM">2:00 PM</option>' +
  '<option value= "3:00PM">3:00 PM</option>' +
  '<option value= "4:00PM">4:00 PM</option>' +
  '<option value= "5:00PM">5:00 PM</option>' +
  '<option value= "6:00PM">6:00 PM</option>' +
  '<option value= "7:00PM">7:00 PM</option>' +
  '<option value= "8:00PM">8:00 PM</option>' +
  '<option value= "9:00PM">9:00 PM</option>' +
  '<option value= "10:00PM">10:00 PM</option>' +
  '<option value= "11:00PM">11:00 PM</option>' +
  '</select>' + '</div>' + '<div>' +
  '<textarea name="area" rows="7" cols="35"></textarea>' + '</div>' +
  '<br>' +
  '<div>' +
      '<input type="submit" value="submit">' +
  '</div>' +
      '</div>';


  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var fire = 'red-circle2.png';
  var cloth = 'cloth-f.png';
  var food = 'food-f.png';
  var shelter = 'house-f.png';
  var volunteer = 'volunteer-f.png';
  var transport = 'car-f.png';

  var icons = {
    fire: {
      icon: fire
    },
    clothing: {
      icon: cloth
    },
    food: {
      icon: food
    },
    shelter: {
      icon: shelter
    },
    volunteer: {
      icon: volunteer
    },
    transport: {
      icon: transport
    }
  };

  var features = [
    {
      position: new google.maps.LatLng(38.547828, -121.747322),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.530373, -121.784916),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.557494, -121.772900),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.535870, -121.757334),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.539514, -121.744849),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.539380, -121.770684),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.527022, -121.757473),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(-35.867427, 136.804796),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(-35.758289, 136.921526),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(-35.691396, 137.369219),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(-35.801739, 137.451616),
      type: 'fire'
    }, {
      position: new google.maps.LatLng(38.535079, -121.769361),
      type: 'clothing'
    }, {
      position: new google.maps.LatLng(38.535814, -121.738096),
      type: 'clothing'
    }, {
      position: new google.maps.LatLng(38.549123, -121.758149),
      type: 'food'
    }, {
      position: new google.maps.LatLng(38.545317, -121.762795),
      type: 'food'
    }, {
      position: new google.maps.LatLng(38.547303, -121.782449),
      type: 'food'
    }, {
      position: new google.maps.LatLng(38.536234, -121.734631),
      type: 'food'
    }, {
      position: new google.maps.LatLng(38.545971, -121.741380),
      type: 'shelter'
    }, {
      position: new google.maps.LatLng(38.545316, -121.753525),
      type: 'volunteer'
    }, {
      position: new google.maps.LatLng(38.534471, -121.749425),
      type: 'volunteer'
    }, {
      position: new google.maps.LatLng(38.550418, -121.767773),
      type: 'transport'
    }, {
      position: new google.maps.LatLng(38.533501, -121.763396),
      type: 'transport'
    }, {
      position: new google.maps.LatLng(38.536965, -121.792491),
      type: 'transport'
    }, {
      position: new google.maps.LatLng(38.534475, -121.774382),
      type: 'shelter'
    }, {
      position: new google.maps.LatLng(38.534475, -121.774382),
      type: 'shelter'
    }, {
      position: new google.maps.LatLng(38.540312, -121.777492),
      type: 'shelter'
    }
  ];

  // Create markers
  for (var i = 0; i < features.length; i++) {
    var marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map
    });
    var type = features[i].type;
    markerGroups[type].push(marker);
  };

  // Google Location Autocomplete
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var types = document.getElementById('type-selector');
  var strictBounds = document.getElementById('strict-bounds-selector');

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });



  autocomplete.addListener('place_changed', function() {  
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Switching icons on and off

function toggleGroup(type) {

  if (type == "all") {
    for (var x = 0; x < markerTypes.length; x++) {
      for (var i = 0; i < markerGroups[markerTypes[x]].length; i++) {
        var marker = markerGroups[markerTypes[x]][i];
            marker.setVisible(true);
      }
    }
  }

  else {
    for (var x = 0; x < markerTypes.length; x++) {
      for (var i = 0; i < markerGroups[markerTypes[x]].length; i++) {
        var marker = markerGroups[markerTypes[x]][i];
        if (markerTypes[x] == type || markerTypes[x] == "fire") {
          marker.setVisible(true);
        } else {
          marker.setVisible(false);
        }
      }
    }
  }
}

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

