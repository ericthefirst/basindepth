// triangulate.js
// Takes a polygon, composed of lat-lng pairs, and breaks it into triangles, triplets of lat-lng pairs
// You could then just sum the map of an area function over all those triangles
//
// Eric Welch
// September 2016


function isort(xs) {
	console.log("isort in: " + xs);
	for(var i = 1; i < xs.length; i++) {
		var tmp = xs[i];
		var j = i;
		while(j > 0 && tmp < xs[j-1]) {
			xs[j] = xs[j-1];
			j--;
		}
		xs[j] = tmp;
	}
	console.log("isort in: " + xs);
	return xs;
}

// each line in the form [x1, y1, x2, y2]
// note to self: check if horizontal: then scan vertically
// if one is vertical and one is horizontal, it's pretty easy
function intersect(line1, line2) {
	var vertical = false;
	var orthogonal = false;
	var top, bot, lt, rt, other_x, other_y;
	if(line1[0][0]-line1[1][0] === 0 || line2[0][0] - line[1][0] === 0) {
		if(line1[0][1]-line1[1][1] === 0 || line2[0][1] - line2[1][1] === 0 {
			orthogonal = true;
		} else {
			vertical = true;
		}
	}
	if(orthogonal) {
		if(line1[1][0]-line1[0][0] === 0) {  // line 1 is parallel to the y-axis
			top = line1[0][1] > line1[1][1] ? line1[0][1] : line1[1][1];
			bot = line1[0][1] < line1[1][1] ? line1[0][1] : line1[1][1];
			other_y = line2[0][1];
			lt = line2[0][0] < line2[1][0]] ? line2[0][0] : line2[1][0];
			rt = line2[0][0] > line2[1][0]] ? line2[0][0] : line2[1][0];
			other_x = line1[0][0];
		} else {  // line 2 is parallel to the y-axis
			top = line2[0][1] > line2[1][1] ? line2[0][1] : line2[1][1];
			bot = line2[0][1] < line2[1][1] ? line2[0][1] : line2[1][1];
			other_y = line1[0][1];
			lt = line1[0][0] < line1[1][0]] ? line1[0][0] : line2[1][0];
			rt = line1[0][0] > line1[1][0]] ? line1[0][0] : line2[1][0];
			other_x = line2[0][0];
		}
		return (other_x > lt && other_x < rt && other_y > bot && other_y < top);

	} else if (vertical) {
		var x1, x2, critical_ys;
		critical_ys = isort(line1[0][1], line1[1][1], line2[0][1], line2[1][1]);
		if(line1[0][0] === line1[1][0]) {
			x1 = line1[0][0];
			x2 = interpolate(critical_ys[1], line2[0][1], line2[0][0], line2[1][1], line2[1][0]);
		} else {
			x1 = interpolate(critical_ys[1], line1[0][1], line1[0][0], line1[1][1], line1[1][0]);
			x2 = line2[0][0];
		}
		if(x1 === x2)
			return true;
		var line1_is_lefter = x1 < x2;

		if(line1[0][0] === line1[1][0]) {
			x1 = line1[0][0];
			x2 = interpolate(critical_ys[2], line2[0][1], line2[0][0], line2[1][1], line2[1][0]);
		} else {
			x1 = interpolate(critical_ys[2], line1[0][1], line1[0][0], line1[1][1], line1[1][0]);
			x2 = line2[0][0];
		}
		if(x1 === x2)
			return true;
		return (x1 < x2) === line1_is_lefter;
		
	} else {
		var critical_xs, y1, y2;
		critical_xs = isort(line1[0][0], line1[1][0], line2[0][0], line2[1][0]);
		y1 = interpolate(critical_xs[1], line1[0][0], line1[0][1], line1[1][0], line1[1][1]);
		y2 = interpolate(critical_xs[1], line2[0][0], line2[0][1], line2[1][0], line2[1][1]);
		if(y1 === y2)
			return true;
		var line1_is_upper = y1 > y2;
		y1 = interpolate(critical_xs[1], line1[0][0], line1[0][1], line1[1][0], line1[1][1]);
		y2 = interpolate(critical_xs[1], line2[0][0], line2[0][1], line2[1][0], line2[1][1]);
		if(y1 === y2)
			return true;
		return (y1 < y2) === line1_is_upper;
	}
		
}

