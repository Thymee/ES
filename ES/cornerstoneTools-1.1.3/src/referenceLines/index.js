import calculateReferenceLine from './calculateReferenceLine.js';
import tools from './referenceLinesTool.js';
import tool from './automaticPlanePositioningTool.js';
import renderActiveReferenceLine from './renderActiveReferenceLine.js';

const referenceLines = {
  calculateReferenceLine,
  tools,
  renderActiveReferenceLine
};

const automaticPlanePositioning = {
  calculateReferenceLine,
  tool,
  renderActiveReferenceLine
};

export {
  referenceLines,
  automaticPlanePositioning
};
