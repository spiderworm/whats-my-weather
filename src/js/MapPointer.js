define(
	['LocationEventObject'],
	function(LocationEventObject) {

		function MapPointer(name,latitude,longitude) {
			LocationEventObject.apply(this);
			this._name = name;
			this.setLocation(latitude,longitude);
		}

		MapPointer.prototype = new LocationEventObject();
		MapPointer.prototype.getName = function() {
			return this._name;
		}

		return MapPointer;

	}
);