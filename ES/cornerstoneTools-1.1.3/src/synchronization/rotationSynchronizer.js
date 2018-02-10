import external from '../externalModules.js';

// This function synchronizes the target zoom and pan to match the source
export default function (synchronizer, sourceElement, targetElement) {
  const cornerstone = external.cornerstone;

  // Ignore the case where the source and target are the same enabled element
  if (targetElement === sourceElement) {
    return;
  }
  // Get the source and target viewports
  const sourceViewport = cornerstone.getViewport(sourceElement);
  const targetViewport = cornerstone.getViewport(targetElement);

  //    Lanjq 12.26
  if (targetViewport === undefined) {
    return;
  }

  // Do nothing if the ww/wc already match
  if (targetViewport.rotation === sourceViewport.rotation) {
    return;
  }

  // Rotation are different, sync them
  // TargetViewport.voi.windowWidth = sourceViewport.voi.windowWidth;
  // TargetViewport.voi.windowCenter = sourceViewport.voi.windowCenter;
  targetViewport.rotation = sourceViewport.rotation;
  synchronizer.setViewport(targetElement, targetViewport);
}
