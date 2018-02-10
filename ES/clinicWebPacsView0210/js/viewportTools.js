

//html模版加载函数
function loadTemplate(url, callback) {
    $.ajax({
        url: url,
        async : false, //设置同步操作
        success:function(data){
            var parsed = $.parseHTML(data);
            $.each(parsed, function(index, ele) {
                if(ele.nodeName === 'DIV')
                {
                    var element = $(ele);
                    callback(element);
                }
            });
        },
        error:function(er){
            console.log(er);
        }
    });

}

//封装ajax
	function ajax(url) {
		return new Promise(function(resolve, reject) {
			var ajaxSetting = {
				url: url,
				success: function(response) {
					resolve(response);
				},
				error: function() {
					reject("请求失败");
				}
			};
			$.ajax(ajaxSetting);
		});
	};




//循环每一个viewport元素 (每一个canvas都是viewport的子元素)
function forEachViewport(callback) {
    var elements = $('.viewport');
    $.each(elements, function (index, value) {
        var element = value;
        try {
            callback(element);
        }
        catch (e) {

        }
    });
}


//获取当前选中的序列    如果没有 默认选择第一个序列
function selectElement() {
    if ($('.activeViewer').length > 0) {
        var activeRoot = $('.activeViewer').parent();
    }else{
        var activeRoot = $('.imageViewer:first');
    }
    
    var avtiveElement = activeRoot.find(".viewport").get(0);
    
    if ($(avtiveElement).data('waiting')) {
        return false;
    }
    return activeRoot;
}

//获取单个选中元素  如果没有 默认选择第一个序列第一个 元素
function selectCurrentElement() {
    if ($('.activeViewer').length > 0) {
        var activeElement= $('.activeViewer').children(".viewport").get(0);
    }else{
    	var activeElement= $('.imageViewer:first').find(".viewport").get(0);
    };
    return activeElement;
}


//显示布局图片

function displayLayoutImage(element, index, imageViewer, loaded) {

	var useStack = $(element).parents('.imageViewer').data('useStack');
	var viewerStack = imageViewer.stacks[useStack];

	// Get the state of the stack tool
	//      var stackState = cornerstoneTools.getToolState(element, 'stack');
	//      const stackStateData = stackState.data[0];
	//      console.log(stack)

	//	    if (stackState === undefined || stackState.data === undefined || stackState.data.length === 0 ) {
	//	        return;
	//	    }

	cornerstone.enable(element);
	cornerstone.resize(element, true);
	var enabledImage = cornerstone.getEnabledElement(element);

	if(enabledImage.image) {
		// Stop clip from if playing on element
		cornerstoneTools.stopClip(element);
		// Disable stack scrolling
		cornerstoneTools.stackScroll.disable(element);
		// Enable stackScroll on selected series
		cornerstoneTools.stackScroll.enable(element);

		var configuration = {
			testPointers: function(eventData) {
				return(eventData.numPointers >= 3);
			}
		};
		cornerstoneTools.panMultiTouch.setConfiguration(configuration);

	}
//	var newImageIdIndex = index + viewerStack.currentImageIdIndex;

	$(element).data('layoutIndex', index);

	if(viewerStack.imageIds[index]) {
		// Load the first image of the selected series stack
		cornerstone.loadAndCacheImage(viewerStack.imageIds[index]).then(function(image) {

			if(loaded) {
				loaded.call(image, element, viewerStack);
			}

			if(!$(element).data('display')) {
				imageViewer.childViewports[index].find('.overlay-text').remove();
				$(element).data('display', true);
			}

			//            var stackState = cornerstoneTools.getToolState(element, 'stack');
			//		        if(stackState){
			////		        stackState.data[0] = stack;
			//		        stackState.data[0].layoutImageIdIndex =newImageIdIndex ;
			//		         
			//      		}
			//		        console.log(stackState)
			//              stackState.data[0] = stack;
			//              stackState.data[0].currentImageIdIndex = i;

			// Get the default viewport
			var defViewport = cornerstone.getDefaultViewport(element, image);
			// Get the current series stack index
			// Display the image
			cornerstone.displayImage(element, image, defViewport);
			// Fit the image to the viewport window
			cornerstone.fitToWindow(element);

			// Prefetch the remaining images in the stack (?)
			cornerstoneTools.stackPrefetch.enable(element);

			// Play clip if stack is a movie (has framerate)
			if(viewerStack.frameRate !== undefined) {
				cornerstoneTools.playClip(element, viewerStack.frameRate);
			}

		});
		//			$(element).data('display', true);
	} else {

		$(element).hide();
	}

};


