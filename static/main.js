function queryCar()
{
	$.get(
		"getHasCarStation",
		{ 
			startDate : document.getElementById("startDate").value,
			startTime : document.getElementById("startTime").value,
			endDate : document.getElementById("endDate").value,
			endTime : document.getElementById("endTime").value,
			carType : document.getElementById("carType").value
		},
		function (data) {
			setMarkers(data);
		}
	);
}

var markers = []; 
var infoWindows = [];
var map;
var marker;
var prev_infoWindow =false; 
function setMarkers(stations) {
	for (var i = 0; i< markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
	_stations = stations["hasCar"]
	i=0;
	_stations.forEach(function (_station) {
		point = {lat: _station.stationGIS[0] , lng: _station.stationGIS[1] };
		var marker = new google.maps.Marker({
			position:point,
		  });

		var infoWindow = new google.maps.InfoWindow({
			position:{lat:_stations[i].stationGIS[0],lng:_stations[i].stationGIS[1]},
			content: _stations[i].StationName + "\n" + _stations[i].stationAddr
		});
	
		marker.addListener('click', function () {
			if( prev_infoWindow ) {
				prev_infoWindow.close();
			}
	 
			prev_infoWindow = infoWindow;
			infoWindow.open(map, marker);
		});
		markers.push(marker);
		i+=1;
	});


	var mapOptions = {
		zoom: 13,
		center: {lat:_stations[0].stationGIS[0],lng:_stations[0].stationGIS[1]},
		zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			mapTypeId: 'roadmap',
			styles:[
					  {
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#242f3e"
						  }
						]
					  },
					  {
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#746855"
						  }
						]
					  },
					  {
						"elementType": "labels.text.stroke",
						"stylers": [
						  {
							"color": "#242f3e"
						  }
						]
					  },
					  {
						"featureType": "administrative",
						"elementType": "geometry",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "administrative.locality",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#d59563"
						  }
						]
					  },
					  {
						"featureType": "poi",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#d59563"
						  }
						]
					  },
					  {
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#263c3f"
						  }
						]
					  },
					  {
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#6b9a76"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#38414e"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "geometry.stroke",
						"stylers": [
						  {
							"color": "#212a37"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#9ca5b3"
						  }
						]
					  },
					  {
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#746855"
						  }
						]
					  },
					  {
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
						  {
							"color": "#1f2835"
						  }
						]
					  },
					  {
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#f3d19c"
						  }
						]
					  },
					  {
						"featureType": "transit",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "transit",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#2f3948"
						  }
						]
					  },
					  {
						"featureType": "transit.station",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#d59563"
						  }
						]
					  },
					  {
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#17263c"
						  }
						]
					  },
					  {
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#515c6d"
						  }
						]
					  },
					  {
						"featureType": "water",
						"elementType": "labels.text.stroke",
						"stylers": [
						  {
							"color": "#17263c"
						  }
						]
					  }
					]
	}


	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	for (var i = 0; i< markers.length; i++) {
		markers[i].setMap(map);
	}

}

function googleMapShow()
{
	const googleMap = new Vue({
	  el: '#app',
	  data: {
		map: null
	  },
	  methods: {
		// init google map
		initMap() {
		  
		  // 預設顯示的地點：台北市政府親子劇場
		  let location = {
			lat: 25.0374865, // 經度
			lng: 121.5647688 // 緯度
		  };
		  // 建立地圖
		  this.map = new google.maps.Map(document.getElementById('map'), {
			center: location, // 中心點座標
			zoom: 16, // 1-20，數字愈大，地圖愈細：1是世界地圖，20就會到街道
			/*
			  roadmap 顯示默認道路地圖視圖。
			  satellite 顯示 Google 地球衛星圖像。
			  hybrid 顯示正常和衛星視圖的混合。
			  terrain 顯示基於地形信息的物理地圖。
			*/
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			mapTypeId: 'roadmap',
			styles:[
					  {
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#242f3e"
						  }
						]
					  },
					  {
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#746855"
						  }
						]
					  },
					  {
						"elementType": "labels.text.stroke",
						"stylers": [
						  {
							"color": "#242f3e"
						  }
						]
					  },
					  {
						"featureType": "administrative",
						"elementType": "geometry",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "administrative.locality",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#d59563"
						  }
						]
					  },
					  {
						"featureType": "poi",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#d59563"
						  }
						]
					  },
					  {
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#263c3f"
						  }
						]
					  },
					  {
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#6b9a76"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#38414e"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "geometry.stroke",
						"stylers": [
						  {
							"color": "#212a37"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#9ca5b3"
						  }
						]
					  },
					  {
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#746855"
						  }
						]
					  },
					  {
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
						  {
							"color": "#1f2835"
						  }
						]
					  },
					  {
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#f3d19c"
						  }
						]
					  },
					  {
						"featureType": "transit",
						"stylers": [
						  {
							"visibility": "off"
						  }
						]
					  },
					  {
						"featureType": "transit",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#2f3948"
						  }
						]
					  },
					  {
						"featureType": "transit.station",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#d59563"
						  }
						]
					  },
					  {
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
						  {
							"color": "#17263c"
						  }
						]
					  },
					  {
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
						  {
							"color": "#515c6d"
						  }
						]
					  },
					  {
						"featureType": "water",
						"elementType": "labels.text.stroke",
						"stylers": [
						  {
							"color": "#17263c"
						  }
						]
					  }
					]
			  });
			  	
		}
	  },
	  created() {
		window.addEventListener('load', () => {
		  this.initMap();
		});
	  }
	});

}
$(document).ready(function(){
	document.getElementById("queryCar").addEventListener("click", queryCar);
	googleMapShow();

	// //socket io
	// socket = io.connect("/", { path: '/socket.io' });
	// socket.on('server_response', function (msg) {
	// 	if (msg["data"].match('TakePic :') != null) {
	// 	}
	// });
	// socket.on('ImageStream', function (msg) {
	// });
	// socket.on('connect', function () {
	// 	socket.emit('event', { data: 'connected!' });
	// });

});