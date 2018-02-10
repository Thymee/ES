import external from '../externalModules.js';
import { addToolState, getToolState } from '../stateManagement/toolState.js';
import renderActiveReferenceLine from './renderActiveReferenceLine.js';

const toolType = 'automaticPlanePositioning';

function onImageRendered (e) {
  const $ = external.$;
  const eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  const toolData = getToolState(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  // Get the enabled elements associated with this synchronization context and draw them
  const syncContext = toolData.data[0].synchronizationContext;
  const enabledElements = syncContext.getSourceElements();

  const renderer = toolData.data[0].renderer;

  // Create the canvas context and reset it to the pixel coordinate system
  const canvas = eventData.canvasContext.canvas;

  external.cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, canvas.getContext('2d'));

  // Iterate over each referenced element
  enabledElements.forEach((referenceEnabledElement) => {
    // Don't draw ourselves
    if (referenceEnabledElement === e.currentTarget) {
      return;
    }

    //  Thy--自动平面定位元素 恢复默认
    if ($(referenceEnabledElement).data('autoPlanePosition')) {
      $(referenceEnabledElement).data('autoPlanePosition', false);

      return;
    }

    if ($(referenceEnabledElement).data('mouseWheel')) {
      // Render it
      renderer(canvas, eventData, e.currentTarget, referenceEnabledElement);
      $(referenceEnabledElement).data('mouseWheel', false);
    }
  });
}

// Enables the reference line tool for a given element.  Note that a custom renderer
// Can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
function enable (element, synchronizationContext, renderer) {
  renderer = renderer || renderActiveReferenceLine;

  addToolState(element, toolType, {
    synchronizationContext,
    renderer
  });

  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  element.addEventListener('cornerstoneimagerendered', onImageRendered);
  external.cornerstone.updateImage(element);
}

// Disables the reference line tool for the given element
function disable (element) {
  element.removeEventListener('cornerstoneimagerendered', onImageRendered);
  external.cornerstone.updateImage(element);
}

// Module/private exports
const tool = {
  enable,
  disable
};

export default tool;
