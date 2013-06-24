define(
	['config','Forecast'],
	function(config,Forecast) {

		function WeatherService() {}
		WeatherService.prototype.getForecast = function(dayCount,latitude,longitude,callback) {

			//worldWeatherOnlineService.getForecast(dayCount,latitude,longitude,callback);
			openWeatherMapService.getForecast(dayCount,latitude,longitude,callback);

		}









		function WorldWeatherOnlineService() {}

		WorldWeatherOnlineService.prototype.getForecast = function(dayCount,latitude,longitude,callback) {

			var url = 'http://api.worldweatheronline.com/free/v1/weather.ashx?key=' + config.keys.worldWeatherOnline + '&q=' + latitude + ',' + longitude + '&num_of_days=5&format=json';

			jsonp(
				url,
				"&callback=",
				"",
				function(response) {

					var result = [];

					if(response && response.data && response.data.weather) {
						for(var i=0; i<dayCount; i++) {
							var dayData = response.data.weather[i];
							if(dayData) {

								var forecast = new Forecast();
								forecast.date = new Date(dayData.date);
								forecast.temps.high = dayData.tempMaxF;
								forecast.temps.low = dayData.tempMinF;
								forecast.graphicUrl = dayData.weatherIconUrl[0].value;
								forecast.text = dayData.weatherDesc[0].value;

								result.push(forecast);

							}
						}

					}
					callback(result);
				}
			);


		}





		function OpenWeatherMapService() {}
		OpenWeatherMapService.prototype.getForecast = function(dayCount,latitude,longitude,callback) {

			var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&cnt=' + dayCount + '&mode=json&units=imperial';

			jsonp(
				url,
				"&callback=",
				"",
				function(response) {

					var result = [];

					if(response && response.list) {
						for(var i=0; i<dayCount; i++) {
							var dayData = response.list[i];
							if(dayData) {

								var forecast = new Forecast();
								forecast.date = new Date(dayData.dt * 1000);
								forecast.temps.high = Math.round(dayData.temp.max);
								forecast.temps.low = Math.round(dayData.temp.min);
								forecast.graphicUrl = "http://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
								forecast.text = dayData.weather[0].description;

								result.push(forecast);

							}
						}

					}
					callback(result);
				}
			);

		}





		function jsonp(url,prefix,suffix,onComplete) {

			var jsonpName = 'jsonp_' + ((new Date()).getTime()).toString() + (Math.floor(99999*Math.random())).toString();

			window[jsonpName] = function(result) {
				document.body.removeChild(script);
				delete window[jsonpName];

				onComplete(result);
			};

			var script = document.createElement('script');
			script.src = url + prefix + escape(jsonpName) + suffix;
			document.body.appendChild(script);
		}



		var worldWeatherOnlineService = new WorldWeatherOnlineService();
		var openWeatherMapService = new OpenWeatherMapService();
		var weatherService = new WeatherService();
		return weatherService;

	}
)