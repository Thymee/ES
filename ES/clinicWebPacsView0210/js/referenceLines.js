
(function($, cornerstone, cornerstoneTools) {

    'use strict';

    var toolType = 'referenceLiness';

    function onImageRendered(e) {
    	const eventData = e.detail;
        // if we have no toolData for this element, return immediately as there is nothing to do
        var toolData = cornerstoneTools.getToolState(e.currentTarget, toolType);
        if (toolData === undefined) {
            return;
        }

        // Get the enabled elements associated with this synchronization context and draw them
        var syncContext = toolData.data[0].synchronizationContext;
        var enabledElements = syncContext.getSourceElements();
//		console.log(enabledElements)
		
        var renderer = toolData.data[0].renderer;

//var context = eventData.canvasContext.canvas.getContext('2d');
        // Create the canvas context and reset it to the pixel coordinate system
        var canvas = eventData.canvasContext.canvas;
        	cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, canvas.getContext('2d'));
//		console.log(e.currentTarget)
//		console.log(enabledElements)
//		console.log($(e.currentTarget).data('5555'))
        // Iterate over each referenced element
//      console.log($(e.currentTarget).data('mouseWheel'))
		if ($(e.currentTarget).data('mouseWheel')) {
//       	$(e.currentTarget).data('mouseWheel',false);
            return;
        }

//      if ($(e.currentTarget).data("autoPlanePosition")) {
//       	$(e.currentTarget).data("autoPlanePosition",false);
//          return;
//      }
        
		// Iterate over each referenced element
		enabledElements.forEach((referenceEnabledElement) => {

			// Don't draw ourselves
			if(referenceEnabledElement === e.currentTarget) {
				return;
			}

			// Render it
			if($(referenceEnabledElement).data('mouseWheel')){
//				console.log($(referenceEnabledElement))
				// render it
            	renderer(canvas, eventData, e.currentTarget, referenceEnabledElement);
//				$(referenceEnabledElement).data('mouseWheel',false);
			}
		});
        
        
        
        
    }

    // enables the reference line tool for a given element.  Note that a custom renderer
    // can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
    function enable(element, synchronizationContext, renderer) {
        renderer = renderer || cornerstoneTools.renderActiveReferenceLine;

        cornerstoneTools.addToolState(element, toolType, {
            synchronizationContext: synchronizationContext,
            renderer: renderer
        });
        $(element).on('cornerstoneimagerendered', onImageRendered);
        cornerstone.updateImage(element);
    }

    // disables the reference line tool for the given element
    function disable(element) {
        $(element).off('cornerstoneimagerendered', onImageRendered);
        cornerstone.updateImage(element);
    }

	cornerstoneTools.referenceLiness={};
    // module/private exports
    cornerstoneTools.referenceLiness.tool= {
        enable: enable,
        disable: disable

    };

})($, cornerstone, cornerstoneTools);

