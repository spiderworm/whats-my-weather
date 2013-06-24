define(
	['dateFormatter'],
	function(dateFormatter) {

		function ForecastDisplay(forecast) {
			this._element = document.createElement('section');
			this._element.className = 'forecast';
			this._element.innerHTML = 
				'<h1>' + dateFormatter.format(forecast.date) + '</h1>' +
				'<img src="' + forecast.graphicUrl + '" title="' + forecast.text + '">' +
				'<div class="temperatures"><span class="high">' + forecast.temps.high + '&deg;</span>/<span class="low">' + forecast.temps.low + '&deg;</span></div>' +
				'<p class="description">' + forecast.text + '</p>'
			;
		}
		ForecastDisplay.prototype.getElement = function() {
			return this._element;
		}

		return ForecastDisplay;

	}
);