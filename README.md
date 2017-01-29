# Basin Depth Calculator
A tool to support rainwater harvesting site design.  Hosted on [threerightangles.com](http://www.threerightangles.com/basindepth/)

## Concept
In the design of rainwater harvesting sites, one goal is to capture as much of the available rainwater as possible.
The Basin Depth Calculator is a tool that allows designers to determine the amount of runoff available during a rainfall event, and 
calculate the required depth of a basin to capture a desired volume of water.  A typical workflow consists of the following steps:
1. Define catchment areas and basins
2. Specify a typical rainfall event, and note the available runoff from each catchment area 
3. Distribute the rainfall from each catchment into the basins it feeds into.
4. Adjust basin depths and shapes as necessary to accommodate constraints

## User Guide

### Defining catchment areas and basins
1. Click on Add Catchment or Add Basin in the control panel.
2. Draw an overlay of the area's shape on the canvas by clicking on its vertices.
3. Complete the overlay by clicking on the initial vertex. (The cursor changes from a crosshair to a hand when it is above the initial vertex.)
4. The catchment or basin is automatically indexed and added to the control panel.
5. New basins are associated with the most recently drawn catchment area by fill color and placement in the control panel.

### Specifying a rainfall event
1. Enter desired rainfall, in inches, in the input field labeled "Rain Event."
2. Click "Set."
3. The available runoff for each catchment area is updated automatically.

### Distributing runoff volume among basins
1. For each basin, type the desired capacity in gallons into the input field labeled "Capacity" and hit Enter
2. The required depth of the basin is calculated automatically.

### Adjusting a basin's depth or desired capacity
1. To adjust a basin's depth, type the new value into the input field labeled "Depth" and press Enter.
2. The basin's capacity is automatically recalculated.
3. To adjust a basin's desired capacity, type the new value into the input field labeled "Capacity" and press Enter.
4. The basin's required depth is automatically recalculated.

### Adjusting the shape of a basin or catchment 
1. Select the basin or catchment by clicking on the catchment, or its label in the control panel.
2. Move a vertex by clicking on its circular handle and dragging it
3. Insert a vertex by clicking on a semitransparent handle in the center of one of the edges and moving it to the desired position
4. Delete a vertex by right-clicking on it and selecting "Delete vertex" from the context menu
5. The area of the catchment, or the area and capacity of the basin, is automatically recalculated.

### Deleting a catchment area
1. Select the catchment by clicking on its overlay in the canvas, or clicking on its name in the control panel.
2. Right-click on the catchment's overlay and select 'Delete basin'. (Or, simply press the Backspace key.)
3. The catchment's overlay and its information in the control panel are removed.
4. Any basins associated with the deleted catchment are now unaffiliated with any catchment.

## Keyboard shortcutes
1. To add a catchment area, press 'c'.
1. To add a basin , press 'b'.

## New features in version 0.2
* Any number of catchments and basins can be added
* Basins, catchment areas, and individual vertices can easily be deleted
* The depth or capacity of a basin is automatically calculated given the parameter
* The area and capacity of a basin or catchment changes automatically as its shape is altered
* After a catchment has been defined, subsequent basins are filled with the same color as the catchment, and are logically grouped together in the control panel
* Basins and catchments can be cancelled while they are being drawn <sup>[1](#cancellation-woe)</sup>


<a name="cancellation-woe"><sup>1</sup></a> Unfortunately, information about the deleted shape will be displayed in the control panel as if it had been drawn.  In this case, click on the shape's title in the control panel and press Backspace to delete it.

## Future work
* Modify triangulation algorithm to handle [concave](https://en.wikipedia.org/wiki/Concave) basins and catchment areas 
* Add search bar 
* Allow user to change which catchment a basin is assigned to
* Improve set of pre-defined colors for basin and catchment overlays
* Fill basins with a lighter tone than their associated catchments
* Add support for metric units
* Save site design
* Export site design to PDF or other format


## Get involved
* If you have used the tool and would like to provide feedback, there is a [survey](https://goo.gl/forms/qbTxQAnPEgSCuf7k1) you can fill out
* To receive updates about the tool's development, volunteer to contribute to the project, or otherwise communicate with the lead developer, send an email to threerightangles at gmail dot com
* Notes on the API can be found in the [dev guide](DEVGUIDE.md)