//获取激活的视图
function activeEachViewport(root, callback) {
    var elements = root.find('.viewport');
    $.each(elements, function (index, value) {
        var element = value;
        try {
            callback(index, element);
        }
        catch (e) {

        }
    });
}


//保留当前功能函数封装
function keepFunction(){
//	console.log($('.blue'))
	if($('.blue').length>0){
		
		var csLength = $(".blue").attr("class").length;
		var className =$(".blue").attr("class").substring(0,csLength-5);//"tool-zoom"
		console.log(className);
		var classNameOfParent = $(".blue").parent().attr("class");
		if(className=="tool-zoom"||className=="tool-move"||className=="tool-rotate"||className=="tool-adjustment"){//如果当前是缩放 移动 旋转 调窗
			setTimeout(function(){
				$(".blue").parent().trigger('click');
			},100)
		};
		if(classNameOfParent=='toolbar-button markList'){//如果当前测量工具
			setTimeout(function(){
				$(".blue").parent().siblings("ul").find("."+className).trigger('click')
			},100)
		};
		if(classNameOfParent=='toolbar-button magnifierList'){//如果当前是放大镜
			var scale = $("#magnifier").data("scale");
			disableAllTools();
			setTimeout(function(){
				forEachViewport(function(element) {
					var config = cornerstoneTools.magnify.getConfiguration();
					config.magnificationLevel = parseFloat(scale);
					config.magnifySize = 100;
					cornerstoneTools.magnify.activate(element, 1);
				});
			},100)
			
		};
	};
	
	if($('.CTMRblue').length>0){
		//如果当前是定位线和自动平面定位
		var csLength_CTMR = $(".CTMRblue").attr("class").length;
		var className_CTMR =$(".CTMRblue").attr("class").substring(0,csLength_CTMR-9);//"tool-zoom"
//		console.log(className_CTMR);
		
		if(className_CTMR=="tool-position"){//如果当前是
			disableAllTools();
			setTimeout(function(){
				$(".CTMRblue").parent().trigger('click');
			},100)
		};
		if(className_CTMR=="tool-location"){//如果当前是
			disableAllTools();
			setTimeout(function(){
				$(".CTMRblue").parent().trigger('click');
			},100)
		};
	}
	
	
}



//切换文本函数
function selectText(el,synchronizer){
    var iLi = el.children("i");
    var sLi=el.children('span');
    var iDiv =el.parent().siblings(".toolbar-button").children('i');
    var sDiv=el.parent().siblings(".toolbar-button").children('span');
    var iliClass = $(iLi).attr("class");
    var sliText=$(sLi).text();
    var iDivClass = $(iDiv).attr("class");
    var sDivText=$(sDiv).text();
   
    var iliClassReg = new RegExp(iliClass);
    var sliTextReg=new RegExp(sliText)
    
    if(!iliClassReg.test(iDivClass)){
        if(iDiv.hasClass('blue')){
           iDivClass=iDivClass.replace("blue","");
        };
        iliClass = iliClass+" blue";
        $(iDiv).addClass(iliClass).removeClass(iDivClass);
        $(sDiv).text('').text(sliText);
    }else{
        if(!iDiv.hasClass('blue')){
            $(iDiv).addClass("blue");
        }
        if(!sliTextReg.test(sDivText)){
            $(sDiv).text('').text(sliText);;
        }
    }

    //点击同步 选择操作  序列
    if(iDiv.hasClass('blue')&&iDiv.hasClass('tool-allSync')){
    	disableAllTools();
        $(sDiv).data('sync',"allSync");
		$('.imageViewer').unbind('mouseenter').unbind('mouseleave');//解绑hover
        forEachViewport(function(element) {
            synchronizer.add(element);
        });
        
    }else if(iDiv.hasClass('blue')&&iDiv.hasClass('tool-seriesSync')){
    	disableAllTools();
        $(sDiv).data('sync',"seriesSync");
		forEachViewport(function(element){
       		synchronizer.remove(element);
    	}); 
        $('.imageViewer').hover( function(event) {
	    	$(this).find(".viewport").each(function(i,element){
        		synchronizer.add(element);
       		 });
		},function(){
			$(this).find(".viewport").each(function(i,element){
        		synchronizer.remove(element);
       		 });
		});
        
    }   
    
}



