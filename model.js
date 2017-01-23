/*
	RainEvent

	State
		name - appears in pulldown menu
		inches - also appears in pulldown menu
	Methods
		getters and setters for all variables
*/

var RainEvent = function(name, inches) {
	this.name = name;
	this.inches = inches;

};

RainEvent.prototype = {
	setName: function(name)  { 
		this.name = name; 
	},
	getName: function() {
		return this.name;
	},
	setInches: function(inches) {
		this.inches = inches;
	},
	getInches: function() {
		return this.inches;
	}
};


/* 
	Catchment

  State
		idx - calculated from basindepthState.catchments.length
		    - this list of catchments is updated by the controller
    overlay - contains vertices stored as latlng
		label - "Catchment $(idx)"
		area - calculated by methods in math module
		availableRunoff - calculated from area of overlay and current rain event
		color - derived automatically from bdView.C_COLORS
		correspondingBasins - basins to display nearby in control panel


	Methods
		calculateArea - uses overlay.getPath()
		calculateRunoff - uses bdState.currRainEvent
*/

var Catchment = function(idx, overlay, color) {
	this.idx = idx;
	this.overlay = overlay;
	this.correspondingBasins = [];
	this.calculate_area();
	this.calculate_runoff();
	this.label = this.construct_label();
	this.setColor(color);
}

Catchment.prototype = {
	// metadata
	calculate_area: function() {
		this.area = calculate_overlay_area(this.overlay);
	},
	construct_label: function() {
		return "Catchment " + String.fromCharCode(this.idx + 65);
	},

	// basins
	addBasin: function(basin) {
		this.correspondingBasins.push(basin);
	},

	removeBasin: function(basin)  {
		for(i = correspondingBasins.length-1; i--; i >= 0) {
			if(correspondingBasins[i] === basin) {
				correspondingBasins.splice(i, 1);
			}
		}
	},

	// math
	calculate_runoff : function() {
		var rainfall = bdState.currRainEvent.getInches();
		var runoff = calculate_capacity(this.area, rainfall);
		this.availableRunoff = runoff;
		return runoff;
	},

	// appearance
	setColor: function (color) {
		this.color = color;
		this.overlay.setOptions({
			fillColor: this.color,
			strokeColor: this.color
		});
	},
	select: function() {
		this.overlay.setEditable(true);
		selectedOverlay = this.overlay;
		bdView.selectCatchmentDiv(this.idx);
		this.overlay.setOptions({
			strokeWeight: bdView.POLYGON_SELECTED_STROKE_W
		});
	}, 
		
	deselect: function () {
		this.overlay.setEditable(false);
		selectedOverlay = null;
		bdView.deselectCatchmentDiv(this.idx);
		this.overlay.setOptions({
			strokeWeight: bdView.POLYGON_STROKE_W
		});
	}
}

var Basin = function(idx, overlay, correspondingCatchment, isBeveled) {
	this.idx = idx;
	this.overlay = overlay;
	this.isBeveled = isBeveled; // not yet used!
	this.calculate_area();
	this.depth_ft = 0;
	this.capacity_gal = 0;
	this.label = this.construct_label();
	this.linkToCatchment(correspondingCatchment);
}
		
Basin.prototype = {

	// math
	calculate_area: function() {
		this.area = calculate_overlay_area(this.overlay);
	},
	calculate_depth: function() {
		var depth = compute_depth(this.capacity_gal, this.area);
		this.depth_ft = depth;
	},
	calculate_capacity : function() {
		var capacity = calculate_capacity(this.area, this.depth_ft * 12); 
		this.capacity_gal = capacity;
	},

	// connections
	// TO DO -- link to new parent div
	linkToCatchment : function(catchment) {
		this.correspondingCatchment = catchment || null;
		if(catchment === null) {
			this.setColor(bdView.POLYGON_ISOLATED_COLOR);
		} else {
			this.setColor(catchment.color);
		}
	},

	setColor : function(color) {
		this.color = color;
		this.overlay.setOptions({
			strokeColor: this.color,
			fillColor: this.color
		});
	},

	select: function() {
		bdView.selectBasinDiv(this.idx);
		selectedOverlay = this.overlay;
		this.overlay.setEditable(true);
		this.overlay.setOptions({
			strokeWeight: bdView.POLYGON_SELECTED_STROKE_W
		});
	}, 
		
	deselect: function () {
		bdView.deselectBasinDiv(this.idx);
		selectedOverlay = null;
		this.overlay.setEditable(false);
		this.overlay.setOptions({
			strokeWeight: bdView.POLYGON_STROKE_W
		});
	},

	construct_label: function() {
		return "Basin " + (this.idx+1);
	},
}

