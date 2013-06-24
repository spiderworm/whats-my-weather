define(
	['LocationEventObject','Map','MapPointer'],
	function(LocationEventObject,Map,MapPointer) {

		function LocationMap(userLocation) {
			LocationEventObject.apply(this);

			this._element = document.createElement('section');
			this._element.className = 'location-map-section';
			this._element.innerHTML = '<h1>Map</h1>';

			this._map = new Map(
				userLocation.getLatitude(),
				userLocation.getLongitude()
			);
			this._element.appendChild(this._map.getElement());

			this._pointer = new MapPointer(
				"Hi!",
				userLocation.getLatitude(),
				userLocation.getLongitude()
			);
			this._map.addPointer(this._pointer);

			var self = this;

			this._map.onClick(function(latitude,longitude) {
				self.setLocation(latitude,longitude);
			});

			this._map.enableWeather();

			this.onLocationChange(
				function(latitude,longitude) {
					self.panTo(latitude,longitude);
					self._updatePointer();
				}
			);

			this._syncLocationEventObject(userLocation);
		}
		LocationMap.prototype = new LocationEventObject();
		LocationMap.prototype.getElement = function() {
			return this._element;
		}
		LocationMap.prototype.centerOn = function(latitude,longitude) {
			this._map.setCenter(latitude,longitude);
		}
		LocationMap.prototype.panTo = function(latitude,longitude) {
			this._map.panTo(latitude,longitude);
		}
		LocationMap.prototype._updatePointer = function() {
			this._pointer.setLocation(this._latitude,this._longitude);
		}



		return LocationMap;

	}
);