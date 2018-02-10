
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

        var renderer = toolData.data[0].renderer;

        // Create the canvas context and reset it to the pixel coordinate system
        var context = eventData.canvasContext.canvas.getContext('2d');
        	cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);

        // Iterate over each referenced element
        $.each(enabledElements, function(index, referenceEnabledElement) {

            // don't draw ourselves
            if (referenceEnabledElement === e.currentTarget) {
                return;
            }

            // render it
            renderer(context, eventData, e.currentTarget, referenceEnabledElement);
        }); 
    }

    // enables the reference line tool for a given element.  Note that a custom renderer
    // can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
    function enable(element, synchronizationContext, renderer) {
        renderer = renderer || cornerstoneTools.referenceLiness.renderActiveReferenceLine;

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


(function($, cornerstone,cornerstoneMath, cornerstoneTools) {

    'use strict';

    // renders the active reference line
    function renderActiveReferenceLine(context, eventData, targetElement, referenceElement) {
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

      	var referenceLine = cornerstoneTools.referenceLiness.calculateReferenceLined(targetImagePlane, referenceImagePlane);
        
        if (!referenceLine) {
            return;
        }

        var refLineStartCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.start);
        var refLineEndCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.end);

        var color = cornerstoneTools.toolColors.getActiveColor();
        var lineWidth = cornerstoneTools.toolStyle.getToolWidth();

        // draw the referenceLines
        context.setTransform(1, 0, 0, 1, 0, 0);

        context.save();
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.moveTo(refLineStartCanvas.x, refLineStartCanvas.y);
        context.lineTo(refLineEndCanvas.x, refLineEndCanvas.y);
        context.stroke();
        context.restore();
    }
	
	function convertToVector3 (arrayOrVector3) {

      if (arrayOrVector3 instanceof cornerstoneMath.Vector3) {
        return arrayOrVector3;
      }

    return new cornerstoneMath.Vector3(arrayOrVector3[0], arrayOrVector3[1], arrayOrVector3[2]);
    }
    // module/private exports
    cornerstoneTools.referenceLiness.renderActiveReferenceLine = renderActiveReferenceLine;

})($, cornerstone,cornerstoneMath,cornerstoneTools);

