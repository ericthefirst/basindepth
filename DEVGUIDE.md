# Basin Depth Calculator Developer's Guide

## Backstory
I wrote version 0.1 with no knowledge of the Google Maps API or jQuery, and limited experience with JavaScript.
The initial files [index.html](index.html) and [basindepth-math.js](basindepth-math.js) are therefore rather less organized than the 
files model.js, view.js, and controller.js, which were written after some basic planning.

## Model
The primary abstractions are the RainEvent, Catchment, and Basin classes.

### RainEvent
The RainEvent class is currently just a wrapper for a number of inches of rain.  It has a name field in anticipation that 
future development will allow designers to define and store several rain events, and switch between them using a dropdown menu.
It has basic getters and setters for these fields.

### Catchment
A Catchment object is constructed with an index, overlay (from the Google Maps API), and color. The primary methods of the
Catchment class allow a Catchment object to calculate its area and available runoff, and to add and remove associated basins.  
The object can also alter its appearnce, via a color-setting method, and methods to indicate whether or not it is selected.

### Basin
A Basin object is constructed with an index, overlay, corresponding catchment, and a presently unused flag indicating
whether its sides are beveled (most basin walls are beveled, complicating the volume calculation somewhat -- this modification
is slated to follow triangulation of concave polygons). (TODO: finish this section, and the rest of this file.)


## Math
Most of the mathematical functionality is contained in [basindepth-math.js](basindepth-math.js).
