import external from '../externalModules.js';
import { getToolState } from '../stateManagement/toolState.js';
import loadHandlerManager from '../stateManagement/loadHandlerManager.js';
import calculateAutomaticPlanePositioning from '../referenceLines/calculateAutomaticPlanePositioning.js';

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

  if (stackToolDataSource === undefined || stackToolDataSource.data === undefined || stackToolDataSource.data.length === 0 || stackData.imageIds.length <= 1) {
    return;
  }

  const sourceImage = cornerstone.getEnabledElement(sourceElement).image;
  const targetImage = cornerstone.getEnabledElement(targetElement).image;

  // Make sure the images are actually loaded for the target and reference
  if (!sourceImage || !targetImage) {
    return;
  }

  const sourceImagePlane = cornerstone.metaData.get('imagePlaneModule', sourceImage.imageId);
  const targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);

  // Make sure the target and reference actually have image plane metadata
  if (!sourceImagePlane || !targetImagePlane || !sourceImagePlane.pixelSpacing || !targetImagePlane.pixelSpacing || !sourceImagePlane.rows || !sourceImagePlane.columns || !sourceImagePlane.rowCosines || !sourceImagePlane.columnCosines || !sourceImagePlane.imagePositionPatient || !targetImagePlane.rowCosines || !targetImagePlane.columnCosines || !targetImagePlane.imagePositionPatient) {
    return;
  }

  // The image planes must be in the same frame of reference
  if (sourceImagePlane.frameOfReferenceUID !== targetImagePlane.frameOfReferenceUID) {
    return;
  }

  const automaticPlanePositioning = calculateAutomaticPlanePositioning(stackData, sourceImagePlane, targetImagePlane);

  if (automaticPlanePositioning === null || automaticPlanePositioning === undefined) {
    cornerstone.updateImage(targetElement);

    return;
  }

  // Get the new index for the stack
  let newImageIdIndex = automaticPlanePositioning;

  // Ensure the index does not exceed the bounds of the stack
  newImageIdIndex = Math.min(Math.max(newImageIdIndex, 0), stackData.imageIds.length - 1);

  // If the index has not changed, stop here
  if (stackData.currentImageIdIndex === newImageIdIndex) {
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

    stackData.currentImageIdIndex = newImageIdIndex;
    synchronizer.displayImage(targetElement, image, viewport);
    $(targetElement).data('autoPlanePosition', true);
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