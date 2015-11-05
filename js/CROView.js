var CROView = Backbone.View.extend({
	events:{
		'click input[type="radio"]': function(e){
			this.setSelectedChannel(e.currentTarget.value);
		}
	},

	initialize: function(options){
		if(!options || !options.el)throw 'Please specify CRO container (el) in options';

		this.setElement(options.el);
		this.canvas = this.el.getElementsByTagName('canvas')[0];
		this.context = this.canvas.getContext('2d');
		this.context.strokeStyle = options.strokeStyle || 'green';
		this.height = this.canvas.height;
		this.width = this.canvas.width;

		this.t = 0;

		//signals for channel A and channel B
		this.channelA = options.channelA || function(){return 0};
		this.channelB = options.channelB || function(){return 0;};

		//set channel that must be displayed on the cro
		this.setSelectedChannel(options.selectedChannel || 'A');

		//set x,y position of cro plot
		this.setPosition(options.posX || 0, options.posY || this.canvas.height/2);

		//set x,y scale factors
		this.setScaleX(options.scaleX || 1);
		this.setScaleY(options.scaleY || 1);
	},

	render: function(){
		var self = this, w = self.width;
		function draw(){			
			for(var i = 0;i < w; i++){
				var xy = self.getXY(self.t++);
				self.context.lineTo(xy.x, xy.y);				
			}
			self.context.stroke();
			setTimeout(draw, 60);
		}
		draw();
		return this;
	},

	getXY: function(t){
		var obj = {};		
		switch(this.selectedChannel){
			case 'A':
				obj.x = t;
				obj.y = this.channelA(t/this.scaleX) * this.scaleY;
				break;
			case 'B':
				obj.x = t;
				obj.y = this.channelB(t/this.scaleX) * this.scaleY;
				break;
			case 'AB':
				obj.x = (this.channelA(t/this.scaleX) * this.scaleY) + this.canvas.width/2;
				obj.y = this.channelB(t/this.scaleX) * this.scaleY;
				break;
			default:
				obj.x = t;
				obj.y = this.channelA(t/this.scaleX) * this.scaleY;
		}
		obj.x = obj.x + this.posX;
		obj.y = obj.y + this.posY;

		return obj;
	},

	setSelectedChannel: function(channel){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.beginPath();
		this.t = 0;
		this.selectedChannel = channel;
	},

	setPosition: function(x, y){
		this.posX = x;
		this.posY = y;		
	},

	setScaleX: function(x){
		this.scaleX = x;
	},

	setScaleY: function(y){
		this.scaleY = y;
	}
});