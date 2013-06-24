define(
	['LocationEventObject','ForecastDisplay','weatherService'],
	function(LocationEventObject,ForecastDisplay,weatherService) {

		function FiveDayForecastDisplay(userLocation) {
			LocationEventObject.apply(this);
			
			var self = this;

			this._element = document.createElement('section');
			this._element.className = 'five-day-forecast-section';
			this._element.innerHTML = '<h1>Five Day Forecast</h1><div class="forecasts"></div>';

			this._forecastsElement = this._element.querySelector('.forecasts');

			this._updateButton = document.createElement('button');
			this._updateButton.innerHTML = "update";
			this._updateButton.setAttribute('type','button');
			this._updateButton.className = "update-button";
			this._updateButton.addEventListener(
				'click',
				function() {
					self.refresh();
				}
			);
			this._element.appendChild(this._updateButton);

			this._syncLocationEventObject(userLocation);

			this.onLocationChange(function(latitude,longitude) {
				self.refresh();
			});

			this.refresh();
		}

		FiveDayForecastDisplay.prototype = new LocationEventObject();
		FiveDayForecastDisplay.prototype.getElement = function() {
			return this._element;
		}
		FiveDayForecastDisplay.prototype.refresh = function() {
			var forecastsElem = this._forecastsElement;
			forecastsElem.innerHTML = '<span class="loading">loading...</span>';
			weatherService.getForecast(
				10,
				this._latitude,
				this._longitude,
				function(results) {
					forecastsElem.innerHTML = "";
					for(var i=0; i<results.length; i++) {
						var forecastDisplay = new ForecastDisplay(results[i]);
						forecastsElem.appendChild(forecastDisplay.getElement());
					}
				}
			);
		}

		return FiveDayForecastDisplay;

	}
);