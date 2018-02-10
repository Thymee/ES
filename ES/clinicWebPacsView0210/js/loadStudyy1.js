$(function() {
	
//var hashStudyId='1.2.826.0.1.3680043.2.461.9612260.1725514078'
	var hashStudyId="1.2.826.0.1.3680043.2.461.9642842.2844958345"//测试数据1
//	var hashStudyId = window.location.hash.split("#")[2];//真是数据1
	window.userId = window.location.hash.split("#")[1];
	var url = clinic + "/wadoOrFap/dicom/"+hashStudyId+"/";
	var videoUrl = clinicCommon + "/wadoOrFap/video/"+hashStudyId+"/";//流媒体接口
//	var videoUrl = clinicCommon+videoOfMedia+"1.2.826.0.1.3680043.2.461.9630324.878878453/"//流媒体測試接口
	var loadedPercents = [];
	
	
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
	
	
	//流媒体video-------lanjianqing
		
	function MediaPlay(){
		ajax(videoUrl).then(function(res){
		console.log(res)
		var urlArr = [];
		var durationOfVideo;
		if(res.code==200){
			if(res.data.seriesVideoList.length>0){
				res.data.seriesVideoList.forEach(function(series,i){
					var url = res.data.studyId + "/"+series.seriesInstanceUID+"/"+series.instanceVideoList[0].imageId+"/";
					urlArr.push(url)
				})
				console.log(urlArr)
				var videoList = template("videoList",urlArr);
				$(".videoContainer").append(videoList);
				$(".showVideoList").on("click",function(){
					$(".videoContainer").toggle("slow")
				});
			}else{//没有视频则隐藏导航栏
				$(".showVideoList").hide()
			}
		}
		
		//模态框弹出的时候
		$('#myModal').on('show.bs.modal', function (event) {
			var event = event||window.event;
			var partOfLink = $(event.relatedTarget).data("link");
			
			var urlOfSrc = clinicCommon+mediaOfMedia+partOfLink;
			
			 $.ajax({
			 	url:urlOfSrc,
//			 	async:false,
			 	success:function(res){
			 		durationOfVideo = res.data.videoDurationLength;
			 		console.log(durationOfVideo);			 		
			 	}
			 	
			 })
			 
			 //初始化视频
			var linkOfSrc = clinicCommon+mediaOfM3u8+partOfLink+".m3u8";
			$("source").attr("src",linkOfSrc);
			
			var player = window.player = videojs('video', {
					textTrackDisplay: false,
					posterImage: true,
					errorDisplay: false,
					controlBar: true,
			}, function() {						
					player.src({
						src:linkOfSrc,
						type:'application/x-mpegURL'
					});
					player.load(linkOfSrc);
					player.play();
					this.on("durationchange",function(){
						this.duration(durationOfVideo)
					})
				})
			
			});				
		})
	}

	var aa={
		Bv:123
		}
	//dicm
	ajax(url)
		.then(function(data) {
			console.log(aa.Bv)
			MediaPlay()//流媒体
//			console.log(data);
			// Add tab content by making a copy of the studyViewerTemplate element
			var studyViewerCopy = $("#studyViewerTemplate");
			var studyViewerRoot=$(".imageViewer")
			var studyViewerTemplate = $(".viewportWrapper");

			// studyViewerCopy.attr("id", "x" + data.patientId);
			// Make the viewer visible

			studyViewerCopy.removeClass("hidden");

			//  studyViewerCopy.removeClass('hidden');
			// Add section to the tab content
			studyViewerCopy.appendTo("#tabContent");

			var imageViewer = new ImageViewer(studyViewerRoot, studyViewerTemplate);
			imageViewer.setLayout('1x1'); // default layout

			function initViewports() {
				imageViewer.forEachElement(function(el) {
					cornerstone.enable(el);
					$(el).droppable({
						drop: function(evt, ui) {
							var fromStack = $(ui.draggable.context).data('stack'),
								toItem = $(this).data('index');
							useItemStack(toItem, fromStack);
						}
					});
				});
			}

			// setup the tool buttons
			setupButtons(".toolbar");

			// layout choose
			$('.toolbar-wrapper').find('.choose-layout li').click(function() {
				var previousUsed = [];
				imageViewer.forEachElement(function(el, vp, i) {
					
					if(!isNaN($(el).data('useStack'))) {
						previousUsed.push($(el).data('useStack'));
					}
				});

				var type = $(this).text();
				imageViewer.setLayout(type);
				initViewports();
				resizeStudyViewer();
				if(previousUsed.length > 0) {
					previousUsed = previousUsed.slice(0, imageViewer.viewports.length);
					var item = 0;
					previousUsed.forEach(function(v) {
						useItemStack(item++, v);
					});
				}

				//return false;
			});

			// Load the first series into the viewport (?)
			//var stacks = [];
			//var currentStackIndex = 0;
			var seriesIndex = 0;

			// Create a stack object for each series
			data.data.seriesList.forEach(function(series) {
				var stack = {
					seriesDescription: series.seriesDescription,
					stackId: series.seriesNumber,
					imageIds: [],
					seriesIndex: seriesIndex,
					currentImageIdIndex: 0,
					frameRate: series.frameRate
				};

				// Populate imageIds array with the imageIds from each series
				// For series with frame information, get the image url's by requesting each frame
				if(series.numberOfFrames !== undefined) {
					var numberOfFrames = series.numberOfFrames;
					for(var i = 0; i < numberOfFrames; i++) {
						var imageId = series.instanceList[0].imageId + "?frame=" + i;
						if(imageId.substr(0, 4) !== 'http') {
							imageId = "dicomweb://cornerstonetech.org/images/ClearCanvas/" + imageId;
						}
						stack.imageIds.push(imageId);
					}
					// Otherwise, get each instance url
				} else {
					series.instanceList.forEach(function(image) {
						//  var imageId = image.imageId;
						//
						//  if (image.imageId.substr(0, 4) !== 'http') {
						//      imageId = "dicomweb://cornerstonetech.org/images/ClearCanvas/" + image.imageId;
						//  }
						//  stack.imageIds.push(imageId);

//						var imageId =
//							"wadouri:" +
//							clinic.substr(5) +
//							"/dicomImage/getImage?studyId=" +
//							data.data.studyId +
//							"&seriesId=" +
//							series.seriesInstanceUID +
//							"&imageId=" +
//							image.imageId;
							
							var imageId =
							"wadouri:" +clinic.substr(5) +
							"/wadoOrFap/image/" +
							data.data.studyId +
							"/" +
							series.seriesInstanceUID +
							"/" +
							image.imageId+"/";

						stack.imageIds.push(imageId);

						var wadoURL = clinic +
							"/wadoOrFap/image/" +
							data.data.studyId +
							"/" +
							series.seriesInstanceUID +
							"/" +
							image.imageId+"/";

						key = data.data.studyId +
							"_" + series.seriesInstanceUID +
							"_" + image.imageId;

						var taskId = "cacheTask_" + image.imageId;

						var task = cornerstoneWADOImageLoader.webWorkerManager.addTask("cacheTask", {
							wadoURL: wadoURL,
							key: key,
							taskId: taskId
						}, -10);
						var promise = task.promise;
						promise.then(function(result) {
//							console.log(result.taskId + " completed");
							//stack.imageIds.push(imageId);
						})

					});
				}
				// Move to next series
				seriesIndex++;

				// Add the series stack to the stacks array
				imageViewer.stacks.push(stack);
			});

			// Resize the parent div of the viewport to fit the screen
			var imageViewerElement = $(studyViewerCopy).find('.imageViewer')[0];
			var viewportWrapper = $(imageViewerElement).find('.viewportWrapper')[0];
			var parentDiv = $(studyViewerCopy).find('.viewer')[0];

			//viewportWrapper.style.width = (parentDiv.style.width - 10) + "px";
			//viewportWrapper.style.height = (window.innerHeight - 150) + "px";

			var studyRow = $(studyViewerCopy).find('.studyRow')[0];
			var width = $(studyRow).width();

			//$(parentDiv).width(width - 170);
			//viewportWrapper.style.width = (parentDiv.style.width - 10) + "px";
			//viewportWrapper.style.height = (window.innerHeight - 150) + "px";

			// Get the viewport elements
			var element = $(studyViewerCopy).find('.viewport')[0];

			// Image enable the dicomImage element
			initViewports();
			//cornerstone.enable(element);

			// Get series list from the series thumbnails (?)
			var seriesList = $(studyViewerCopy).find('.thumbnails')[0];
			$(seriesList).html(' ');
			imageViewer.stacks.forEach(function(stack, stackIndex) {
			
			// Create series thumbnail item
			var seriesEntry = '<a class="list-group-item" + ' +
			'oncontextmenu="return false"' +
			'unselectable="on"' +
			'onselectstart="return false;"' +
			'onmousedown="return false;">' +
			'<div class="csthumbnail"' +
			'oncontextmenu="return false"' +
			'unselectable="on"' +
			'onselectstart="return false;"' +
			'onmousedown="return false;"></div>' +
			"<div class='text-center small'>" +stack.imageIds.length+
			'</div><div class="progress progress-striped active" style="margin:0;height:8px;">' +
			'<div class="loadProgress' + stackIndex + ' progress-bar progress-bar-color" role="progressbar"' +
			'aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">' +
			'<span class="sr-only"></span></div></div></a>';
			
			// Add to series list
			var seriesElement = $(seriesEntry).appendTo(seriesList);
			
			// Find thumbnail
			var thumbnail = $(seriesElement).find('div')[0];
			
			// Enable cornerstone on the thumbnail
			cornerstone.enable(thumbnail);
			
			//加载进度条
			var loadProgress = {
				"imageIds": stack.imageIds.slice(0),
			"total": stack.imageIds.length,
			"remaining": stack.imageIds.length,
			"percentLoaded": 0,
			};
			
			// Image loading events are bound to the cornerstone object, not the element
			$(cornerstone.events).on("CornerstoneImageLoadProgress", onImageLoaded);
			
			function onImageLoaded(event, args)
			{
				loadedPercents[stackIndex] = args.percentComplete + "%";
				//console.log(args.percentComplete);
				
				//var loadWidth = loadProgress["percentLoaded"] + "%";
			//console.log(stackIndex + ": " + (((loadProgress["total"] - loadProgress["remaining"]) / loadProgress["total"]) * 100))
			    $(".loadProgress" + stackIndex).css("width", loadedPercents[stackIndex]);
			    $(".loadProgress" + stackIndex).children().html(loadedPercents[stackIndex]);
			    
			    if(100 === args.percentComplete){
					$(".loadProgress"+stackIndex).parent().fadeOut(6000);
					//alert('123')
				}
			}
			
			// progress loading function
			/*function onImageLoaded(event, args) {
				var imageId = args.image.imageId;
				var imageIds = loadProgress["imageIds"];
			
			// Remove all instances, in case the stack repeats imageIds
			for(var i = imageIds.length - 1; i >= 0; i--) {
				if(imageIds[i] === imageId) {
					imageIds.splice(i, 1);
					console.log(stackIndex + ": " + imageIds.length);
				}
			}
			
			// Populate the load progress object
			loadProgress["remaining"] = imageIds.length;
			loadProgress["percentLoaded"] = parseInt(((loadProgress["total"] - loadProgress["remaining"]) / loadProgress["total"]) * 100, 10);
			
			if((loadProgress["remaining"] / loadProgress["total"]) === 0) {
			console.timeEnd("Loading");
			}
			
			// Write to a span in the DOM
			//      var currentValueSpan = document.getElementById("loadProgress");
			//      currentValueSpan.textContent = loadProgress["percentLoaded"];
			
			var loadWidth = loadProgress["percentLoaded"] + "%";
			//console.log(stackIndex + ": " + (((loadProgress["total"] - loadProgress["remaining"]) / loadProgress["total"]) * 100))
			$(".loadProgress" + stackIndex).css("width", loadWidth);
			$(".loadProgress" + stackIndex).children().textContent = loadProgress["percentLoaded"];
			
			//		if($(".loadProgress"+stackIndex).css("width") == "100%"){
			//			$(".loadProgress"+stackIndex).parent().css("display","none");
			//			alert('123')
			//		}
			}*/
			
			// Have cornerstone load the thumbnail image
			cornerstone.loadAndCacheImage(imageViewer.stacks[stack.seriesIndex].imageIds[0]).then(function(image) {
				// Make the first thumbnail active
			if(stack.seriesIndex === 0) {
				$(seriesElement).addClass('active');
			}
			$(thumbnail).find('img').css('display', 'none');
			// Display the image
			cornerstone.displayImage(thumbnail, image);
			
			//               $(thumbnail).on("CornerstoneImageRendered", function (data) {
			//               	console.log(data);
			//               });
			
			$(seriesElement).draggable({
				helper: "clone"
				});
			});
			
			// Handle thumbnail click
			$(seriesElement).on('click touchstart', function() {
				useItemStack(0, stackIndex);
			}).data('stack', stackIndex);
			
			});

			
			




			function useItemStack(item, stack) {
				var imageId = imageViewer.stacks[stack].imageIds[0],
					element = imageViewer.getElement(item);
				if($(element).data('waiting')) {
					imageViewer.viewports[item].find('.overlay-text').remove();
					$(element).data('waiting', false);
				}
				$(element).data('useStack', stack);

				displayThumbnail(seriesList, $(seriesList).find('.list-group-item')[stack], element, imageViewer.stacks[stack], function(el, stack) {
					if(!$(el).data('setup')) {
						setupViewport(el, stack, this);
						setupViewportOverlays(el, data);
						$(el).data('setup', true);
					}
				});
				/*cornerstone.loadAndCacheImage(imageId).then(function(image){
				    setupViewport(element, imageViewer.stacks[stack], image);
				    setupViewportOverlays(element, data);
				});*/
			}
			// Resize study viewer
			function resizeStudyViewer() {
	            var studyRow = $(studyViewerCopy).find('.studyContainer')[0];
	            var height = $(studyRow).height();
	            var width = $(studyRow).width();
	            console.log($(studyRow).innerWidth(),$(studyRow).outerWidth(),$(studyRow).width());
	            $(seriesList).height("100%");
	            $(parentDiv).width(width - $(studyViewerCopy).find('.thumbnailSelector:eq(0)').width());
	            $(parentDiv).css({height : '100%'});
	            $(imageViewerElement).css({height : $(parentDiv).height() - $(parentDiv).find('.text-center:eq(0)').height()});
	
	            imageViewer.forEachElement(function(el, vp) {
	                cornerstone.resize(el, true);
	
	                if ($(el).data('waiting')) {
	                    var ol = vp.find('.overlay-text');
	                    if (ol.length < 1) {
	                        ol = $('<div class="overlay overlay-text">Please drag a stack onto here to view images.</div>').appendTo(vp);
	                    }
	                    var ow = vp.width() / 2, oh = vp.height() / 2;
	                    ol.css({top : oh, left : ow - (ol.width() / 2)}); 
	                } 
	            });
	        }
			// Call resize viewer on window resize
			$(window).resize(function() {
				resizeStudyViewer();
			});
			resizeStudyViewer();
			if(imageViewer.isSingle())
				useItemStack(0, 0);

		}).then(function(){
			console.log(aa.Bv)
		})
		.catch(function(err) {
			console.log(err);
		});

	// Resize main
	function resizeMain() {
		var height = $(window).height();
		$("#main").height(height - 50);
		$("#tabContent").height(height - 50 - 24);
	}

	// Call resize main on window resize
	$(window).resize(function() {
		resizeMain();
	});
	resizeMain();

	// Prevent scrolling on iOS
	document.body.addEventListener("touchmove", function(e) {
		e.preventDefault();
	});
	

});