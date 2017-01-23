function heron(a, b, c) {
	var s = (a+b+c)/2;
	return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}

function decimalPlaces(x, n) {
	return Math.floor(x*Math.pow(10, n)) / Math.pow(10, n);
}

// http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function calculate_dist_in_ft(lat1,lon1,lat2,lon2) {
	var R = 3959 * 5280; // Radius of earth in feet
  //var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
	// console.log("Diagonal length: " + d);
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// this version only works for convex shapes
function get_triangle_edge_lengths(coord_list) {
	var n = coord_list.length;
	var all_edge_length_triples = [];
	for(var i = 2; i < n; i++) {
		var edge_lengths = [];
		var lat1 = coord_list[0][0];
		var lat2 = coord_list[i-1][0];
		var lat3 = coord_list[i][0];
		var lng1 = coord_list[0][1];
		var lng2 = coord_list[i-1][1];
		var lng3 = coord_list[i][1];

		edge_lengths.push(calculate_dist_in_ft(lat1, lng1, lat2, lng2));
		edge_lengths.push(calculate_dist_in_ft(lat1, lng1, lat3, lng3));
		edge_lengths.push(calculate_dist_in_ft(lat2, lng2, lat3, lng3));
		all_edge_length_triples.push(edge_lengths);	
	}
	return all_edge_length_triples;
}

// t
function calculate_area(triangle_edge_length_lists) {
	var area = 0;
	triangle_edge_length_lists.forEach(function(item, index) {
		var new_area = heron(item[0], item[1], item[2]);
		// console.log("Area of triangle #" + index + ": " + new_area);
		area += new_area;
	});
	area = decimalPlaces(area, DECIMAL_PRECISION);
	return area;
}

function compute_depth(gallons, area) {
	var cu_ft = gal_to_cu_ft(gallons);
	//console.log("In compute_depth, returning " + cu_ft + "/" + area + " = " + (cu_ft/area) + " feet");
	return cu_ft / area;
}

function ft_and_inches(feet) {
	console.log("Converting " + feet + " feet to ft and inches");
	var ft = Math.floor(feet);
	var inches = Math.ceil(12 * (feet - ft));
	return ft + "' " + inches + "\"";
}

function gal_to_cu_ft(gallons) {
	console.log(gallons + " gal = " + (0.1337 * gallons) + " cu ft");
	return 0.1337 * gallons;
}

function cu_ft_to_gal(cuft) {
	return cuft / 0.1337;
}
