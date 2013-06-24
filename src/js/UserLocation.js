define(
	['LocationEventObject'],
	function(LocationEventObject) {

		function UserLocation() {
			LocationEventObject.apply(this);

			this.setLocation(39.292955355363176,-98.96434485912323);

			if(navigator.geolocation) {
				var self = this;
				navigator.geolocation.getCurrentPosition(
					function(pos) {
						self.setLocation(
							pos.coords.latitude,
							pos.coords.longitude
						);
					}
				);
			}
		}
		
		UserLocation.prototype = new LocationEventObject();

		return UserLocation;

	}
);