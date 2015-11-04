var SignalGeneratorView = Backbone.View.extend({
	initialize: function(options){
		this.amplitude = 1;
		this.frequency = 1;		
		this.type = 'sine';
	},

	setSignalType: function(type){
		this.type = type;
	},

	getSignalFunction: function(){
		var signal;
		switch(this.type){
			case 'sine':
				return this._sine;
				break;
			case 'ramp':
				return this._ramp;
				break;
			case 'square':
				return this._square;
				break;
			default:
				return this._sine;
				break;
		}
	},

	_sine: function(t){
		return this.amplitude * Math.sin(t/this.frequency)
	},

	_ramp: function(t){
		
	},

	_square: function(t){
		
	}

});