(function($, cornerstone, cornerstoneTools) {

    'use strict';

    // calculates a reference line between two planes by projecting the top left hand corner and bottom right hand corner
    // of the reference image onto the target image.  Ideally we would calculate the intersection between the planes but
    // that requires a bit more math and this works fine for most cases
    function calculateReferenceLined(targetImagePlane, referenceImagePlane) {
        // var points = cornerstoneTools.planePlaneIntersection(targetImagePlane, referenceImagePlane);
        // if (!points) {
        //     return;
        // }

        // return {
        //     start: cornerstoneTools.projectPatientPointToImagePlane(points.start, targetImagePlane),
        //     end: cornerstoneTools.projectPatientPointToImagePlane(points.end, targetImagePlane)
        // };

        targetImagePlane.rowCosines = convertToVector3(targetImagePlane.rowCosines);
        targetImagePlane.columnCosines = convertToVector3(targetImagePlane.columnCosines);
        targetImagePlane.imagePositionPatient = convertToVector3(targetImagePlane.imagePositionPatient);

        referenceImagePlane.rowCosines = convertToVector3( referenceImagePlane.rowCosines);
        referenceImagePlane.columnCosines = convertToVector3( referenceImagePlane.columnCosines);
        referenceImagePlane.imagePositionPatient = convertToVector3( referenceImagePlane.imagePositionPatient);

        const sourceNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
        const  targetNormal =  referenceImagePlane.rowCosines.clone().cross( referenceImagePlane.columnCosines);

        //If the planes are parallel,then calculate automaticPlanePositioning
        if (!sourceNormal || !targetNormal){
            return;
        };

        const isParallel=normalParallel(sourceNormal,targetNormal);
        if (isParallel) {
            return;
        }

        if(targetImagePlane.pixelSpacing<1e-5||targetImagePlane.columnPixelSpacing<1e-5||targetImagePlane.rowPixelSpacing<1e-5){
            return;
        }

          

        let P1,P2={x:{},y:{},z:{}},P3={x:{},y:{},z:{}},P4={x:{},y:{},z:{}};
          
        let Row= referenceImagePlane.columnPixelSpacing*referenceImagePlane.columns;
        let Col=  referenceImagePlane.rowPixelSpacing*referenceImagePlane.rows;

        P1=referenceImagePlane.imagePositionPatient;
        P2.x = P1.x + referenceImagePlane.rowCosines .x * Row;
        P2.y = P1.y + referenceImagePlane.rowCosines .y * Row;
        P2.z = P1.z + referenceImagePlane.rowCosines .z * Row;
        P3.x = P2.x + referenceImagePlane.columnCosines.x * Col;
        P3.y = P2.y + referenceImagePlane.columnCosines.y * Col;
        P3.z = P2.z + referenceImagePlane.columnCosines.z * Col;
        P4.x = P1.x + referenceImagePlane.columnCosines.x * Col;
        P4.y = P1.y + referenceImagePlane.columnCosines.y * Col;
        P4.z = P1.z + referenceImagePlane.columnCosines.z * Col;


        let dv1= sourceNormal.x*(P1.x-targetImagePlane.imagePositionPatient.x)+sourceNormal.y*(P1.y-targetImagePlane.imagePositionPatient.y)+sourceNormal.z*(P1.z-targetImagePlane.imagePositionPatient.z);
        let dv2= sourceNormal.x*(P2.x-targetImagePlane.imagePositionPatient.x)+sourceNormal.y*(P2.y-targetImagePlane.imagePositionPatient.y)+sourceNormal.z*(P2.z-targetImagePlane.imagePositionPatient.z);
        let dv3= sourceNormal.x*(P3.x-targetImagePlane.imagePositionPatient.x)+sourceNormal.y*(P3.y-targetImagePlane.imagePositionPatient.y)+sourceNormal.z*(P3.z-targetImagePlane.imagePositionPatient.z);
        let dv4= sourceNormal.x*(P4.x-targetImagePlane.imagePositionPatient.x)+sourceNormal.y*(P4.y-targetImagePlane.imagePositionPatient.y)+sourceNormal.z*(P4.z-targetImagePlane.imagePositionPatient.z);
     
        if((dv1<0&&dv2<0&&dv3<0&&dv4<0)||(dv1>0&&dv2>0&&dv3>0&&dv4>0)){
            return;
        }

        let C12={x:{},y:{},z:{}},C23={x:{},y:{},z:{}},C34={x:{},y:{},z:{}},C41={x:{},y:{},z:{}};
        let ptStart,ptEnd,ptPoint={x:{},y:{}},crossPoints=[];
          
        // function pointToImagePlane(point,plane){
        // }
        //计算线段P1P2与已知平面的交点C12
        if(dv1*dv2<0){
            let ratio12 =Math.abs(dv1/(dv1-dv2));//dv1、dv2异号，其绝对值之和等于其差(dv1-dv2)的绝对值
            C12.x = P1.x + (P2.x-P1.x)*ratio12;
            C12.y = P1.y + (P2.y-P1.y)*ratio12;
            C12.z = P1.z + (P2.z-P1.z)*ratio12;
            crossPoint(C12);
        }

        //计算线段P2P3与已知平面的交点C23
        if(dv2*dv3<0){
            let ratio23 = Math.abs(dv2/(dv2-dv3));//dv2、dv3异号，其绝对值之和等于其差(dv2-dv3)的绝对值
            C23.x = P2.x + (P3.x-P2.x)*ratio23;
            C23.y = P2.y + (P3.y-P2.y)*ratio23;
            C23.z = P2.z + (P3.z-P2.z)*ratio23;
            crossPoint(C23);
        }
        //计算线段P3P4与已知平面的交点C34
        if(dv3*dv4<0){
            let ratio34 =Math.abs(dv3/(dv3-dv4));//dv3、dv4异号，其绝对值之和等于其差(dv3-dv4)的绝对值
            C34.x = P3.x + (P4.x-P3.x)*ratio34;
            C34.y = P3.y + (P4.y-P3.y)*ratio34;
            C34.z = P3.z + (P4.z-P3.z)*ratio34;
            crossPoint(C34);
        }
        //计算线段P4P1与已知平面的交点C41
        if(dv4*dv1<0){
            let ratio41 =Math.abs(dv4/(dv4-dv1));//dv1、dv2异号，其绝对值之和等于其差(dv1-dv2)的绝对值
            C41.x = P4.x + (P1.x-P4.x)*ratio41;
            C41.y = P4.y + (P1.y-P4.y)*ratio41;
            C41.z = P4.z + (P1.z-P4.z)*ratio41;
            crossPoint(C41);
        }


        function crossPoint(cv){
            let Dx,Dy,Dz,xSize,ySize;
            Dx = cv.x - targetImagePlane.imagePositionPatient.x;
            Dy = cv.y - targetImagePlane.imagePositionPatient.y;
            Dz = cv.z - targetImagePlane.imagePositionPatient.z;
            xSize = Dx * targetImagePlane.rowCosines.x + Dy *  targetImagePlane.rowCosines.y + Dz *  targetImagePlane.rowCosines.z;
            ySize = Dx * targetImagePlane.columnCosines.x + Dy * targetImagePlane.columnCosines.y + Dz * targetImagePlane.columnCosines.z;
            ptPoint.x = xSize / targetImagePlane.columnPixelSpacing + 0.5;
            ptPoint.y = ySize / targetImagePlane.rowPixelSpacing + 0.5;
            crossPoints.push(ptPoint);
        }

        ptStart=crossPoints[0];
        ptEnd=crossPoints[1];
     
        if((ptStart.x<0&&ptEnd.x<0)||(ptStart.x>targetImagePlane.columns&&ptEnd.x>targetImagePlane.columns)||(ptStart.y<0 && ptEnd.y<0)||(ptStart.y>targetImagePlane.rows && ptEnd.y>targetImagePlane.rows)){

            return;
        }

        if(ptEnd.x<0){
              ptEnd.y=ptEnd.y+(ptStart.y-ptEnd.y)*(0-ptEnd.x)/(ptStart.x-ptEnd.x);
              ptEnd.x=0;
        }else{
              if(ptEnd.x>targetImagePlane.columns){
                ptEnd.y=ptEnd.y+(ptStart.y-ptEnd.y)*(targetImagePlane.columns-ptEnd.x)/(ptStart.x-ptEnd.x);
                ptEnd.x=targetImagePlane.columns;
              }
        }
          
        if(ptEnd.y<0){
            ptEnd.x=ptEnd.x+(ptStart.x-ptEnd.x)*(0-ptEnd.y)/(ptStart.y-ptEnd.y);
            ptEnd.y=0;
        }else{
            if(ptEnd.y>targetImagePlane.rows){
              ptEnd.x=ptEnd.x+(ptStart.x-ptEnd.x)*(targetImagePlane.rows-ptEnd.y)/(ptStart.y-ptEnd.y);
              ptEnd.x=targetImagePlane.rows;
            }
        }


        if(ptStart.x<0){
            ptStart.y=ptStart.y+(ptEnd.y-ptStart.y)*(0-ptStart.x)/(ptEnd.x-ptStart.x);
            ptStart.x=0;
        }else{
            if(ptStart.x>targetImagePlane.columns){
              ptStart.y=ptStart.y+(ptEnd.y-ptStart.y)*(targetImagePlane.columns-ptStart.x)/(ptEnd.x-ptStart.x);
              ptStart.x=targetImagePlane.columns;
            }
        }
        
        if(ptStart.y<0){
          ptStart.x=ptStart.x+(ptEnd.x-ptStart.x)*(0-ptStart.y)/(ptEnd.y-ptStart.y);
          ptStart.y=0;
        }else{
          if(ptStart.y>targetImagePlane.rows){
            ptStart.x=ptStart.x+(ptEnd.x-ptStart.x)*(targetImagePlane.rows-ptStart.y)/(ptEnd.y-ptStart.y);
            ptStart.x=targetImagePlane.rows;
          }
        }
		
		if (ptStart.x<ptEnd.x) {
			return {
	          start:ptStart,
	          end: ptEnd
        	}
		} else{
			return {
	          start:ptEnd,
	          end: ptStart
        	}
		}
		
        
    }

    function convertToVector3 (arrayOrVector3) {

      if (arrayOrVector3 instanceof cornerstoneMath.Vector3) {
        return arrayOrVector3;
      }

    return new cornerstoneMath.Vector3(arrayOrVector3[0], arrayOrVector3[1], arrayOrVector3[2]);
    }


    function normalParallel(sourceNormal,targetNormal){
      const normalSqrt=Math.sqrt((sourceNormal.x*sourceNormal.x+sourceNormal.y*sourceNormal.y+sourceNormal.z*sourceNormal.z)*(targetNormal.x*targetNormal.x+targetNormal.y*targetNormal.y+targetNormal.z*targetNormal.z));
      if(normalSqrt<1e-5){
        return normalSqrt<1e-5;
      }
      const cosA=Math.abs(sourceNormal.x*targetNormal.x+sourceNormal.y*targetNormal.y+sourceNormal.z*targetNormal.z)/normalSqrt;
      return cosA>0.99;
      
    }


    
    // module/private exports
    cornerstoneTools.referenceLiness.calculateReferenceLined = calculateReferenceLined;

})($, cornerstone, cornerstoneTools);

