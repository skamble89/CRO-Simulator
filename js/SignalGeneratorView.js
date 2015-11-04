var SignalGeneratorView = Backbone.View.extend({
	initialize: function(options){
		this.amplitude = options.amplitude || 1;
		this.frequency = options.frequency || 1;		
		this.type = 'sine';
	},

	setSignalType: function(type){
		this.type = type;
	},

	getSignalFunction: function(){
		var self = this;
		switch(this.type){
			case 'sine':
				return function(){return -self._sine.apply(self, arguments);};
				break;
			case 'ramp':
				return function(){return -self._ramp.apply(self, arguments);};
				break;
			case 'square':
				return function(){return -self._square.apply(self, arguments);};
				break;
			default:
				return function(){return -self._sine.apply(self, arguments);};
				break;
		}
	},

	_sine: function(t){
		return this.amplitude * Math.sin(t/this.frequency)
	},

	_ramp: function(t){
		return t;
	},

	_square: function(t){
		return this.amplitude;
	}

});