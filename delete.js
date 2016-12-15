
/**
* A menu that lets a user delete a selected vertex of a path.
*  https://developers.google.com/maps/documentation/javascript/examples/delete-vertex-menu
*/
function DeleteMenu() {
	this.div_ = document.createElement('div');
	this.div_.className = 'delete-menu';
	this.div_.innerHTML = 'Delete';
	
	var menu = this;
	google.maps.event.addDomListener(this.div_, 'click', function() {
		menu.removeElement();
	});
}

function assignDeleteFunctions(callback) {
	
	DeleteMenu.prototype.onAdd = function() {
		var deleteMenu = this;
		var map = this.getMap();
		this.getPanes().floatPane.appendChild(this.div_);
		
		// mousedown anywhere on the map except on the menu div will close the
		// menu.
		this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
			if (e.target != deleteMenu.div_) {
				deleteMenu.close();
			}
		}, true);
	};
	
	DeleteMenu.prototype.onRemove = function() {
		google.maps.event.removeListener(this.divListener_);
		this.div_.parentNode.removeChild(this.div_);
		
		// clean up
		this.set('position');
		this.set('path');
		this.set('vertex');
	};
	
	DeleteMenu.prototype.close = function() {
		this.setMap(null);
	};
	
	DeleteMenu.prototype.draw = function() {
		var position = this.get('position');
		var projection = this.getProjection();
		
		if (!position || !projection) {
			return;
		}
	
		var point = projection.fromLatLngToDivPixel(position);
		this.div_.style.top = point.y + 'px';
		this.div_.style.left = point.x + 'px';
	};
	
	/**
	* Opens the menu at a vertex of a given path.
	*/
	DeleteMenu.prototype.open = function(map, overlay, path, vertex, latLng) {
		console.log("-- DeleteMenu.prototype.open --");
		console.log("overlay:")
		console.log(overlay);
		console.log("path:")
		console.log(path);
		console.log("vertex:")
		console.log(vertex)
		console.log("latLng:")
		console.log(latLng);
		if(vertex !== null) {
			console.log("vertex is at:")
			console.log(path.getAt(vertex));
			this.set('position', path.getAt(vertex));
		} else {
			// we can handle this by examining the MouseEvent passed by the click's latLng property, as in
			/*
					map.addListener('click', function(e) {
				    placeMarkerAndPanTo(e.latLng, map);
				  });

			*/
			// or, this.set('position', get_northeastmost(path);
			this.set('position', latLng);
			// this.set('position', path.getAt(0));
		}
		this.set('path', path);
		this.set('overlay', overlay);
		this.set('vertex', vertex);
		this.setMap(map);
		if(vertex === null) {
			this.div_.innerHTML = 'Delete basin';
		} else {
			this.div_.innerHTML = 'Delete vertex';
		}
		this.draw();
	};
	
	
	/**
	* Deletes the vertex from the path.
	*/
	DeleteMenu.prototype.removeElement = function() {
		var path = this.get('path');
		var vertex = this.get('vertex');
		var overlay = this.get('overlay');
		
		if (!path) {
			this.close();
			return;
		}
		if(vertex === null) {
			overlay.setMap(null);
			change_area(0);

			// TODO: remove the table associated with this basin 
		} else {
			path.removeAt(vertex);
		}
		this.close();
	};
	callback();
}