function interpolate(x, x1, y1, x2, y2) {
	return (x-x1) * (y1-y2)/(x1-x2) + y1;
}


// vertices of the form [lat, lng]
function neighbors(list, vertex) {
	var n = list.length;
	var idx = list.indexOf(vertex);
	return [list[(idx-1)%n], list[(idx+1)%n]];
}

// return vertex 
function leftmost(vertices) {
	leftest = vertices[0];
	for(var i = 1; i< vertices.length; i++) {
		if(vertices[i][0] < leftest[0]) {
			leftest = vertices[i];
		}
	}
	return leftest;
}


Array.prototype.remove = function(element) {
	var idx = this.indexOf(element);
	if(idx > -1) {
		this.splice(idx, 1);
	}
}

// concept: find the two edges that intersect with the line between idx2 and idx3
// determine on which side of the indicies between idx2 and idx3 we find lt_idx;
function leftmost_concavity(list, lt_idx, idx2, idx3) {
	var n = list.length;

	// first, check if the index for the leftmost vertex in the entire polygon is between idx2 and idx3
	// if it is, then our target is NOT between idx2 and idx3
	var start = idx2 < idx3 ? idx2 : idx3;
	var end   = idx2 > idx3 ? idx2 : idx3;
	between = true;
	for(var ii = start; ii < end; i++) {
		if(ii === lt_idx) {
			between = false;
		}
	}
	if(!between) {
		var temp = start;
		start = end;
		end = temp;
	}

	var leftest = list[(start + 1) % n];
	for(var ii = (start + 2) % n; (between && (ii < end)) || (!between && (ii < end || ii > start)); ii++) {
		if(ii === n)
			ii = 0;
		if(list[ii][0] < leftest[0]) {
			leftest = list[ii];;
		}
	}
	return leftest;
}

// checks if triple of vertices forms a triangle contained entirely within the polygon
function is_ear(triangle, list) {
	var lefty = triangle[0];
	var lt_idx = triangle.indexOf(lefty);
	idx2 = triangle.indexOf(triangle[1]);
	idx3 = triangle.indexOf(triangle[2]);
	for(var i = 0; i < list.length; i++) {
		var ii = (i + 1) % list.length;
		if((i === lt_idx && (ii === idx2   || ii === idx3)) 
			|| (i === idx2 && (ii === lt_idx || ii === idx3))
			|| (i === idx3 && (ii === idx2   || ii === lt_idx))) {
				continue;	
		}
		if(intersect([list[i], list[ii]], [list[idx2], list[idx3]])) {
			return false;
		}
	}
	return true;
}

Array.prototype.grab = function(idx) {
	return this[idx];
}

// Life Achievement
// September 7, 2016
// first time I actually used recursion for anything meaningful
function triangulate(list) {
	// base case
	if(list.length === 3) {
		console.log("Returning " + [list]);
		return [list];
	}

	var leftest = leftmost(list);
	var nbr1, nbr2;
	[nbr1, nbr2] = neighbors(list, leftest);

	// easy case: leftmost point and its neighbors form triangle entirely inside the polygon	
	if(is_ear([leftest, nbr1, nbr2], list)) {
		list.remove(leftest);
		var out = [[leftest, nbr1, nbr2]].concat(triangulate(list));
		return out;

	// hard case: have to divide and conquer
	} else {
		var new_friend = leftmost_concavity(list, leftest, nbr1, nbr2);
		var l_idx = list.indexOf(leftest);
		var nf_idx = list.indexOf(new_friend);
		var upper_idx = l_idx > nf_idx ? l_idx : nf_idx;
		var lower_idx = l_idx < nf_idx ? l_idx : nf_idx;

		var polygon1 = [list[upper_idx]];
		var polygon2 = [list[lower_idx]];
		for(var i = upper_idx+1; i <= lower_idx + n; i++)
			polygon1.push(list[i % n]);
		for(var i  = lower_idx; i <= upper_idx; i++)
			polygon2.push(list[i]);

		var out = triangulate(polygon1).concat(triangulate(polygon2));
		console.log("Returning " + out);
		return out;
	}
	
}
