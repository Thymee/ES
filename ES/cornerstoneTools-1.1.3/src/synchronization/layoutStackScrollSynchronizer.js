import external from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import loadHandlerManager from '../stateManagement/loadHandlerManager.js';

// This function causes any scrolling actions within the stack to propagate to
// All of the other viewports that are synced
export default function (synchronizer, sourceElement, targetElement, eventData) {
  // If the target and source are the same, stop
  if (sourceElement === targetElement) {
    return;
  }

  // If there is no event, or direction is 0, stop
  if (!eventData || !eventData.direction) {
    return;
  }
  const $ = external.$;
  const cornerstone = external.cornerstone;
  // Get the stack of the target viewport
  const stackToolDataSource = getToolState(targetElement, 'stack');
  const stackData = stackToolDataSource.data[0];

  // THY--const sourceImageIndex=$(sourceElement).data('layoutIndex');
  const targetImageIndex = $(targetElement).data('layoutIndex');

  // Get the new index for the stack
  const newImageIdIndex = targetImageIndex + eventData.direction;

  const parent = $(targetElement).parent();

  // Get the overlays
  const childDivs = $(parent).find('.overlay');
  const topLeft = $(childDivs[0]).find('div');
  const topRight = $(childDivs[1]).find('div');
  const bottomLeft = $(childDivs[2]).find('div');
  const bottomRight = $(childDivs[3]).find('div');

  if (newImageIdIndex > stackData.imageIds.length - 1) {
    $(targetElement).data('layoutIndex', newImageIdIndex);
    $(targetElement).hide();

    if (childDivs.text().length > 0) {
      topLeft.hide();
      topRight.hide();
      bottomLeft.hide();
      bottomRight.hide();
    }

    // TargetElement.style.visibility="hidden";
    let ol = $(targetElement).parent().find('.overlay-text');

    if (ol.length < 1) {
      ol = $('<div class="overlay overlay-text">NO IMAGE</div>').appendTo($(targetElement).parent()).show();
    }
    const ow = $(targetElement).parent().width() / 2,
      oh = $(targetElement).parent().height() / 2;

    ol.css({ top: oh,
      left: ow - ol.width() / 2 });

    return;
  }

  $(targetElement).show();
  $(targetElement).parent().find('.overlay-text').remove();
  topLeft.show();
  topRight.show();
  bottomLeft.show();
  bottomRight.show();
  // If the index has not changed, stop here
  if (targetImageIndex === newImageIdIndex) {
    return;
  }

  if(!stackData.imageIds[newImageIdIndex]) {
    return;
  }

  const startLoadingHandler = loadHandlerManager.getStartLoadHandler();
  const endLoadingHandler = loadHandlerManager.getEndLoadHandler();
  const errorLoadingHandler = loadHandlerManager.getErrorLoadingHandler();

  if (startLoadingHandler) {
    startLoadingHandler(targetElement);
  }

  let loader;

  if (stackData.preventCache === true) {
    loader = cornerstone.loadImage(stackData.imageIds[newImageIdIndex]);
  } else {
    loader = cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]);
  }

  loader.then(function (image) {
    const viewport = cornerstone.getViewport(targetElement);

    $(targetElement).data('layoutIndex', newImageIdIndex);
    synchronizer.displayImage(targetElement, image, viewport);
    if (endLoadingHandler) {
      endLoadingHandler(targetElement, image);
    }
  }, function (error) {
    const imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(targetElement, imageId, error);
    }
  });
}
