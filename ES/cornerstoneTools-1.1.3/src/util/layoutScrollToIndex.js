import external from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import requestPoolManager from '../requestPool/requestPoolManager.js';
import loadHandlerManager from '../stateManagement/loadHandlerManager.js';
import { layoutStackScroll } from '../stackTools/layoutStackScroll.js';
import triggerEvent from '../util/triggerEvent.js';
import Synchronizer from '../synchronization/Synchronizer.js';
import layoutStackScrollSynchronizer from '../synchronization/layoutStackScrollSynchronizer.js';

export default function (element, newImageIdIndex) {
  const $ = external.$;
  const toolData = getToolState(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  const cornerstone = external.cornerstone;
  // If we have more than one stack, check if we have a stack renderer defined
  let stackRenderer;

  if (toolData.data.length > 1) {
    const stackRendererData = getToolState(element, 'stackRenderer');

    if (stackRendererData && stackRendererData.data && stackRendererData.data.length) {
      stackRenderer = stackRendererData.data[0];
    }
  }

  const stackData = toolData.data[0];
  const layoutIndex = $(element).data('layoutIndex');

  const startLoadingHandler = loadHandlerManager.getStartLoadHandler();
  const endLoadingHandler = loadHandlerManager.getEndLoadHandler();
  const errorLoadingHandler = loadHandlerManager.getErrorLoadingHandler();
  const stackscrollSynchronizer = new Synchronizer('CornerstoneStackScroll', layoutStackScrollSynchronizer);

  function doneCallback (image) {
    if ($(element).data('layoutIndex') !== newImageIdIndex) {
      return;
    }

    // Check if the element is still enabled in Cornerstone,
    // If an error is thrown, stop here.
    try {
      // TODO: Add 'isElementEnabled' to Cornerstone?
      cornerstone.getEnabledElement(element);
    } catch(error) {
      return;
    }

    if (stackRenderer) {
      $(element).data('layoutIndex', newImageIdIndex);
      stackRenderer.render(element, toolData.data);
    } else {
      cornerstone.displayImage(element, image);
    }

    if (endLoadingHandler) {
      endLoadingHandler(element, image);
    }
  }

  function failCallback (error) {
    const imageId = stackData.imageIds[newImageIdIndex];

    if (errorLoadingHandler) {
      errorLoadingHandler(element, imageId, error);
    }
  }

  if (newImageIdIndex === layoutIndex) {
    return;
  }

  if (startLoadingHandler) {
    startLoadingHandler(element);
  }

  const eventData = {
    // ..newImageIdIndex,
    direction: newImageIdIndex - layoutIndex
  };

  $(element).data('layoutIndex', newImageIdIndex);

  newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), stackData.imageIds.length - 1);
  const newImageId = stackData.imageIds[newImageIdIndex];

  $(element).parents('.imageViewer').find('.viewport').each(function (index, element) {
    stackscrollSynchronizer.add(element);
  });

  // Retry image loading in cases where previous image promise
  // Was rejected, if the option is set
  const config = layoutStackScroll.getConfiguration();

  if (config && config.retryLoadOnScroll === true) {
    const newImagePromise = cornerstone.imageCache.getImagePromise(newImageId);

    if (newImagePromise && newImagePromise.state() === 'rejected') {
      cornerstone.imageCache.removeImagePromise(newImageId);
    }
  }

  // Convert the preventCache value in stack data to a boolean
  const preventCache = Boolean(stackData.preventCache);

  let imagePromise;

  if (preventCache) {
    imagePromise = cornerstone.loadImage(newImageId);
  } else {
    imagePromise = cornerstone.loadAndCacheImage(newImageId);
  }

  imagePromise.then(doneCallback, failCallback);
  // Make sure we kick off any changed download request pools
  requestPoolManager.startGrabbing();

  triggerEvent(element, 'CornerstoneStackScroll', eventData);
}
