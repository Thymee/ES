import external from '../externalModules.js';
import convertToVector3 from '../util/convertToVector3.js';

// Calculates a reference line between two planes by projecting the top left hand corner and bottom right hand corner
// Of the reference image onto the target image.  Ideally we would calculate the intersection between the planes but
// That requires a bit more math and this works fine for most cases


export default function (stack, sourceImagePlane, targetImagePlane) {
  const cornerstone = external.cornerstone;

  sourceImagePlane.rowCosines = convertToVector3(sourceImagePlane.rowCosines);
  sourceImagePlane.columnCosines = convertToVector3(sourceImagePlane.columnCosines);
  sourceImagePlane.imagePositionPatient = convertToVector3(sourceImagePlane.imagePositionPatient);

  targetImagePlane.rowCosines = convertToVector3(targetImagePlane.rowCosines);
  targetImagePlane.columnCosines = convertToVector3(targetImagePlane.columnCosines);
  targetImagePlane.imagePositionPatient = convertToVector3(targetImagePlane.imagePositionPatient);

  const sourceNormal = sourceImagePlane.rowCosines.clone().cross(sourceImagePlane.columnCosines);
  const targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);

  const pointToImagePlaneDistance = {};
  const newPointToImagePlaneDistance = {};
  let automaticPlanePositioningIndex;

  const DeltaX = sourceImagePlane.columnPixelSpacing * (sourceImagePlane.columns / 2);

  const DeltaY = sourceImagePlane.rowPixelSpacing * (sourceImagePlane.rows / 2);

  const pos = {};

  pos.x = sourceImagePlane.imagePositionPatient.x + sourceImagePlane.rowCosines.x * DeltaX + sourceImagePlane.columnCosines.x * DeltaY;
  pos.y = sourceImagePlane.imagePositionPatient.y + sourceImagePlane.rowCosines.y * DeltaX + sourceImagePlane.columnCosines.y * DeltaY;
  pos.z = sourceImagePlane.imagePositionPatient.z + sourceImagePlane.rowCosines.z * DeltaX + sourceImagePlane.columnCosines.z * DeltaY;

  //  If the planes are parallel,then calculate automaticPlanePositioning
  if (!sourceNormal || !targetNormal) {
    return;
  }
  const isParallel = normalParallel(sourceNormal, targetNormal);

  if (isParallel) {
    stack.imageIds.forEach((currentTargetImageId, index) => {
      const currentTargetImagePlane = cornerstone.metaData.get('imagePlaneModule', currentTargetImageId);

      if (!currentTargetImagePlane || !currentTargetImagePlane.pixelSpacing || !currentTargetImagePlane.rowCosines || !currentTargetImagePlane.columnCosines || !currentTargetImagePlane.imagePositionPatient) {
        return;
      }

      currentTargetImagePlane.rowCosines = convertToVector3(currentTargetImagePlane.rowCosines);
      currentTargetImagePlane.columnCosines = convertToVector3(currentTargetImagePlane.columnCosines);
      currentTargetImagePlane.imagePositionPatient = convertToVector3(currentTargetImagePlane.imagePositionPatient);

      const a = Math.abs(sourceImagePlane.imagePositionPatient.x - currentTargetImagePlane.imagePositionPatient.x);
      const b = Math.abs(sourceImagePlane.imagePositionPatient.y - currentTargetImagePlane.imagePositionPatient.y);
      const c = Math.abs(sourceImagePlane.imagePositionPatient.z - currentTargetImagePlane.imagePositionPatient.z);

      const maxImagePositionPatient = Math.max(a, b, c);

      if (maxImagePositionPatient <= 1e-3) {
        automaticPlanePositioningIndex = index;
      }

      // 首先，计算每一个平面的法向量（m,n,p），计算方法和步骤2的第（1）点中一样

      // 然后，计算点到面的距离： |m*(pos.x-Position.x)+n*(pos.y-Position.y)+P*(pox.z-Position.z)|

      const currentTargetNormal = currentTargetImagePlane.rowCosines.clone().cross(currentTargetImagePlane.columnCosines);
      const currentPointToImagePlaneDistance = Math.abs(currentTargetNormal.x * (pos.x - currentTargetImagePlane.imagePositionPatient.x) + currentTargetNormal.y * (pos.y - currentTargetImagePlane.imagePositionPatient.y) + currentTargetNormal.z * (pos.z - currentTargetImagePlane.imagePositionPatient.z));

      newPointToImagePlaneDistance.distance = currentPointToImagePlaneDistance;
      newPointToImagePlaneDistance.index = index;

      if (!pointToImagePlaneDistance.distance || newPointToImagePlaneDistance.distance < pointToImagePlaneDistance.distance) {
        pointToImagePlaneDistance.distance = newPointToImagePlaneDistance.distance;
        pointToImagePlaneDistance.index = index;
      }
    });

    if (automaticPlanePositioningIndex === undefined && pointToImagePlaneDistance.distance < 10) {
      return (automaticPlanePositioningIndex = pointToImagePlaneDistance.index);
    }

    return automaticPlanePositioningIndex;
  }

  function normalParallel (sourceNormal, targetNormal) {
    const normalSqrt = Math.sqrt((sourceNormal.x * sourceNormal.x + sourceNormal.y * sourceNormal.y + sourceNormal.z * sourceNormal.z) * (targetNormal.x * targetNormal.x + targetNormal.y * targetNormal.y + targetNormal.z * targetNormal.z));

    if(normalSqrt < 1e-5) {
      return normalSqrt < 1e-5;
    }
    const cosA = Math.abs(sourceNormal.x * targetNormal.x + sourceNormal.y * targetNormal.y + sourceNormal.z * targetNormal.z) / normalSqrt;

    return cosA > 0.99;
  }
}
