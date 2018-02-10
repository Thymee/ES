import external from '../externalModules.js';

// This function causes the target image to be drawn immediately
export default function (synchronizer, sourceElement, targetElement) {
  const $ = external.$;

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }

  external.cornerstone.updateImage(targetElement);
  if ($(targetElement).data('mouseWheel')) {
    // Thy--Restore the default state no-mouseWheel
    $(targetElement).data('mouseWheel', false);
  }
}
