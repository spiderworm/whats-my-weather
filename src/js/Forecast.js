define(
	function() {

		function Forecast() {
			this.date = new Date();
			this.temps = {
				high: null,
				low: null
			};
			this.graphicUrl = "";
			this.text = "";
		}

		return Forecast;

	}
);