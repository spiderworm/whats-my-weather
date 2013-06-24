define(
	function() {

		var dateFormatter = {
			format: function(date) {

				var day = this._days[date.getDay()];
				var month = this._months[date.getMonth()];
				var date = date.getDate();

				return '<span class="day">' + day + '</span>, <span class="month">' + month + '</span> <span class="date">' + date + '</span>';
			},
			_days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
			_months: ['January','Febraury','March','April','May','June','July','August','September','October','November','December']
		};

		return dateFormatter;

	}

);