import external from '../externalModules.js';
import layoutScrollToIndex from './layoutScrollToIndex.js';
import { getToolState } from '../stateManagement/toolState.js';


export default function (element, images, loop) {
  loop = loop || false;
  const $ = external.$;
  const toolData = getToolState(element, 'stack');

  if (!toolData || !toolData.data || !toolData.data.length) {
    return;
  }

  const stackData = toolData.data[0];

  let newImageIdIndex;

  if ($(element).data('layoutIndex') === $(element).data('imageIndex') && images < 0) {
    newImageIdIndex = $(element).data('layoutIndex');
  } else {
    newImageIdIndex = $(element).data('layoutIndex') + images;
  }

  if (loop) {
    const nbImages = stackData.imageIds.length;

    newImageIdIndex %= nbImages;
  } else {
    newImageIdIndex = Math.min(stackData.imageIds.length - 1, newImageIdIndex);
    newImageIdIndex = Math.max(0, newImageIdIndex);
  }

  layoutScrollToIndex(element, newImageIdIndex);
}
