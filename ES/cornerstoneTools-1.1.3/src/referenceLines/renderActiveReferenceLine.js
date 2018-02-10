import external from '../externalModules.js';
import calculateReferenceLine from './calculateReferenceLine.js';
import toolColors from '../stateManagement/toolColors.js';
import toolStyle from '../stateManagement/toolStyle.js';
import convertToVector3 from '../util/convertToVector3.js';
import drawTextBox from '../util/drawTextBox.js';
import { getToolState } from '../stateManagement/toolState.js';

// Renders the active reference line
export default function (canvas, eventData, targetElement, referenceElement) {
  const cornerstone = external.cornerstone;
  const targetImage = cornerstone.getEnabledElement(targetElement).image;
  const referenceImage = cornerstone.getEnabledElement(referenceElement).image;

  // Make sure the images are actually loaded for the target and reference
  if (!targetImage || !referenceImage) {
    return;
  }

  const targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);
  const referenceImagePlane = cornerstone.metaData.get('imagePlaneModule', referenceImage.imageId);

  // Make sure the target and reference actually have image plane metadata
  if (!targetImagePlane ||
        !referenceImagePlane ||
        !targetImagePlane.rowCosines ||
        !targetImagePlane.columnCosines ||
        !targetImagePlane.imagePositionPatient ||
        !referenceImagePlane.rowCosines ||
        !referenceImagePlane.columnCosines ||
        !referenceImagePlane.imagePositionPatient) {
    return;
  }

  // The image planes must be in the same frame of reference
  if (targetImagePlane.frameOfReferenceUID !== referenceImagePlane.frameOfReferenceUID) {
    return;
  }

  targetImagePlane.rowCosines = convertToVector3(targetImagePlane.rowCosines);
  targetImagePlane.columnCosines = convertToVector3(targetImagePlane.columnCosines);
  targetImagePlane.imagePositionPatient = convertToVector3(targetImagePlane.imagePositionPatient);
  referenceImagePlane.rowCosines = convertToVector3(referenceImagePlane.rowCosines);
  referenceImagePlane.columnCosines = convertToVector3(referenceImagePlane.columnCosines);
  referenceImagePlane.imagePositionPatient = convertToVector3(referenceImagePlane.imagePositionPatient);

  // The image plane normals must be > 30 degrees apart
  const targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
  const referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
  let angleInRadians = targetNormal.angleTo(referenceNormal);

  angleInRadians = Math.abs(angleInRadians);
  if (angleInRadians < 0.5) { // 0.5 radians = ~30 degrees
    return;
  }

  const referenceLine = calculateReferenceLine(targetImagePlane, referenceImagePlane);

  if (!referenceLine) {
    return;
  }

  let refLineStartCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.start);
  let refLineEndCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.end);

  //  如果refLineStartCanvas的点在refLineEndCanvas右边，则交换--thy
  if (refLineStartCanvas.x > refLineEndCanvas.x) {
    const lineCanvas = refLineStartCanvas;

    refLineStartCanvas = refLineEndCanvas;
    refLineEndCanvas = lineCanvas;
  }
  const color = toolColors.getActiveColor();
  const lineWidth = toolStyle.getToolWidth();

  //  取得canvas宽高，算边界--thy
  const context = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  if (canvasWidth === undefined || canvasHeight === undefined || canvasWidth === null || canvasHeight === null || canvasWidth === 0 || canvasHeight === 0) {
    return;
  }
  // Draw the referenceLines
  context.setTransform(1, 0, 0, 1, 0, 0);

  //  算边界--thy
  if(refLineStartCanvas.x >= canvas.width) {
    coords.x = canvas.width - 5;
  }
  if(refLineEndCanvas.y <= 0) {
    coords.y = 5;
  }
  refLineStartCanvas.x = Math.min(Math.max(refLineStartCanvas.x, 5), (canvas.width - 5));
  refLineStartCanvas.y = Math.min(Math.max(refLineStartCanvas.y, 5), (canvas.height - 5));
  refLineEndCanvas.x = Math.min(Math.max(refLineEndCanvas.x, 5), (canvas.width - 5));
  refLineEndCanvas.y = Math.min(Math.max(refLineEndCanvas.y, 5), (canvas.height - 5));

  context.save();
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = lineWidth;
  context.moveTo(refLineStartCanvas.x, refLineStartCanvas.y);
  context.lineTo(refLineEndCanvas.x, refLineEndCanvas.y);
  context.stroke();
  context.restore();


  //  画定位线右边第几页的值
  const toolData = getToolState(referenceElement, 'stack');

  if (toolData === undefined || toolData.data === undefined || toolData.data.length === 0) {
    return;
  }
  const stack = toolData.data[0];
  const currentIndex = stack.currentImageIdIndex + 1;

  //  Draw text
  const text = String(currentIndex);

  const coords = { // Translate the x/y away from the cursor
    x: refLineEndCanvas.x + 3,
    y: refLineEndCanvas.y - 3 };

  coords.x = Math.min(Math.max(coords.x, 5), (canvas.width - 20));
  coords.y = Math.min(Math.max(coords.y, 5), (canvas.height - 20));
  //  Context.font = '28';
  context.fillStyle = 'red';

  drawTextBox(context, text, coords.x, coords.y, color);
}
