// var imageViewer = new ImageViewer(studyViewerCopy, studyViewerTemplate);
ImageViewer = function(viewport) {
    var self = this;

    // self.root = $(".viewer");
    // self.rootModel= $(".viewer").clone();
    self.stacks = [];
    self.viewports = [];
    self.layout = '1x1';
    self.childViewports = [];
    self.childLayout = '1x1';
    self.viewportModel = viewport;

    self.setLayout = function(layout) {
        self.layout = layout;
        // TODO: create viewports
        ab = self.getRowsCols(self.layout), a = ab[0], b = ab[1], numOfViewports = a * b,
            perWidth = 100 / b, perHeight = 100 / a; 
        $('.viewer').data('layout',self.layout.trim());

        self.viewports = [];

        var viewport=$(".imageViewer");  
        if (viewport.length == numOfViewports&&numOfViewports!=1) { //chendeping 12.27 20:17
            return;
        } else if (viewport.length < numOfViewports) {
          // console.log($(".imageViewer"))
            if (viewport.length > 0) {
				
                for (var i = 0; i <viewport.length; i++) {
//              	console.log(i);
                    var elem = $(viewport[i]).css({
                        width: perWidth + '%',
                        height: perHeight + '%'
                    });
                    self.viewports.push(elem); 

                }
            }

            // console.log(self.viewports)
            var i = viewport.length;
            while (i < numOfViewports) {

                var elem = self.viewportModel.clone().css({
                    width: perWidth + '%',
                    height: perHeight + '%'
                }).data('sericesIndex', i).data('selected', false).data('isLayout', false).addClass('imageViewer'+i);
                elem.find('.viewport').data('waiting', true).addClass('viewport'+i);

                self.viewports.push(elem);
                // console.log(self.viewports)
                i++;

            }
            // $('.viewer').html('');
            var j = 0;
            while (j < self.viewports.length) {

                var elem = self.viewports[j].show().appendTo($('.viewer'));

                j++;

            }

        } else {


            for (var i = 0; i < viewport.length; i++) {
                if (i < numOfViewports) {
                    var elem = $(viewport[i]).css({
                        width: perWidth + '%',
                        height: perHeight + '%'
                    }).show();

                    self.viewports.push(elem);
                } else {
                   viewport[i].remove();
                }

            }




        }
    }

    self.setChildLayout = function(childLayout,root) {

        self.childLayout = childLayout;
        // TODO: create viewports
        var ab = self.getRowsCols(self.childLayout),
            a = ab[0],
            b = ab[1],
            numOfChildViewports = a * b,
            perWidth = 100 / b,
            perHeight = 100 / a;
        // $('.viewer').find('.activeViewer').html('');
        // var i = 0;
        self.childViewports = [];
       
        
        var childViewport = root.find(".viewportWrapper");

        if (root.data('isLayout')) {
            childViewportGrid()
        } else {
        	
        	if(numOfChildViewports==1){
        		return;
        	}
            root.html('');
            var i = 0;
            while (i < numOfChildViewports) {

                var elem = self.viewportModel.find('.viewportWrapper').clone().css({
                    width: perWidth + '%',
                    height: perHeight + '%'
                }).appendTo(root);
                elem.find('.viewport').data('imageIndex', i).data('display', false);
                elem.parent().data('isLayout', true);

                self.childViewports.push(elem);
                // console.log(self.viewports)
                i++;
            };            
        };
		

        function childViewportGrid() {
            if (childViewport.length == numOfChildViewports) {
                return;
            } else if (childViewport.length < numOfChildViewports) {
                // console.log($(".imageViewer"))
                if (childViewport.length > 0) {

                 

                    for (var i = 0; i < childViewport.length; i++) {
                        var elem = $(childViewport[i]).css({
                            width: perWidth + '%',
                            height: perHeight + '%'
                        });
                        elem.find('.viewport').data('display', false);
                        self.childViewports.push(elem);

                    }


                }

                // console.log(self.viewports)
                var i = childViewport.length;
                while (i < numOfChildViewports) {

                    var elem = self.viewportModel.find('.viewportWrapper').clone().css({
                        width: perWidth + '%',
                        height: perHeight + '%'
                    });
                    elem.find('.viewport').data('imageIndex', i).data('display', false);
                    elem.parent().data('isLayout', true);

                    self.childViewports.push(elem);
                    // console.log(self.viewports)
                    i++;

                }
                // $('.viewer').html('');
                var j = 0;
                while (j < self.childViewports.length) {

                    var elem = self.childViewports[j].appendTo(root);

                    j++;

                }

            } else {
				if (numOfChildViewports==1) {
					
					var index=root.data('sericesIndex');
					root.html('');
					
					
						var elem = self.viewportModel.find('.viewportWrapper').clone().css({
							width: perWidth + '%',
							height: perHeight + '%'
						}).appendTo(root);
						elem.find('.viewport').addClass('viewport' + index);
						elem.parent().data('isLayout', false);
					
						self.childViewports.push(elem);
						// console.log(self.viewports)
						
					
					
					
			
					
					
					
					
					
					
					
					
					
					
					
					
					
				} else{
					for(var i = 0; i < childViewport.length; i++) {
						if(i < numOfChildViewports) {
							var elem = $(childViewport[i]).css({
								width: perWidth + '%',
								height: perHeight + '%'
							});
							elem.find('.viewport').data('display', false);
							self.childViewports.push($(childViewport[i]));
						} else {
							childViewport[i].remove();
						}
					
					}
				}

            }

        }


    }
    self.getRowsCols = function(grid) {
        var s = grid.split(/x/);
        return [parseInt(s[0]), parseInt(s[1])];
    }

    self.isSingle = function() {
        return self.layout == '1x1';
    }
    self.isChildSingle = function() {
        return self.childLayout == '1x1';
    }

    self.getElement = function(item) { 
        return self.viewports[item].find('.viewport')[0];
    }
    self.getChildElement = function(item) {
        return self.childViewports[item].find('.viewport')[0];
    }

    self.forEachElement = function(cb) {
        self.viewports.forEach(function(vp, i) {
            cb.call(self, vp.find('.viewport')[0], vp, i);
        });
    }
    self.forEachChildElement = function(cb) {
        self.childViewports.forEach(function(vp, i) {
          
            cb.call(self, vp.find('.viewport')[0], vp, i);
        });
    }
}