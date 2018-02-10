import external from '../externalModules.js';
import { addToolState, getToolState } from '../stateManagement/toolState.js';
import renderActiveReferenceLine from './renderActiveReferenceLine.js';

const toolType = 'referenceLines';

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


  if ($(e.currentTarget).data('mouseWheel')) { // Thy--如果当前目标元素是鼠标滚动的元素，直接返回
    return;
  }
  // Iterate over each referenced element
  enabledElements.forEach((referenceEnabledElement) => {

    // Don't draw ourselves
    if (referenceEnabledElement === e.currentTarget) {
      return;
    }

    // Render it
    if ($(referenceEnabledElement).data('mouseWheel')) { // Thy--当前目标元素和滚动元素画线
      renderer(canvas, eventData, e.currentTarget, referenceEnabledElement);
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
const tools = {
  enable,
  disable
};

export default tools;
