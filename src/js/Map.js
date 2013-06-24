define(
	["google-apis"],
	function(google) {

		function Map(latitude,longitude) {
			this._element = document.createElement('div');
			this._element.className = 'map';
			this._pointers = [];

			this._googleMap = new google.maps.Map(
				this._element,
				{
					zoom: 8,
					center: new google.maps.LatLng(latitude, longitude),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}
			);
		}
		Map.prototype.getElement = function() {
			return this._element;
		}
		Map.prototype.onClick = function(handler) {
			google.maps.event.addListener(this._googleMap, 'click', function(evt) {
				handler(
					evt.latLng.lat(),
					evt.latLng.lng()
				);
			});
		}
		Map.prototype.enableWeather = function() {
			var weatherLayer = new google.maps.weather.WeatherLayer({
				temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT,
				suppressInfoWindows: true,
				clickable: false
			});
			weatherLayer.setMap(this._googleMap);
			
			var cloudLayer = new google.maps.weather.CloudLayer();
			cloudLayer.setMap(this._googleMap);
		}
		Map.prototype.panTo = function(latitude,longitude) {
			this._googleMap.panTo(
				new google.maps.LatLng(
					latitude,
					longitude
				)
			);
		}
		Map.prototype.setCenter = function(latitude,longitude) {
			this._googleMap.setCenter(
				new google.maps.LatLng(
					latitude,
					longitude
				)
			);
		}
		Map.prototype.addPointer = function(mapPointer) {
			this._pointers.push(mapPointer);
			this._displayPointer(mapPointer);
		}
		Map.prototype._displayPointer = function(mapPointer) {
			if(this._googleMap) {
				GMapsMarker.getInstance(this._googleMap,mapPointer);
			}
		}





		function GMapsMarker(googleMap,mapPointer) {

			var opts = {
				position: new google.maps.LatLng(
					mapPointer.getLatitude(),
					mapPointer.getLongitude()
				),
				map: googleMap,
				title: mapPointer.getName()
			};
			var marker = new google.maps.Marker(opts);


			mapPointer.onLocationChange(function(latitude,longitude) {

				marker.setPosition(
					new google.maps.LatLng(
						latitude,
						longitude
					)
				);

			});

			return marker;

		}

		GMapsMarker.getInstance = function(googleMap,mapPointer) {
			for(var i=0; i<this._instances.length; i++) {
				if(this._instances.googleMap === googleMap && this._instances.mapPointer === mapPointer)
					return this._instances.instance;
			}
			var instance = new GMapsMarker(googleMap,mapPointer);
			this._instances.push({
				googleMap: googleMap,
				mapPointer: mapPointer,
				instance: instance
			});
			return instance;
		}
		GMapsMarker._instances = [];


		return Map;


	}
);