(function($, cornerstone, cornerstoneTools) {

    'use strict';

    var toolType = 'automaticPlanePositioning';

    function onImageRendered(e) {
    	const eventData = e.detail;
        // if we have no toolData for this element, return immediately as there is nothing to do
        var toolData = cornerstoneTools.getToolState(e.currentTarget, toolType);
        if (toolData === undefined) {
            return;
        }

        // Get the enabled elements associated with this synchronization context and draw them
        var syncContext = toolData.data[0].synchronizationContext;
        var enabledElements = syncContext.getSourceElements();
//		console.log(enabledElements)
		
        var renderer = toolData.data[0].renderer;

//var context = eventData.canvasContext.canvas.getContext('2d');
        // Create the canvas context and reset it to the pixel coordinate system
        var canvas = eventData.canvasContext.canvas;
        	cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, canvas.getContext('2d'));
//		console.log(e.currentTarget)
//		console.log(enabledElements)
//		console.log($(e.currentTarget).data('5555'))
        // Iterate over each referenced element
//      console.log($(e.currentTarget).data("autoPlanePosition"))
//		if ($(e.currentTarget).data('mouseWheel')) {
//       	$(e.currentTarget).data('mouseWheel',false);
//          return;
//      }

//      if ($(e.currentTarget).data("autoPlanePosition")) {
//       	$(e.currentTarget).data("autoPlanePosition",false);
//          return;
//      }
        
        $.each(enabledElements, function(index, referenceEnabledElement) {
//			console.log($(referenceEnabledElement).data("autoPlanePosition"))
//			console.log($(referenceEnabledElement).data('mouseWheel'))
			
//			if($(referenceEnabledElement).data('mouseWheel')){
//				console.log($(referenceEnabledElement))
//			}
            // don't draw ourselves
            if (referenceEnabledElement === e.currentTarget) {
                return;
            }
			
////			if($(referenceEnabledElement).hasClass('')
			if ($(referenceEnabledElement).data("autoPlanePosition")) {
         		$(referenceEnabledElement).data("autoPlanePosition",false)
           	 	return;
        	}
//			
			
			
			if($(referenceEnabledElement).data('mouseWheel')){
//				console.log($(referenceEnabledElement))
				// render it
            	renderer(canvas, eventData, e.currentTarget, referenceEnabledElement);
				$(referenceEnabledElement).data('mouseWheel',false);
			}
            
        }); 
    }

    // enables the reference line tool for a given element.  Note that a custom renderer
    // can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
    function enable(element, synchronizationContext, renderer) {
        renderer = renderer || cornerstoneTools.renderActiveReferenceLine;

        cornerstoneTools.addToolState(element, toolType, {
            synchronizationContext: synchronizationContext,
            renderer: renderer
        });
        $(element).on('cornerstoneimagerendered', onImageRendered);
        cornerstone.updateImage(element);
    }

    // disables the reference line tool for the given element
    function disable(element) {
        $(element).off('cornerstoneimagerendered', onImageRendered);
        cornerstone.updateImage(element);
    }

	cornerstoneTools.automaticPlanePositioning={};
    // module/private exports
    cornerstoneTools.automaticPlanePositioning.tool= {
        enable: enable,
        disable: disable

    };

})($, cornerstone, cornerstoneTools);


(function($, cornerstone,cornerstoneMath, cornerstoneTools) {

    'use strict';

    // renders the active reference line
    function renderActiveReferenceLine(canvas, eventData, targetElement, referenceElement) {
    	
   
        var targetImage = cornerstone.getEnabledElement(targetElement).image;
        var referenceImage = cornerstone.getEnabledElement(referenceElement).image;

        // make sure the images are actually loaded for the target and reference
        if (!targetImage || !referenceImage) {
            return;
        }

        var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);
        var referenceImagePlane = cornerstone.metaData.get('imagePlaneModule', referenceImage.imageId);

        // Make sure the target and reference actually have image plane metadata
        if (!targetImagePlane ||
            !referenceImagePlane ||
            !targetImagePlane.rowCosines ||
            !targetImagePlane.columnCosines ||
            !targetImagePlane.imagePositionPatient ||
            !referenceImagePlane.rowCosines ||
            !referenceImagePlane.columnCosines ||
            !referenceImagePlane.imagePositionPatient) {
            return;
        }

        // the image planes must be in the same frame of reference
        if (targetImagePlane.frameOfReferenceUID !== referenceImagePlane.frameOfReferenceUID) {
            return;
        }
		
		targetImagePlane.rowCosines = convertToVector3(targetImagePlane.rowCosines);
  		targetImagePlane.columnCosines = convertToVector3(targetImagePlane.columnCosines);
  		targetImagePlane.imagePositionPatient = convertToVector3(targetImagePlane.imagePositionPatient);
  		referenceImagePlane.rowCosines = convertToVector3(referenceImagePlane.rowCosines);
  		referenceImagePlane.columnCosines = convertToVector3(referenceImagePlane.columnCosines);
  		referenceImagePlane.imagePositionPatient = convertToVector3(referenceImagePlane.imagePositionPatient);
		
        // the image plane normals must be > 30 degrees apart
        var targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
        var referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
        var angleInRadians = targetNormal.angleTo(referenceNormal);

        angleInRadians = Math.abs(angleInRadians);
        if (angleInRadians < 0.5) { // 0.5 radians = ~30 degrees
            return;
        }

      	var referenceLine = cornerstoneTools.calculateReferenceLine(targetImagePlane, referenceImagePlane);
        
        if (!referenceLine) {
            return;
        }

        var refLineStartCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.start);
        var refLineEndCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.end);
		
		
		if(refLineStartCanvas.x>refLineEndCanvas.x){
			var lineCanvas=refLineStartCanvas;
				refLineStartCanvas=refLineEndCanvas;
				refLineEndCanvas=lineCanvas;
		}
		
        var color = cornerstoneTools.toolColors.getActiveColor();
        var lineWidth = cornerstoneTools.toolStyle.getToolWidth();

