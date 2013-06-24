define(
	function() {

		function LocationEventObject() {
			this._latitude = 0;
			this._longitude = 0;
			this._locationChangeHandlers = [];
		}
		LocationEventObject.prototype.setLocation = function(latitude,longitude) {
			latitude = latitude || 0;
			longitude = longitude || 0;
			if(latitude !== this._latitude || longitude !== this._longitude) {
				this._latitude = latitude;
				this._longitude = longitude;
				this._triggerLocationUpdate();
			}
		}
		LocationEventObject.prototype.getLatitude = function() {
			return this._latitude;
		}
		LocationEventObject.prototype.getLongitude = function() {
			return this._longitude;
		}
		LocationEventObject.prototype.onLocationChange = function(handler) {
			this._locationChangeHandlers.push(handler);
		}
		LocationEventObject.prototype._syncLocationEventObject = function(leo) {
			var self = this;
			leo.onLocationChange(function(latitude,longitude) {
				self.setLocation(latitude,longitude);
			});
			self.onLocationChange(function(latitude,longitude) {
				leo.setLocation(latitude,longitude);
			});
			this.setLocation(
				leo.getLatitude(),
				leo.getLongitude()
			);
		}
		LocationEventObject.prototype._triggerLocationUpdate = function() {
			var latitude = this._latitude;
			var longitude = this._longitude;
			var self = this;
			for(var i=0; i<this._locationChangeHandlers.length; i++) {
				(function() {

					var handler = self._locationChangeHandlers[i];
					setTimeout(
						function() {
							handler(latitude,longitude);
						},
						0
					);

				})();
			}
		}

		return LocationEventObject;

	}
)