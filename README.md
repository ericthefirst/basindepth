# Basin Depth Calculator

## Purpose
Streamline water harvesting site design.

## Features
* add a catchment area
* add basins associated with this catchment
* enter required number of gallons and calculate required depth
* alternately, enter depth and calculate available number of gallons
* modify basins and catchments
  * drag vertices
  * create new vertices
  * delete vertices (right-click)
  * delete basin (right-click)

## How to use

1. Type the address of your site into the input field in the top left corner.  If it doesn't have an address or you can't find it with the Google search, find a location nearby, then zoom out and pan around until you find it.
2. Zoom in as much as you need to and/or can by scrolling the mouse, or using the zoom buttons on the bottom right.
3. Click the orange Add Catchment button and draw a catchment area directly on the map.
4. Edit the catchment area if necessary by clicking on it and then:
  * moving a corner by clicking and dragging it
  * adding a new corner by clicking and dragging the midpoint of one of the edges
  * deleting a corner by right-clicking it and selecting "Delete vertex"
5) Click on the orange Add Basin button and similarly add basins that receive water from the most recently drawn catchment
6a) Type the desired capacity for a basin in the appropriate text field and press Enter to calculate the required depth of the basin
6b) Alternately, type the depth of a basin and press Enter to calculate the basin's capacity
7) Repeat 3-6 as needed until the site is planned out
8) Simulate rain events by typing different values into the input field labeled Rain Event at the top of the control panel and pressing Enter.  This will give you a sense of how much water is available per catchment in different scenarios, and you can compare to the amount of water that will be used by your basins.


## Development Tasks
_simple_
* runoff coefficients for each catchment
* units of measurement other than gal, sq. ft., in
* re-assign catchments to different basins
* clear labeling of the catchments and basins on the map

_complex_
* add functionality save and restore designs across sessions
* add functionality to export data, and provide a more useful print version
* tutorial or visual quickstart guide
* more complete documentation
* support for all browsers

_mathematical_
* support slanted basin walls
* fix the area computation to provide correct results for concave polygons



## Survey
If you have a use for the tool, please submit feedback on the survey!