//鼠标hover之后的效果  边框颜色改变

function activeWrapper(){
	$('.viewportWrapper').hover( function(event) {
		$(this).addClass("activeWrapper")
	},function(){
		$(this).removeClass("activeWrapper")
	});
}


//点击之后 添加蓝色边框函数
function activeViewer(el){
//	console.log(el)
    $('.viewportWrapper').removeClass("activeViewer");
    $('.overlay').css('color', '#8f97a0');
    el.parents(".viewportWrapper").addClass("activeViewer")
    $('.viewportWrapper').parent().data('selected', false);
    el.parents(".imageViewer").data('selected', true);
    el.nextAll('.overlay').css('color', '#3c8fed');//字体变蓝
}


//序列同步||全部同步
function sync(syncTool){

    forEachViewport(function(element){
        syncTool.remove(element);
    }); 
    if ($("#tool-sync").data("sync") && $("#tool-sync").data("sync") == "allSync") { 
    	
    	$('.imageViewer').unbind('mouseenter').unbind('mouseleave');//解绑hover
        forEachViewport(function(element) {
            syncTool.add(element);
        });
    } else if ($("#tool-sync").data("sync") && $("#tool-sync").data("sync") == "seriesSync") {
       	
	    $('.imageViewer').hover( function(event) {
	    	$(this).find(".viewport").each(function(i,element){
        		syncTool.add(element);
       		 });
		},function(){
			$(this).find(".viewport").each(function(i,element){
        		syncTool.remove(element);
       		 });
		});  		
    } else { 
    	
    	$('.imageViewer').unbind('mouseenter').unbind('mouseleave');//解绑hover
    }

}

//设置布局Overlay函数
function setupViewportOverlays(element,data) {
//     console.log(data)
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
	//
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
//          console.log('frameRate: ' + e.frameRate);

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
		var imageId=eventData.image.imageId;
		var imageIndex=stack.imageIds.indexOf(imageId);
//		var imageIndex = $(eventData.element).data('layoutIndex');
 		// Update Image number overlay
		$(bottomLeft[2]).text("Image # " + (imageIndex + 1) + "/" + stack.imageIds.length);

    }
    // Add a CornerstoneNewImage event listener on the 'element' (viewer) (?)
    element.addEventListener('cornerstonenewimage', onNewImage);


    // On image rendered
    function onImageRendered(e) {
        var eventData = e.detail;
		var viewport = eventData.viewport;
		var imageData=eventData.image.data;
		
//		eventData.image.data.string("x00080060")
		
		
//		console.log(unescape(eventData.image.data.string("x00080060")) )
//		image.data.uint16('x00280102')
//		console.log(Array.from(imageData.string('x00100010')))
//		console.log(imageData.uint16('x00100010'))
		
		// Set the overlay text
//		$(topLeft[0]).text('patientName: ' + (imageData.string("x00100010") ? imageData.string("x00100010") : ' '));
//		$(topLeft[1]).text('patientId: ' + (imageData.string("x00100020") ? imageData.string("x00100020") : ' '));
//		$(topRight[0]).text(imageData.string("x00080080") ? imageData.string("x00080080") : ' ');
//		$(topRight[1]).text(imageData.string("x00080020") ? imageData.string("x00080020") : ' ');
		// Set zoom overlay text
		$(bottomRight[0]).text("Zoom:" + viewport.scale.toFixed(2));
		// Set WW/WL overlay text
		$(bottomRight[1]).text("WW/WL:" + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
		// Set render time overlay text
		$(bottomLeft[1]).text("Render Time:" + Math.round(eventData.renderTimeInMs * 100) / 100 + " ms");
    }
    // Add a CornerstoneImageRendered event listener on the 'element' (viewer) (?)
    element.addEventListener('cornerstoneimagerendered', onImageRendered);


}