//		console.log(refLineStartCanvas)
//		console.log(refLineEndCanvas)

		var context =canvas.getContext('2d');
		var canvasWidth=canvas.width;
		var canvasHeight=canvas.height;
		
		if(canvasWidth==undefined||canvasHeight==undefined||canvasWidth==null||canvasHeight==null||canvasWidth==0||canvasHeight==0){
			return;
		}
        // draw the referenceLines
        context.setTransform(1, 0, 0, 1, 0, 0);
//		var color=['green',color,'red','white']
		
		if(refLineStartCanvas.x>=canvas.width){
			coords.x=canvas.width-5;
		}
		if(refLineEndCanvas.y<=0){
			coords.y=5;
		}
		
		refLineStartCanvas.x=Math.min(Math.max(refLineStartCanvas.x,5),(canvas.width-5));
		refLineStartCanvas.y=Math.min(Math.max(refLineStartCanvas.y,5),(canvas.height-5));
		
		refLineEndCanvas.x=Math.min(Math.max(refLineEndCanvas.x,5),(canvas.width-5));
		refLineEndCanvas.y=Math.min(Math.max(refLineEndCanvas.y,5),(canvas.height-5));
		
        context.save();
        context.beginPath();
//      context.strokeStyle = color[Math.floor(Math.random()*4)];
		context.strokeStyle ="red";
        context.lineWidth = lineWidth;
        context.setLineDash([10, 3]);
        context.moveTo(refLineStartCanvas.x, refLineStartCanvas.y);
        context.lineTo(refLineEndCanvas.x, refLineEndCanvas.y);
        context.stroke();
        context.restore();
        
        
        											
        var toolData = cornerstoneTools.getToolState(referenceElement, 'stack');
//      console.log($(referenceElement))
        if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
            return;
        }
        var stack = toolData.data[0];
		var currentImageIdIndex=stack.currentImageIdIndex; 
//		var toolData = cornerstoneTools.getToolState(referenceElement, 'stack');
//      if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
//          return;
//      }
//      var stack = toolData.data[0];
//		var imageId=eventData.image.imageId;
//		var imageIndex=stack.imageIds.indexOf(imageId);
        
		// Draw text
		var text = `${(currentImageIdIndex+1)}`;
//		console.log(text)
		
		var coords = {
			// Translate the x/y away from the cursor
			x: refLineEndCanvas.x + 3,
		 	y: refLineEndCanvas.y - 3
		};
		
		
		
		coords.x=Math.min(Math.max(coords.x,5),(canvas.width-20));
		coords.y=Math.min(Math.max(coords.y,5),(canvas.height-20));
		
		
		
//		const textCoords = cornerstone.pixelToCanvas(referenceElement, coords);
		
//		context.font = '28';
		context.fillStyle = 'red';
		
		 //  drawTextBox(context, str, textCoords.x, textCoords.y + fontHeight + 5, color);
		cornerstoneTools.drawTextBox(context, text, coords.x, coords.y, color);
    
    
    }
	
	function convertToVector3 (arrayOrVector3) {

      if (arrayOrVector3 instanceof cornerstoneMath.Vector3) {
        return arrayOrVector3;
      }

    return new cornerstoneMath.Vector3(arrayOrVector3[0], arrayOrVector3[1], arrayOrVector3[2]);
    }
    // module/private exports
    cornerstoneTools.renderActiveReferenceLine = renderActiveReferenceLine;

})($, cornerstone,cornerstoneMath,cornerstoneTools);

(function(cornerstoneTools) {

    'use strict';

    // calculates a reference line between two planes by projecting the top left hand corner and bottom right hand corner
    // of the reference image onto the target image.  Ideally we would calculate the intersection between the planes but
    // that requires a bit more math and this works fine for most cases
    function calculateReferenceLine(targetImagePlane, referenceImagePlane) {
        var points = cornerstoneTools.planePlaneIntersection(targetImagePlane, referenceImagePlane);
        if (!points) {
            return;
        }

        return {
            start: cornerstoneTools.projectPatientPointToImagePlane(points.start, targetImagePlane),
            end: cornerstoneTools.projectPatientPointToImagePlane(points.end, targetImagePlane)
        };
    }




    
    // module/private exports
    cornerstoneTools.calculateReferenceLine = calculateReferenceLine;

})(cornerstoneTools);
