define(
	['LocationEventObject'],
	function(LocationEventObject) {


		function LocationForm(userLocation) {
			LocationEventObject.apply(this);
			this._element = document.createElement('section');
			this._element.className = 'location-form-section';
			this._element.innerHTML = 
				'<h1>Set Your Location</h1>\
				<form action="javascript:void(0)">\
					<p><label>Latitude <input name="latitude" type="text"></label></p>\
					<p><label>Longitude <input name="longitude" type="text"></label></p>\
					<p class="form-buttons"><button type="submit">submit</button> <button type="reset">clear</button></p>\
				</form>'
			;
			
			var self = this;
			
			var form = this._form = this._element.querySelector('form');
			var latitudeInput = this._latitudeInput = form.querySelector('input[name="latitude"]');
			var longitudeInput = this._longitudeInput = form.querySelector('input[name="longitude"]');

			this._form.addEventListener(
				'submit',
				function(evt) {
					self.setLocation(
						parseFloat(latitudeInput.value),
						parseFloat(longitudeInput.value)
					);
					evt.preventDefault();
					return false;
				},
				true
			);
			
			this.onLocationChange(function(latitude,longitude) {
				self._latitudeInput.value = latitude;
				self._longitudeInput.value = longitude;
			});

			this._syncLocationEventObject(userLocation);

		}
		LocationForm.prototype = new LocationEventObject();
		LocationForm.prototype.getElement = function() {
			return this._element;
		}


		return LocationForm;


	}
);