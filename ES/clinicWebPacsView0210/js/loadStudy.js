$(function() {
	
	var hashStudyId = window.location.hash.split("#")[1];//真实数据
	var userId = window.location.hash.split("#")[2];//获取用户id 用于获取和保存用户习惯
//	var hashStudyId = undefined;
//	var userId = null;
//	var hashStudyId="1.2.826.0.1.3680043.2.461.9642842.2844958345";//测试数据  发布上线需注释                           
//	var hashStudyId="1.2.826.0.1.3680043.2.461.9683900.3637697857";//测试数据  发布上线需注释
//	var hashStudyId="1.2.826.0.1.3680043.2.461.9710284.1952453891"
//  var hashStudyId="1.2.826.0.1.3680043.2.461.9671669.424701540";
//	var hashStudyId="1.2.826.0.1.3680043.2.461.9761308.4217410888";
//	var hashStudyId="1.2.826.0.1.3680043.2.461.9710285.1476043248";
var hashStudyId="1.2.826.0.1.3680043.2.461.9704076.3682707669";
// var hashStudyId="1.2.826.0.1.3680043.2.461.9790385.3658665124";


//	var videoUrl = clinic+videoOfMedia+"1.2.826.0.1.3680043.2.461.9673658.3692062221/";//流媒体測試接口 发布上线需注释
//	var hashStudyId = "1.2.826.0.1.3680043.2.461.9671554.2306841018";//没有数据的测试
	
	panZoomSynchronizer = new cornerstoneTools.Synchronizer("CornerstoneImageRendered", cornerstoneTools.panZoomSynchronizer);
	wcWwSynchronizer = new cornerstoneTools.Synchronizer("CornerstoneImageRendered", cornerstoneTools.wwwcSynchronizer);
	rotationSynchronizer = new cornerstoneTools.Synchronizer("CornerstoneImageRendered", cornerstoneTools.rotationSynchronizer);
	referenceLineSynchronizer = new cornerstoneTools.Synchronizer("CornerstoneNewImage", cornerstoneTools.updateImageSynchronizer);
	synchronizer = new cornerstoneTools.Synchronizer("CornerstoneNewImage", cornerstoneTools.automaticPlanePositioningSynchronizer);


	var url = clinic +wadoOrFapForDicom+ "?studyId="+hashStudyId;//影像接口
	var videoUrl = clinic + videoOfMedia + hashStudyId +"/";//流媒体接口
	var loadedPercents = [];
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            // Add custom headers here (e.g. auth tokens)
            //xhr.setRequestHeader('APIKEY', 'my auth token');
        }
    });
	//	获取用户习惯
	var urlOfGetHabits = clinic + getUserHabits;
	$.get(urlOfGetHabits, {
		"userIdty": userId,
	}, function(result) {
//		console.log(result)
		if(result.data == null || result.data.viewFields == null) {
			useData = { //初始化用户习惯
				"playSpeed": "默认[10]"
			};
			var regex=/\[(\d+)\]/.exec(useData.playSpeed);
			var speed = regex[1];
			$(".toolbar-item .playSpeed").attr("data-play", speed)
		} else { //获取用户习惯
			useData = JSON.parse(result.data.viewFields);
//			var regex="\\[(.+?)\\]";
//			var arr=useData.playSpeed.match(regex);
			var regex=/\[(\d+)\]/.exec(useData.playSpeed);
			var speed = regex[1];
			$(".toolbar-item .playSpeed").attr("data-play",speed);
			$(".toolbar-item .playSpeed").text(useData.playSpeed);
		};
	});
		//获取用户权利级别  判断是否有保存影像的权限
	if(window.sessionStorage.getItem("user-info")!=undefined){
		 var userinfo = JSON.parse(window.sessionStorage.getItem("user-info"));
		 var power = userinfo.power;
//		 power="01234"; 
		 if(power.indexOf("4")==-1){
		 	$(".downloadOfLi").hide();//影藏保存按钮 
		 }
	}
	
	
	
	
	//流媒体video-------lanjianqing
		
	function MediaPlay(){
		ajax(videoUrl).then(function(res){
//		 console.log(res)
		var urlArr = [];
		var durationOfVideo;
		if(res.code==200){
			console.log(res.data.seriesVideoList.length)
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
		}else{//没有视频则隐藏导航栏
			$(".showVideoList").hide()
		}
		
		//模态框弹出的时候
		$('#myModal').on('show.bs.modal', function (event) {
			var event = event||window.event;
			var partOfLink = $(event.relatedTarget).data("link");
			
			var urlOfSrc = clinic+mediaOfMedia+partOfLink;
			
			 $.ajax({
			 	url:urlOfSrc,
//			 	async:false,
			 	success:function(res){
			 		durationOfVideo = Math.floor(res.data.videoDurationLength);
			 		console.log(durationOfVideo);			 		
			 	}
			 	
			 })
		
			 //初始化视频
			var linkOfSrc = clinic+mediaOfM3u8+partOfLink+".m3u8";
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
	//下载视频影像 
	$('.videoContainer').on('mouseover','.list-group-item',function(){ 
		if(window.sessionStorage.getItem("user-info") != undefined) {
			var userinfo = JSON.parse(window.sessionStorage.getItem("user-info"));
			var power = userinfo.power;
//			power="01234"; 
			if(power.indexOf("4") == -1) { 
				$(".downLoadSeries").hide(); 
			}else{ 
				var downLoad = $(this).find('.downLoadSeries');
				downLoad.css({
					"top": "0px"
				});
			}
		}
		
	})
	$('.videoContainer').on('mouseout','.list-group-item',function(){ 
		var downLoad=$(this).find('.downLoadSeries'); 
		downLoad.css({"top":"-22px"});
	})
	$(".videoContainer").on('click','.downLoadSeries-down',function(event){
		event.stopPropagation();  
		var event = event||window.event;                       
	 	var partOfLink = $(this).data("link");  
	 	var n=partOfLink.indexOf('/',partOfLink.indexOf('/')+1);
	 	partOfLink=partOfLink.substring(0,n+1); 
	 	var url=clinic+mediaOfDownLoad+partOfLink;
	 	window.location.href=url; 
	});        


    //加载视图模板
    var viewportTemplate; // the viewport template
    loadTemplate("templates/viewport.html", function (element) {
        viewportTemplate = element;
    });

    
    //dicm
    ajax(url).then(function (data) {
    	console.log(data);
        if(data.code==200){
        	if(data.data.seriesList[0].modality=="CT"||data.data.seriesList[0].modality=="MR"){
        		$(".ctMrBtn").css("display","block")
        	};
            MediaPlay();//流媒体
            // Add tab content by making a copy of the studyViewerTemplate element
            var studyViewerCopy = $("#studyViewerTemplate");

            var imageViewer = new ImageViewer(viewportTemplate);
//          console.log(imageViewer)
            imageViewer.setLayout('1x1'); // default layout

            function initViewports() {
                imageViewer.forEachElement(function (el) {

                    cornerstone.enable(el);
                    $(el).droppable({
                        drop: function (evt, ui) {
//                      	alert('232')
                            var fromStack = $(ui.draggable).data('stack'),
                            toItem = $(this).parents(".imageViewer").data('sericesIndex');
                            useItemStack(toItem, fromStack);
//                          $(".toolbar-button i").removeClass("blue");//移除全部蓝色
//                          disableAllTools();
							
							keepFunction();//保留当前功能
                        }
                    });
                });
            };
            
    
            // setup the tool buttons
            setupButtons(".toolbar");

            //点击序列图标的下拉菜单
            $('.changeViewport li').click(function (e) {
            	
            	var e = e || window.event;
				e.stopPropagation();
            	
            	//判断当前的class和序列图标的class是否一致   12.25lanjq
            	var className = $(this).children("i").attr("class");
                var parentClassName = $("#toolViewport").attr("class");
                
//              console.log("上",parentClassName)
//              console.log("下",className)
                
                if(className!=parentClassName){//不一致则把序列全屏初始化 12.25lanjq
                	$('.full-screen').attr("class","tool-screen-full full-screen");
                	$('.full-screen').siblings().text('序列放大');
                	hideElement=false;
                };
            	
            	//切换文字
            	selectText($(this));
            	$('#toolViewport').removeClass("blue");//移除blue类名  拖拽的时候防止模拟点击之后出现下拉菜单
            	//其他功能
                $(this).parent().hide();
                var type = $(this).text();
                
                var ab = imageViewer.getRowsCols(type), a = ab[0], b = ab[1], numOfViewports = a * b;
                var viewport=$(".imageViewer");
                if(viewport.length==numOfViewports){
                	return;
                }
                
                
                imageViewer.setLayout(type);
                initViewports();
                resizeStudyViewer();

                activeWrapper();//hover的时候增加边框样式
                return false;
            });

            var hideElement=false;
            
            //点击序列放大图标   序列放大
            $('.full-screen').parent().click(function () {
            	$(".sub-toolbar").hide(); //所有的下拉菜单
				$(".sub-toolbar-play").hide(); //播放的下拉菜单
				$(".sub-toolbar-download").hide(); //保存的下拉菜单
				
                var activeRoot = selectElement();
                if(!activeRoot){
                    return;
                }
                // var useStack = activeRoot.data('useStack');
                // var viewerStack = imageViewer.stacks[useStack];
                
                //只有在这两个选项之下才能切换hideElement  
                if($("#toolViewport").hasClass("tool-layout-1x2")||$("#toolViewport").hasClass("tool-layout-2x2")){
					//切换图标
                	$(this).children(".full-screen").toggleClass("tool-screen-shrink");
                	//切换文字
//              	if($(this).children(".full-screen").hasClass("tool-screen-shrink")){               		
//              		$(this).children("span").text("收起序列");              		
//              	}else{
//              		$(this).children("span").text("序列全屏");
//              	}
				    
                	
                	console.log($('.viewer').data('layout'))
	                var nLayout=$('.viewer').data('layout');
	                var ab = imageViewer.getRowsCols(nLayout), a = ab[0], b = ab[1],
	                perWidth = 100 / b, perHeight = 100 / a;
	                if(hideElement){
	                    activeRoot.css({
	                        width: perWidth + '%',
	                        height: perHeight + '%'
	                    }).siblings().show();
	
	                    hideElement=false;
	                    forEachViewport(function (element) {
	                        // cornerstone.enable(element);
	                        cornerstone.resize(element, true);
	                        cornerstone.fitToWindow(element);
	                    });
	        			
	        			$(this).children("span").text("序列放大");   
	                }else{

	                    activeRoot.css({
	                                width: 100 + '%',
	                                height: 100 + '%'
	                            }).siblings().hide();
	
	                            forEachViewport(function (element) {
	                                // cornerstone.enable(element);
	                                cornerstone.resize(element, true);
	                                cornerstone.fitToWindow(element);
	                                var targetViewport = cornerstone.getViewport(element);
//									targetViewport.scale=1;
									console.log(targetViewport)
	                            });
	                    
	                    hideElement=true;  
	                    $(this).children("span").text("收起序列");
	                   
	                };	                
                	
                }

				console.log(hideElement)
				resizeStudyViewer();                              
                return false;
            });

			//点击布局之后的下拉菜单
            $('.changeLayout li').click(function (e) {
            	
				selectText($(this));//切换文字
				$("#toolLayout").removeClass("blue");//移除blue类名  拖拽的时候防止模拟点击之后出现下拉菜单
				var e = e || window.event;
				e.stopPropagation();
		     
                $(this).parent().hide();
                // console.log($('.imageViewer').data())
//              console.log($('.activeViewer'))

                //获取单个选中元素  如果没有 默认选择第一个序列第一个 
                var activeRoot = selectElement();
                                
                if(!activeRoot){
                    return;
                }
                
                
                var activeRootElement= activeRoot.find('.viewport')[0];
                
                referenceLineSynchronizer.remove(activeRootElement);
                synchronizer.remove(activeRootElement);
                var type = $(this).text();
				var ab = imageViewer.getRowsCols(type ), a = ab[0], b = ab[1], numOfChildViewports = a * b;
                imageViewer.setChildLayout(type, activeRoot);
                
//              给选中序列的第一个元素增加蓝色边框
				activeRoot.find('.viewportWrapper').eq(0).addClass("activeViewer");				
				
                    
                imageViewer.forEachChildElement(function (el,vp,i) {
                	if (!$(el).data('display')) {
                        var ol = vp.find('.overlay-text');
                        if (ol.length < 1) {

                            ol = $('<div class="overlay overlay-text">NO IMAGE</div>').appendTo(vp);
                        }
                        var ow = vp.width() / 2,
                            oh = vp.height() / 2;
                        ol.css({
                            top: oh,
                            left: ow - (ol.width() / 2)
                        });
                        
                    }
                    
                    
                    if(numOfChildViewports==1){  
                    	displayLayoutImage(el,i,imageViewer, function (el, stack) {
		                        setupViewport(el, stack, this);
		                        setupViewportOverlays(el,data);
		                });
                    	
		                $(el).droppable({
		                	drop: function(evt, ui) {
		                		//                      	alert('232')
		                		var fromStack = $(ui.draggable).data('stack'),
		                			toItem = $(this).parents(".imageViewer").data('sericesIndex');
		                		useItemStack(toItem, fromStack);
		                		//                          $(".toolbar-button i").removeClass("blue");//移除全部蓝色
		                		//                          disableAllTools();
		                		
		                		keepFunction(); //保留当前功能
		                	}
		                });

	            		referenceLineSynchronizer.add(el);
	            		synchronizer.add(el);
                	}else{
                		displayLayoutImage(el,i,imageViewer, function (el, stack) {
                	
		                    if (!$(el).data('setup')) {
		                        setupLayoutViewport(el, stack, this);
		                        setupViewportOverlays(el,data);
		                        $(el).data('setup', true);
		                    }
		                    
		                });
                		if ($(el).hasClass("ui-droppable")) {
							$(el).droppable( "destroy" );
			
						}
                	}
    
                });
				activeWrapper();//hover的时候增加边框样式
//				keepFunction();//保留当前功能
//				判断此时是否全部同步
				if ($("#tool-sync").data("sync") && $("#tool-sync").data("sync") == "allSync") { 
			    	$('.imageViewer').unbind('mouseenter').unbind('mouseleave');//解绑hover
			        forEachViewport(function(element) {
			            panZoomSynchronizer.add(element);
//			            wcWwSynchronizer.add(element);
//			            rotationSynchronizer.add(element);
			        });
			    };
				keepFunction();//保留当前功能
			    
                return false;
            });

//			完成图像加载之后
			activeWrapper();//hover增加边框样式

            var seriesIndex = 0;

            // Create a stack object for each series
//          console.log(data.data.seriesList);

			
            data.data.seriesList.forEach(function (series,i) {

                var stack = {
                    seriesDescription: series.seriesDescription,
                    stackId: series.seriesNumber,
                    imageIds: [],
                    seriesIndex: seriesIndex,
                    currentImageIdIndex: 0,
                    frameRate: series.frameRate,
                    seriesId: series.seriesInstanceUID
                }; 
                // Populate imageIds array with the imageIds from each series
                // For series with frame information, get the image url's by requesting each frame
                if (series.numberOfFrames !== undefined) {
                    var numberOfFrames = series.numberOfFrames;
                    for (var i = 0; i < numberOfFrames; i++) {
                        var imageId = series.instanceList[0].imageId + "?frame=" + i;
                        if (imageId.substr(0, 4) !== 'http') {
                            imageId = "dicomweb://cornerstonetech.org/images/ClearCanvas/" + imageId;
                        }
                        stack.imageIds.push(imageId);
                    }
                    // Otherwise, get each instance url
                } else {
                    series.instanceList.forEach(function (image) {
                        var imageId =
                            "wadouri:" + clinic.substr(5) +
                            "/wadoOrFap/image/" +
                            data.data.studyId +
                            "/" +
                            series.seriesInstanceUID +
                            "/" +
                            image.imageId + "/";
						
                        stack.imageIds.push(imageId);
						
						//开启缓存
//                      var wadoURL = clinic +
//                          "/wadoOrFap/image/" +
//                          data.data.studyId +
//                          "/" +
//                          series.seriesInstanceUID +
//                          "/" +
//                          image.imageId + "/";
//						
//                      key = data.data.studyId +
//                          "_" + series.seriesInstanceUID +
//                          "_" + image.imageId;
//
//                      var taskId = "cacheTask_" + image.imageId;
//
//                      var task = cornerstoneWADOImageLoader.webWorkerManager.addTask("cacheTask", {
//                          wadoURL: wadoURL,
//                          key: key,
//                          taskId: taskId
//                      }, -10);
//                      var promise = task.promise;
//                      promise.then(function (result) {
//                          //console.log(result.taskId + " completed");
//                          //stack.imageIds.push(imageId);
//                      })

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

            var studyRow = $(studyViewerCopy).find('.studyRow')[0];
            var width = $(studyRow).width();


            // Get the viewport elements
            var element = $(studyViewerCopy).find('.viewport')[0];

            // Image enable the dicomImage element
            initViewports();
            //cornerstone.enable(element);

            // Get series list from the series thumbnails (?)
            var seriesList = $(studyViewerCopy).find('.thumbnails')[0];
            $(seriesList).html(' ');
            imageViewer.stacks.forEach(function (stack, stackIndex) { 
            	            	
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
                    '<div class="text-center small">'+ stack.imageIds.length +
                    '</div><div class="progress progress-striped active" style="margin:0;height:8px;">' +
                    '<div class="loadProgress' + stackIndex + ' progress-bar progress-bar-color" role="progressbar"' +
                    'aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">' +
                    '<span class="sr-only"></span></div></div>'+
                    '<div class="downLoadSeries" ><div class="downLoadSeries-down text-center"  data-series-id="'+stack.seriesId+'" >下载序列视频</div></div>'+
                    '</a>';
//				<div class="downLoadSeries"><a href="" '+
//                  'class="downLoadSeries-a" data-series-id="'+stack.seriesId+'">下载序列影像</a>'+
//                  '</div>f
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
                cornerstone.events.addEventListener("CornerstoneImageLoadProgress", onImageLoaded);

                function onImageLoaded(event) {
                    var progressDetail=event.detail;
                    loadedPercents[stackIndex] = progressDetail.percentComplete + "%";
                    //console.log(args.percentComplete);

                    //var loadWidth = loadProgress["percentLoaded"] + "%";
                    //console.log(stackIndex + ": " + (((loadProgress["total"] - loadProgress["remaining"]) / loadProgress["total"]) * 100))
                    $(".loadProgress" + stackIndex).css("width", loadedPercents[stackIndex]);
                    $(".loadProgress" + stackIndex).children().html(loadedPercents[stackIndex]);

                    if (100 === progressDetail.percentComplete) {
                        $(".loadProgress" + stackIndex).parent().fadeOut(6000);
//                        alert('123')
                    }
                }
 
				
                // Have cornerstone load the thumbnail image
                cornerstone.loadAndCacheImage(imageViewer.stacks[stack.seriesIndex].imageIds[0]).then(function (image) {
                    // Make the first thumbnail active
                    if (stack.seriesIndex === 0) {
                        $(seriesElement).addClass('active');
                    }
                    $(thumbnail).find('img').css('display', 'none');
                    // Display the image
                    cornerstone.displayImage(thumbnail, image);

                    $(seriesElement).draggable({
                        helper: "clone"
                    });
                });

				
                // Handle thumbnail click
                $(seriesElement).on('click', function () {
                    $.each(imageViewer.viewports, function (i, vp) {
                        var el = vp.find('.viewport')[0];
                        if ($(el).data('waiting')) {
                            useItemStack(i, stackIndex);
                            return false;
                        };
						keepFunction();//保留当前功能  
                    });
                }).data('stack', stackIndex);

            });

					
            function useItemStack(item, stack) {
                var imageId = imageViewer.stacks[stack].imageIds[0],
                    element = imageViewer.getElement(item);
                if ($(element).data('waiting')) {
                    imageViewer.viewports[item].find('.overlay-text').remove();
                    $(element).data('waiting', false);
                }
                $(element).parents('.imageViewer').data('useStack', stack);

                displayThumbnail(seriesList, $(seriesList).find('.list-group-item')[stack], element, imageViewer.stacks[stack], function (el, stack) {
                    if (!$(el).data('setup')) {
                        setupViewport(el, stack, this);
                        setupViewportOverlays(el,data);
//                      el.addEventListener('cornerstonenewimage', onNewImage);
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
                var studyRow = $('.studyContainer')[0];
                var height = $(studyRow).height();
                var width = $(studyRow).width();
                // console.log($('.thumbnailSelector:eq(0)').innerWidth(), $('.thumbnailSelector:eq(0)').outerWidth(),$('.thumbnailSelector:eq(0)').width());
                $(seriesList).height("100%");
                // $(parentDiv).width(width - $('.thumbnailSelector:eq(0)').width()-2);
                $(parentDiv).css({
                    height: '100%'
                });
                // $(imageViewerElement).css({
                // 	height: $(parentDiv).height() - $(parentDiv).find('.text-center:eq(0)').height()
                // });

                forEachViewport(function (element) {
                    // cornerstone.enable(element);
                    cornerstone.resize(element, true);
                    cornerstone.fitToWindow(element);
                });


                imageViewer.forEachElement(function (el, vp) {
                    // cornerstone.resize(el, true);
                    // console.log(el)
                    // console.log(vp);
                    if ($(el).data('waiting')) {
                        var ol = vp.find('.overlay-text');
                        if (ol.length < 1) {

                            ol = $('<div class="overlay overlay-text">Please drag a stack onto here to view images.</div>').appendTo(vp);
                        }
                        var ow = vp.width() / 2,
                            oh = vp.height() / 2;
                        ol.css({
                            top: oh,
                            left: ow - (ol.width() / 2)
                        });
                    }
                });
                
                imageViewer.forEachChildElement(function (el,vp,i) {
         
                    // console.log(el)
                    // console.log(vp);
                    if (!$(el).data('display')) {
                        var ol = vp.find('.overlay-text');
                        if (ol.length < 1) {

                            ol = $('<div class="overlay overlay-text">NO IMAGE</div>').appendTo(vp);
                        }
                        var ow = vp.width() / 2,
                            oh = vp.height() / 2;
                        ol.css({
                            top: oh,
                            left: ow - (ol.width() / 2)
                        });
                        
                    }
                })
                // imageViewer.forEachChildElement(function(el, vp) {
                //     cornerstone.resize(el, true);
                // })

            }
            // Call resize viewer on window resize
            $(window).resize(function () {
                resizeStudyViewer();
            });
            resizeStudyViewer();
//          alert(imageViewer.isSingle())
//          alert(imageViewer.isChildSingle());
				
//			var length = data.data.seriesList.length;	
//			for(var i = length-1;i>=0;i--){
//				displayThumbnail(seriesList, $(seriesList).find('.list-group-item')[i], imageViewer.getElement(0), imageViewer.stacks[i], function (el, i) {
////                  if (!$(el).data('setup')) {
//                      setupViewport(el, i, this);
//                      setupViewportOverlays(el,data);
////                      el.addEventListener('cornerstonenewimage', onNewImage);
//                      $(el).data('setup', true);
////                  }
//              });
//			};
            if (imageViewer.isSingle()){
            	useItemStack(0, 0);
            };
            
		 }else if(data.code==400){
		 	alert(data.msg);
		 }
    })
    .catch(function (err) {
        console.log(err);
    });

    // Resize main
    function resizeMain() {
        var height = $(window).height();
        $("#main").height(height - 50);
        $("#tabContent").height(height - 50 - 24);
    }

    // Call resize main on window resize
    $(window).resize(function () {
        resizeMain();
    });
    resizeMain();

    // Prevent scrolling on iOS
    document.body.addEventListener("touchmove", function (e) {
        e.preventDefault();
    });

});