////设置布局功能函数

function setupLayoutViewport(element, stack, image) {
	// Display the image on the viewer element
	cornerstone.displayImage(element, image);

	// Activate mouse clicks, mouse wheel and touch
	cornerstoneTools.mouseInput.enable(element);
	cornerstoneTools.mouseWheelInput.enable(element);
	//  cornerstoneTools.touchInput.enable(element);

	// Enable all tools we want to use with this element
	cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
	cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
	cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
	cornerstoneTools.probe.enable(element);
	cornerstoneTools.length.enable(element);
	cornerstoneTools.ellipticalRoi.enable(element);
	cornerstoneTools.rectangleRoi.enable(element);
	cornerstoneTools.arrowAnnotate.enable(element);
	cornerstoneTools.arrowAnnotateTouch.enable(element);
	//  cornerstoneTools.wwwcTouchDrag.activate(element);
	//  cornerstoneTools.zoomTouchPinch.activate(element);
	cornerstoneTools.magnify.enable(element);
	//  cornerstoneTools.magnifyTouchDrag.enable(element);
	cornerstoneTools.rotate.activate(element);
	//  cornerstoneTools.rotateTouchDrag.activate(element);
	//  cornerstoneTools.panMultiTouch.activate(element);

	cornerstoneTools.addStackStateManager(element, ['linkedStacks']);
	cornerstoneTools.addToolState(element, 'stack', stack);
	//  cornerstoneTools.stackScrollWheel.activate(element);
	cornerstoneTools.layoutStackScrollWheel.activate(element);
	cornerstoneTools.stackPrefetch.enable(element);

};
////layoutStackScrollWheel函数
//(function($, cornerstone, cornerstoneTools) {
//	'use strict';
//
//	const toolType = 'layoutStackScroll';
//
//	function mouseDownCallback(e, eventData) {
//		const element = eventData.element;
//		const options = cornerstoneTools.getToolOptions(toolType, element);
//
//		if(cornerstoneTools.isMouseButtonEnabled(eventData.which, options.mouseButtonMask)) {
//			options.deltaY = 0;
//
//			cornerstoneTools.setToolOptions(toolType, element, options);
//
//			element.addEventListener(EVENTS.MOUSE_DRAG, dragCallback);
//			element.addEventListener(EVENTS.MOUSE_UP, mouseUpCallback);
//			element.addEventListener(EVENTS.MOUSE_CLICK, mouseUpCallback);
//			e.stopImmediatePropagation();
//
//			return false;
//		}
//	}
//
//	function mouseWheelCallback(e, eventData) {
//
//		const images = -eventData.direction;
//
//		const config = cornerstoneTools.layoutStackScroll.getConfiguration();
//
//		let loop = false;
//
//		if(config && config.loop) {
//			loop = config.loop;
//		}
//
//		layoutScroll(eventData.element, images, loop);
//	}
//
//	function dragCallback(e,eventData) {
//		const element = eventData.element;
//
//		const toolData = cornerstoneTools.getToolState(element, 'stack');
//
//		if(!toolData || !toolData.data || !toolData.data.length) {
//			return;
//		}
//
//		const stackData = toolData.data[0];
//
//		const config = cornerstoneTools.layoutStackScroll.getConfiguration();
//
//		// The Math.max here makes it easier to mouseDrag-scroll small or really large image stacks
//		let pixelsPerImage = Math.max(2, element.offsetHeight / Math.max(stackData.imageIds.length, 8));
//
//		if(config && config.stackScrollSpeed) {
//			pixelsPerImage = config.stackScrollSpeed;
//		}
//
//		e.data.deltaY = e.data.deltaY || 0;
//		e.data.deltaY += eventData.deltaPoints.page.y;
//		if(Math.abs(e.data.deltaY) >= pixelsPerImage) {
//			const imageDelta = e.data.deltaY / pixelsPerImage;
//			const imageIdIndexOffset = Math.round(imageDelta);
//			const imageDeltaMod = e.data.deltaY % pixelsPerImage;
//		
//			e.data.deltaY = imageDeltaMod;
//			layoutScroll(element, imageIdIndexOffset);
//		}
//		
//		return false; // False = causes jquery to preventDefault() and stopPropagation() this event
//	}
//
//	function layoutScroll(element, images, loop = false) {
//
//		const toolData = cornerstoneTools.getToolState(element, 'stack');
//
//		if(!toolData || !toolData.data || !toolData.data.length) {
//			return;
//		}
//
//		const stackData = toolData.data[0];
//		let newImageIdIndex;
//		if($(element).data('layoutIndex')==$(element).data('imageIndex')&&images<0){
//			newImageIdIndex=$(element).data('layoutIndex');
//		}else{
//			newImageIdIndex = $(element).data('layoutIndex') + images;
//		}
//		
//
//		if(loop) {
//			const nbImages = stackData.imageIds.length;
//
//			newImageIdIndex %= nbImages;
//		} else {
//			newImageIdIndex = Math.min(stackData.imageIds.length - 1, newImageIdIndex);
//			newImageIdIndex = Math.max(0, newImageIdIndex);
//		}
//
//		layoutScrollToIndex(element, newImageIdIndex);
//	}
//
//	function layoutScrollToIndex(element, newImageIdIndex) {
//		const toolData = cornerstoneTools.getToolState(element, 'stack');
//
//		if(!toolData || !toolData.data || !toolData.data.length) {
//			return;
//		}
//
//		// If we have more than one stack, check if we have a stack renderer defined
//		let stackRenderer;
//
//		if(toolData.data.length > 1) {
//			const stackRendererData = cornerstoneTools.getToolState(element, 'stackRenderer');
//
//			if(stackRendererData && stackRendererData.data && stackRendererData.data.length) {
//				stackRenderer = stackRendererData.data[0];
//			}
//		}
//
//		const stackData = toolData.data[0];
//		var layoutIndex = $(element).data('layoutIndex');
////		// Allow for negative indexing
////		if(newImageIdIndex < 0) {
////			newImageIdIndex += stackData.imageIds.length;
////		}
//
//		const startLoadingHandler = cornerstoneTools.loadHandlerManager.getStartLoadHandler();
//		const endLoadingHandler = cornerstoneTools.loadHandlerManager.getEndLoadHandler();
//		const errorLoadingHandler = cornerstoneTools.loadHandlerManager.getErrorLoadingHandler();
//		var stackscrollSynchronizer = new cornerstoneTools.Synchronizer("cornerstonestackscroll", cornerstoneTools.layoutStackScrollSynchronizer);
//
//		function doneCallback(image) {
////			alert('123')
//			if($(element).data('layoutIndex') !== newImageIdIndex) {
//				return;
//			}
//
//			// Check if the element is still enabled in Cornerstone,
//			// If an error is thrown, stop here.
//			try {
//				// TODO: Add 'isElementEnabled' to Cornerstone?
//				cornerstone.getEnabledElement(element);
//			} catch(error) {
//				return;
//			}
//
//			if(stackRenderer) {
////				stackRenderer.currentImageIdIndex = newImageIdIndex;
//				$(element).data('layoutIndex',newLayoutIndex);
//				stackRenderer.render(element, toolData.data);
//			} else {
//				cornerstone.displayImage(element, image);
//			}
//
//			if(endLoadingHandler) {
//				endLoadingHandler(element, image);
//			}
//
//		}
//
//		function failCallback(error) {
//			const imageId = stackData.imageIds[newImageIdIndex];
//
//			if(errorLoadingHandler) {
//				errorLoadingHandler(element, imageId, error);
//			}
//		}
//
//		if(newImageIdIndex === layoutIndex) {
//			return;
//		}
//
//		if(startLoadingHandler) {
//			startLoadingHandler(element);
//		}
//		
////		alert($(element).data('imageIndex'))
//		
//		
//		
//		const eventData = {
////			newImageIdIndex: newImageIdIndex,
//			direction: newImageIdIndex - layoutIndex
//		};
//
//		
////		var newLayoutIndex=layoutIndex + eventData.direction;
//		
////		if(newImageIdIndex>stackData.imageIds.length - 1){
////			newLayoutIndex=stackData.imageIds.length - 1;
////		}
////		if(newLayoutIndex<0){
////			newLayoutIndex=0;
////		}
//		$(element).data('layoutIndex',newImageIdIndex);
////		stackData.currentImageIdIndex = newImageIdIndex;
// 		newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), stackData.imageIds.length - 1);
//		const newImageId = stackData.imageIds[newImageIdIndex];
//		
////		$('.viewport').each(function(index, element) {
////
////			stackscrollSynchronizer.remove(element);
////		})
//		$(element).parents('.imageViewer').find('.viewport').each(function(index, element) {
////			console.info(element)
//			stackscrollSynchronizer.add(element);
//		})
//
//		// Retry image loading in cases where previous image promise
//		// Was rejected, if the option is set
//		/*
//
//		  Const config = stackScroll.getConfiguration();
//
//		  TODO: Revisit this. It appears that Core's imageCache is not
//		  keeping rejected promises anywhere, so we have no way to know
//		  if something was previously rejected.
//
//		  if (config && config.retryLoadOnScroll === true) {
//		  }
//		*/
//
//		// Convert the preventCache value in stack data to a boolean
//		const preventCache = Boolean(stackData.preventCache);
//
//		let imagePromise;
//
//		if(preventCache) {
//			imagePromise = cornerstone.loadImage(newImageId);
//		} else {
//			imagePromise = cornerstone.loadAndCacheImage(newImageId);
//		}
//
//		imagePromise.then(doneCallback, failCallback);
//		// Make sure we kick off any changed download request pools
//		cornerstoneTools.requestPoolManager.startGrabbing();
////		alert('345')   
//		//	console.log(cornerstoneTools.EVENTS)
//
//		cornerstoneTools.triggerEvent(element, 'cornerstonestackscroll', eventData);
//
//
//	};
//
//	//var stackscrollSynchronizer = new cornerstoneTools.Synchronizer("cornerstonestackscroll", cornerstoneTools.layoutStackScrollSynchronizer);
//
//	// Module/private exports
//	cornerstoneTools.layoutStackScroll = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);
//	cornerstoneTools.layoutStackScrollWheel = cornerstoneTools.mouseWheelTool(mouseWheelCallback);
//
//	const options = {
//		eventData: {
//			deltaY: 0
//		}
//	};
//	cornerstoneTools.layoutStackScrollTouchDrag = cornerstoneTools.touchDragTool(dragCallback, options);
//
//	function multiTouchDragCallback(e,eventData) {
//		const config = cornerstoneTools.layoutStackScrollMultiTouch.getConfiguration();
//
//		if(config && config.testPointers(eventData)) {
//			dragCallback(e,eventData);
//		}
//	}
//
//	const configuration = {
//		testPointers(eventData) {
//			return(eventData.numPointers >= 3);
//		}
//	};
//
//	cornerstoneTools.layoutStackScrollMultiTouch = cornerstoneTools.multiTouchDragTool(multiTouchDragCallback, options);
//	cornerstoneTools.layoutStackScrollMultiTouch.setConfiguration(configuration);
//
//})($, cornerstone, cornerstoneTools);
//
//
