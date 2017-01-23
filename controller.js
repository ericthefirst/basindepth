var set_rainfall = function() {
	var inches = parseFloat($('#rainfall').val());
	bdState.rainEvents[0].setInches(inches);
	bdState.catchments.forEach(function(c) {
		c.calculate_runoff();	
		bdView.updateCatchmentDiv(c.idx);
	});
}


var BDState = function() {
	this.rainEvents = [ new RainEvent("None", 0) ] ;
	this.currRainEvent = this.rainEvents[0];
	this.currCatchment = null;
	this.catchments = [];
	this.basins = [];
	this.defaultBeveled = false;
	this.mode = null;
};

BDState.prototype = {
	toAddCatchmentMode: function() {
		this.mode = "add catchment";
		drawingManager.setOptions({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: false
		});
	},

	toAddBasinMode: function() {
		this.mode = "add basin";
		drawingManager.setOptions({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: false
		});
	},

	toEditMode: function() {
		this.mode = "edit";
		drawingManager.setOptions({
			drawingMode: null
		});
		
	},

	addCatchment : function(overlay) {
		var idx = this.catchments.length;	
		var col = bdView.POLYGON_COLORS[idx];
		var catchment = new Catchment(idx, overlay, col);
		this.catchments.push(catchment);
		bdView.addCatchmentDiv(catchment);
		overlay.name = catchment.label;
		bdState.currCatchment = catchment;
	},

	addBasin : function(overlay, isBeveled) {
		var idx = this.basins.length;
		var correspondingCatchment = bdState.currCatchment || null;
		var ccName = "";
		if(correspondingCatchment !== null) {
			ccName = correspondingCatchment.label;
		}
		var basin = new Basin(idx, overlay, correspondingCatchment, isBeveled);
		this.basins.push(basin);
		overlay.name = basin.label;
		bdView.addBasinDiv(basin);
		
	},

	isBasinOrCatchment : function(overlay) {
		out = '?';
		this.catchments.forEach(function(catchment, idx) {
			if(catchment.overlay.name === overlay.name) {
				out = 'c';
			}
		});
		this.basins.forEach(function(basin, idx) {
			if(basin.overlay === overlay) {
				out = 'b';
			}
		});
		return out;
	},

	findOverlay : function(overlay) {
		out = null;
		this.catchments.forEach(function(catchment, idx) {
			if(catchment.overlay.name === overlay.name) {
				out = catchment;
			}
		});
		this.basins.forEach(function(basin, idx) {
			if(basin.overlay === overlay) {
				out = basin;
			}
		});
		return out;
	},

	findOverlayName : function(overlay) {
		this.catchments.forEach(function(catchment, idx) {
			if(catchment.overlay.name === overlay.name) {
				return catchment.label;
			}
		});
		this.basins.forEach(function(basin, idx) {
			if(basin.overlay === overlay) {
				return basin.label;
			}
		});
		return "overlay not found";
	}

}
/*
document.onkeypress = function (e) {
  e = e || window.event;
	key = String.fromCharCode(e.keyCode);
  console.log("Pressed " + key + " with keyCode " + e.keyCode);
	switch(key) {
		case 'c': bdState.toAddCatchmentMode(); break;
		case 'b': bdState.toAddBasin(); break;
	}
};
*/
