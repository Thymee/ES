function setupViewportOverlays(element, data) {
       console.log(data)
    var parent = $(element).parent();

    // Get the overlays
    var childDivs = $(parent).find('.overlay');
    var topLeft = $(childDivs[0]).find('div');
    var topRight = $(childDivs[1]).find('div');
    var bottomLeft = $(childDivs[2]).find('div');
    var bottomRight = $(childDivs[3]).find('div');

    // Set the overlay text
    $(topLeft[0]).text('patientName: '+(data.data.patientName?data.data.patientName:' '));
    $(topLeft[1]).text('patientId: '+(data.data.patientId?data.data.patientId:' '));
    $(topRight[0]).text(data.data.studyDescription?data.data.studyDescription:' ');
    $(topRight[1]).text(data.data.studyDate?data.data.studyDate:' ');
	
	// console.log(data.data.patientName)
	// console.log(data.data.patientId)
	// console.log(data.data.studyDescription)
	// console.log(data.data.studyDate)
	

    // On new image (displayed?)
    function onNewImage(e) {

        var eventData = e.detail;
        // console.log(e)
        // If we are currently playing a clip then update the FPS
        // Get the state of the 'playClip tool'
        var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');

        // If playing a clip ...
        if (playClipToolData !== undefined && playClipToolData.data.length > 0 && playClipToolData.data[0].intervalId !== undefined && eventData.frameRate !== undefined) {

            // Update FPS
            $(bottomLeft[0]).text("FPS: " + Math.round(eventData.frameRate));
            console.log('frameRate: ' + e.frameRate);

        } else {
            // Set FPS empty if not playing a clip
            if ($(bottomLeft[0]).text().length > 0) {
                $(bottomLeft[0]).text("");
            }
        }

        var toolData = cornerstoneTools.getToolState(element, 'stack');
        if(toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
            return;
        }
        var stack = toolData.data[0];

        // Update Image number overlay
        $(bottomLeft[2]).text("Image # " + (stack.currentImageIdIndex + 1) + "/" + stack.imageIds.length);
    }
    // Add a CornerstoneNewImage event listener on the 'element' (viewer) (?)
    element.addEventListener('cornerstonenewimage', onNewImage);


    // On image rendered
    function onImageRendered(e) {
        var eventData = e.detail;
        var viewport = eventData.viewport;
        // Set zoom overlay text
        $(bottomRight[0]).text("Zoom:" + viewport.scale.toFixed(2));
        // Set WW/WL overlay text
        $(bottomRight[1]).text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
        // Set render time overlay text
        $(bottomLeft[1]).text("Render Time:" + Math.round(eventData.renderTimeInMs*100)/100+ " ms");
    }
    // Add a CornerstoneImageRendered event listener on the 'element' (viewer) (?)
    element.addEventListener('cornerstoneimagerendered', onImageRendered);


}