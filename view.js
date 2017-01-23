var BDView = function() {
	this.POLYGON_STROKE_W = 0.9;
	this.POLYGON_SELECTED_STROKE_W = 2.5;
	this.POLYGON_ISOLATED_COLOR = "#003";
	this.POLYGON_COLORS = [
		"#00F",
		"#0A0",
		"#900",
		"#FF0",
		"#0FF",
		"#F0F"
	];
	this.POLYGON_SELECTED_COLOR = "#F8F";
	this.catchmentDivs = [];
	this.floatingBasinDivs = [];
};
	
BDView.prototype = {
	updateControlPanel:  function() {
		var cp = $('#control-panel');
	},

	addCatchmentDiv: function(catchment) {
		var div = "<div class='cb-group' id='cb-group-" + catchment.idx + "'>";
			div += "<div class='catchment' id='catchment-" + catchment.idx + "'>";
				div += "<span class='catchment-label' id='catchment-" + catchment.idx + "-label'>" + catchment.label + "</span><br/>";
				div += "<span class='catchment-area'> Area: ";
				  div += "<span id='catchment-" + catchment.idx + "-area'>" 
					div += "" + decimalPlaces(catchment.area,0) + "</span> sq ft</span><br/>";
				div += "<span class='catchment-runoff'> Available run-off: ";
				  div += "<span id='catchment-" + catchment.idx + "-runoff'>" + decimalPlaces(catchment.availableRunoff,0) + "</span> gal</span><br/>";
				div += "</div>";
			div += "</div>";
		$('#control-panel').append(div);
		this.addCatchmentLabelListener(catchment.idx);
	},


	addBasinLabelListener: function(idx) {
		var label = $('#basin-' + idx + '-label');
		label.click(function() {
			unselectAll();
			bdState.basins[idx].select();
		});
	},

	addCatchmentLabelListener: function(idx) {
		var label = $('#catchment-' + idx + '-label');
		label.click(function() {
			unselectAll();
			bdState.catchments[idx].select();
		});
	},

	addBasinCalculationListeners: function (basin)  {
		var idx = basin.idx;
		var depth_input = $('#basin-' + idx + '-depth');
		var capacity_input = $('#basin-' + idx + '-capacity');

		depth_input.on('keyup', function(e) {
			if(e.keyCode === 13) {
				var depth_in = parseFloat(depth_input.val());
				basin.depth_ft = depth_in / 12.0;
				basin.calculate_capacity();
				bdView.updateBasinDiv(idx);
			}
		});

		capacity_input.on('keyup', function(e) {
			if(e.keyCode === 13) {
				var capacity = parseFloat(capacity_input.val());
				basin.capacity_gal = capacity;
				basin.calculate_depth();
				bdView.updateBasinDiv(idx);
			}
		});

	},

	addBasinDiv : function(basin) {
		var div = "<div class='basin' id='basin-" + basin.idx + "'>";
		var form = "<form method='post' accept-charset='utf-8' id='basin-" + basin.idx + "-form'>";
		form += "<span id='basin-" + basin.idx + "-label' class='basin-label'>" + basin.label + "</span><br/>";
		form += "<span class='basin-area'>Area: ";
			form += "<span id='basin-" + basin.idx + "-area'>" + decimalPlaces(basin.area,1) + "</span> sq ft</span><br/>";
		//form += "<input id='basin-" + basin.idx + "-area'>" + basin.area + "</input>sq ft</span><br/>"
		form += "<span class='basin-depth'>Depth: ";
			form += "<input size='2em' type='text' id='basin-" + basin.idx + "-depth'></input> in</span><br/>";
		form += "<span class='basin-capacity'>Capacity: ";
			form += "<input size='4em' type='text' id='basin-" + basin.idx + "-capacity'></input> gal</span><br/>";
		form += "</form>";
		div += form;
		div += "</div>";
		if(basin.correspondingCatchment === null)
			$('#control-panel').append(div);
		else {
			var idx = basin.correspondingCatchment.idx;
			var catchmentDivName = '#cb-group-' + idx;
			$(catchmentDivName).append(div);
		}
		this.addBasinCalculationListeners(basin);
		this.addBasinLabelListener(basin.idx);
	},

	updateCatchmentDiv : function(idx) {
		var areaSpan = $('#catchment-' + idx + '-area');
		var newArea = decimalPlaces(bdState.catchments[idx].area, 0);; 
		areaSpan.text(newArea);

		var runoffSpan = $('#catchment-' + idx + '-runoff');
		var newRunoff = decimalPlaces(bdState.catchments[idx].availableRunoff,0);;
		runoffSpan.text(newRunoff);
	},

	updateBasinDiv : function(idx) {
		var basin = bdState.basins[idx];
		var areaSpan = $('#basin-' + idx + '-area');
		var depthSpan = $('#basin-' + idx + '-depth');
		var capacitySpan = $('#basin-' + idx + '-capacity');
		areaSpan.text(decimalPlaces(basin.area,0));
		depthSpan.val(decimalPlaces(basin.depth_ft * 12,1))
		capacitySpan.val(decimalPlaces(basin.capacity_gal,0));
	},

	deleteBasinDiv : function(idx) {
		var marked = $('#basin-' + idx);
		$(marked).remove();
	},
	
	deleteCatchmentDiv : function(idx) {
		var marked = $('#catchment-' + idx);
		$(marked).remove();
	},

	selectCatchmentDiv: function(idx) {
		var c_div = $('#catchment-' + idx);
		c_div.css('border', '3px solid orange');
	},

	deselectCatchmentDiv: function(idx) {
		var c_div = $('#catchment-' + idx);
		c_div.css('border-width', '0');
	},

	selectBasinDiv: function(idx) {
		var c_div = $('#basin-' + idx);
		c_div.css('border', '3px solid orange');
	},

	deselectBasinDiv: function(idx) {
		var c_div = $('#basin-' + idx);
		c_div.css('border-width', '0');
	},

/*
	findCatchmentDiv: function(catchment) {
		var idx = catchment.idx;
		var label = "catchment-" + idx;
		var div = $('#' + label);
		return div;
	} */

};
