/*! cornerstone-tools - 2.0.0 - 2018-01-23 | (c) 2017 Chris Hafey | https://github.com/cornerstonejs/cornerstoneTools */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cornerstoneTools", [], factory);
	else if(typeof exports === 'object')
		exports["cornerstoneTools"] = factory();
	else
		root["cornerstoneTools"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cornerstone = window.cornerstone;
var cornerstoneMath = window.cornerstoneMath;
var Hammer = window.Hammer;

exports.default = {
  set cornerstone(cs) {
    cornerstone = cs;
  },
  get cornerstone() {
    return cornerstone;
  },
  set cornerstoneMath(cm) {
    cornerstoneMath = cm;
  },
  get cornerstoneMath() {
    return cornerstoneMath;
  },
  set Hammer(module) {
    Hammer = module;
  },
  get Hammer() {
    return Hammer;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (targetImagePlane, referenceImagePlane) {
    // var points = cornerstoneTools.planePlaneIntersection(targetImagePlane, referenceImagePlane);
    // if (!points) {
    //     return;
    // }
    // return {
    //     start: cornerstoneTools.projectPatientPointToImagePlane(points.start, targetImagePlane),
    //     end: cornerstoneTools.projectPatientPointToImagePlane(points.end, targetImagePlane)
    // };
    targetImagePlane.rowCosines = (0, _convertToVector2.default)(targetImagePlane.rowCosines);
    targetImagePlane.columnCosines = (0, _convertToVector2.default)(targetImagePlane.columnCosines);
    targetImagePlane.imagePositionPatient = (0, _convertToVector2.default)(targetImagePlane.imagePositionPatient);
    referenceImagePlane.rowCosines = (0, _convertToVector2.default)(referenceImagePlane.rowCosines);
    referenceImagePlane.columnCosines = (0, _convertToVector2.default)(referenceImagePlane.columnCosines);
    referenceImagePlane.imagePositionPatient = (0, _convertToVector2.default)(referenceImagePlane.imagePositionPatient);
    var sourceNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
    var targetNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
    //If the planes are parallel,then calculate automaticPlanePositioning
    if (!sourceNormal || !targetNormal) {
        return;
    }

    function normalParallel(sourceNormal, targetNormal) {
        var normalSqrt = Math.sqrt((sourceNormal.x * sourceNormal.x + sourceNormal.y * sourceNormal.y + sourceNormal.z * sourceNormal.z) * (targetNormal.x * targetNormal.x + targetNormal.y * targetNormal.y + targetNormal.z * targetNormal.z));
        if (normalSqrt < 1e-5) {
            return normalSqrt < 1e-5;
        }
        var cosA = Math.abs(sourceNormal.x * targetNormal.x + sourceNormal.y * targetNormal.y + sourceNormal.z * targetNormal.z) / normalSqrt;
        return cosA > 0.99;
    }
    var isParallel = normalParallel(sourceNormal, targetNormal);
    if (isParallel) {
        return;
    }
    if (targetImagePlane.pixelSpacing < 1e-5 || targetImagePlane.columnPixelSpacing < 1e-5 || targetImagePlane.rowPixelSpacing < 1e-5) {
        return;
    }
    var P1 = void 0,
        P2 = void 0,
        P3 = void 0,
        P4 = void 0;
    var Row = referenceImagePlane.columnPixelSpacing * targetImagePlane.columns;
    var Col = referenceImagePlane.rowPixelSpacing * targetImagePlane.rows;
    P1 = referenceImagePlane.imagePositionPatient;
    P2.x = P1.x + referenceImagePlane.rowCosines.x * Row;
    P2.y = P1.y + referenceImagePlane.rowCosines.y * Row;
    P2.z = P1.z + referenceImagePlane.rowCosines.z * Row;
    P3.x = P2.x + referenceImagePlane.columnCosines.x * Col;
    P3.y = P2.y + referenceImagePlane.columnCosines.y * Col;
    P3.z = P2.z + referenceImagePlane.columnCosines.z * Col;
    P4.x = P1.x + referenceImagePlane.columnCosines.x * Col;
    P4.y = P1.y + referenceImagePlane.columnCosines.y * Col;
    P4.z = P1.z + referenceImagePlane.columnCosines.z * Col;
    var dv1 = sourceNormal.x * (P1.x - targetImagePlane.imagePositionPatient.x) + sourceNormal.y * (P1.y - targetImagePlane.imagePositionPatient.y) + sourceNormal.z * (P1.z - targetImagePlane.imagePositionPatient.z);
    var dv2 = sourceNormal.x * (P2.x - targetImagePlane.imagePositionPatient.x) + sourceNormal.y * (P2.y - targetImagePlane.imagePositionPatient.y) + sourceNormal.z * (P2.z - targetImagePlane.imagePositionPatient.z);
    var dv3 = sourceNormal.x * (P3.x - targetImagePlane.imagePositionPatient.x) + sourceNormal.y * (P3.y - targetImagePlane.imagePositionPatient.y) + sourceNormal.z * (P3.z - targetImagePlane.imagePositionPatient.z);
    var dv4 = sourceNormal.x * (P4.x - targetImagePlane.imagePositionPatient.x) + sourceNormal.y * (P4.y - targetImagePlane.imagePositionPatient.y) + sourceNormal.z * (P4.z - targetImagePlane.imagePositionPatient.z);
    if (dv1 < 0 && dv2 < 0 && dv3 < 0 && dv4 < 0 || dv1 > 0 && dv2 > 0 && dv3 > 0 && dv4 > 0) {
        return;
    }
    var C12 = void 0,
        C23 = void 0,
        C34 = void 0,
        C41 = void 0;
    var ptStart = void 0,
        ptEnd = void 0,
        ptPoint = void 0,
        crossPoints = [];
    // function pointToImagePlane(point,plane){
    // }
    //计算线段P1P2与已知平面的交点C12
    if (dv1 * dv2 < 0) {
        var ratio12 = Math.abs(dv1 / (dv1 - dv2)); //dv1、dv2异号，其绝对值之和等于其差(dv1-dv2)的绝对值
        C12.x = P1.x + (P2.x - P1.x) * ratio12;
        C12.y = P1.y + (P2.y - P1.y) * ratio12;
        C12.z = P1.z + (P2.z - P1.z) * ratio12;
        crossPoint(C12);
    }
    //计算线段P2P3与已知平面的交点C23
    if (dv2 * dv3 < 0) {
        var ratio23 = Math.abs(dv2 / (dv2 - dv3)); //dv2、dv3异号，其绝对值之和等于其差(dv2-dv3)的绝对值
        C23.x = P2.x + (P3.x - P2.x) * ratio23;
        C23.y = P2.y + (P3.y - P2.y) * ratio23;
        C23.z = P2.z + (P3.z - P2.z) * ratio23;
        crossPoint(C23);
    }
    //计算线段P3P4与已知平面的交点C34
    if (dv3 * dv4 < 0) {
        var ratio34 = Math.abs(dv3 / (dv3 - dv4)); //dv3、dv4异号，其绝对值之和等于其差(dv3-dv4)的绝对值
        C34.x = P3.x + (P4.x - P3.x) * ratio34;
        C34.y = P3.y + (P4.y - P3.y) * ratio34;
        C34.z = P3.z + (P4.z - P3.z) * ratio34;
        crossPoint(C34);
    }
    //计算线段P4P1与已知平面的交点C41
    if (dv4 * dv1 < 0) {
        var ratio41 = Math.abs(dv4 / (dv4 - dv1)); //dv1、dv2异号，其绝对值之和等于其差(dv1-dv2)的绝对值
        C41.x = P4.x + (P1.x - P4.x) * ratio41;
        C41.y = P4.y + (P1.y - P4.y) * ratio41;
        C41.z = P4.z + (P1.z - P4.z) * ratio41;
        crossPoint(C41);
    }

    function crossPoint(cv) {
        var Dx = void 0,
            Dy = void 0,
            Dz = void 0,
            xSize = void 0,
            ySize = void 0;
        Dx = cv.x - targetImagePlane.imagePositionPatient.x;
        Dy = cv.y - targetImagePlane.imagePositionPatient.y;
        Dz = cv.z - targetImagePlane.imagePositionPatient.z;
        xSize = Dx * targetImagePlane.rowCosines.x + Dy * targetImagePlane.rowCosines.y + Dz * targetImagePlane.rowCosines.z;
        ySize = Dx * targetImagePlane.columnCosines.x + Dy * targetImagePlane.columnCosines.y + Dz * targetImagePlane.columnCosines.z;
        ptPoint.x = xSize / targetImagePlane.columnPixelSpacing + 0.5;
        ptPoint.y = ySize / targetImagePlane.rowPixelSpacing + 0.5;
        crossPoints.push(ptPoint);
    }
    ptStart = crossPoints[0];
    ptEnd = crossPoints[1];
    if (ptStart.x < 0 && ptEnd.x < 0 || ptStart.x > targetImagePlane.columns && ptEnd.x > targetImagePlane.columns || ptStart.y < 0 && ptEnd.y < 0 || ptStart.y > targetImagePlane.rows && ptEnd.y > targetImagePlane.rows) {
        return;
    }
    if (ptEnd.x < 0) {
        ptEnd.y = ptEnd.y + (ptStart.y - ptEnd.y) * (0 - ptEnd.x) / (ptStart.x - ptEnd.x);
        ptEnd.x = 0;
    } else {
        if (ptEnd.x > targetImagePlane.columns) {
            ptEnd.y = ptEnd.y + (ptStart.y - ptEnd.y) * (targetImagePlane.columns - ptEnd.x) / (ptStart.x - ptEnd.x);
            ptEnd.x = targetImagePlane.columns;
        }
    }
    if (ptEnd.y < 0) {
        ptEnd.x = ptEnd.x + (ptStart.x - ptEnd.x) * (0 - ptEnd.y) / (ptStart.y - ptEnd.y);
        ptEnd.y = 0;
    } else {
        if (ptEnd.y > targetImagePlane.rows) {
            ptEnd.x = ptEnd.x + (ptStart.x - ptEnd.x) * (targetImagePlane.rows - ptEnd.y) / (ptStart.y - ptEnd.y);
            ptEnd.x = targetImagePlane.rows;
        }
    }
    if (ptStart.x < 0) {
        ptStart.y = ptStart.y + (ptEnd.y - ptStart.y) * (0 - ptStart.x) / (ptEnd.x - ptStart.x);
        ptStart.x = 0;
    } else {
        if (ptStart.x > targetImagePlane.columns) {
            ptStart.y = ptStart.y + (ptEnd.y - ptStart.y) * (targetImagePlane.columns - ptStart.x) / (ptEnd.x - ptStart.x);
            ptStart.x = targetImagePlane.columns;
        }
    }
    if (ptStart.y < 0) {
        ptStart.x = ptStart.x + (ptEnd.x - ptStart.x) * (0 - ptStart.y) / (ptEnd.y - ptStart.y);
        ptStart.y = 0;
    } else {
        if (ptStart.y > targetImagePlane.rows) {
            ptStart.x = ptStart.x + (ptEnd.x - ptStart.x) * (targetImagePlane.rows - ptStart.y) / (ptEnd.y - ptStart.y);
            ptStart.x = targetImagePlane.rows;
        }
    }
    return {
        start: ptStart,
        end: ptEnd
    };
};

var _convertToVector = __webpack_require__(2);

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertToVector3;

var _externalModules = __webpack_require__(0);

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert an Array to a cornerstoneMath.Vector3
 *
 * @param {Array|cornerstoneMath.Vector3} arrayOrVector3 Input array or Vector3
 * @return {cornerstoneMath.Vector3}
 */
function convertToVector3(arrayOrVector3) {
  var cornerstoneMath = _externalModules2.default.cornerstoneMath;

  if (arrayOrVector3 instanceof cornerstoneMath.Vector3) {
    return arrayOrVector3;
  }

  return new cornerstoneMath.Vector3(arrayOrVector3[0], arrayOrVector3[1], arrayOrVector3[2]);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EVENTS = {
  // Events from Cornerstone Core
  IMAGE_RENDERED: 'cornerstoneimagerendered',
  NEW_IMAGE: 'cornerstonenewimage',
  IMAGE_CACHE_PROMISE_REMOVED: 'cornerstoneimagecachepromiseremoved',
  ELEMENT_DISABLED: 'cornerstoneelementdisabled',

  // Mouse events
  MOUSE_DOWN: 'cornerstonetoolsmousedown',
  MOUSE_UP: 'cornerstonetoolsmouseup',
  MOUSE_DOWN_ACTIVATE: 'cornerstonetoolsmousedownactivate',
  MOUSE_DRAG: 'cornerstonetoolsmousedrag',
  MOUSE_MOVE: 'cornerstonetoolsmousemove',
  MOUSE_CLICK: 'cornerstonetoolsmouseclick',
  MOUSE_DOUBLE_CLICK: 'cornerstonetoolsmousedoubleclick',
  MOUSE_WHEEL: 'cornerstonetoolsmousewheel',

  // Touch events
  TOUCH_START: 'cornerstonetoolstouchstart',
  TOUCH_START_ACTIVE: 'cornerstonetoolstouchstartactive',
  TOUCH_END: 'cornerstonetoolstouchend',
  TOUCH_DRAG: 'cornerstonetoolstouchdrag',
  TOUCH_DRAG_END: 'cornerstonetoolstouchdragend',
  TOUCH_PINCH: 'cornerstonetoolstouchpinch',
  TOUCH_ROTATE: 'cornerstonetoolstouchrotate',
  TOUCH_PRESS: 'cornerstonetoolstouchpress',
  TAP: 'cornerstonetoolstap',
  DOUBLE_TAP: 'cornerstonetoolsdoubletap',
  MULTI_TOUCH_START: 'cornerstonetoolsmultitouchstart',
  MULTI_TOUCH_START_ACTIVE: 'cornerstonetoolsmultitouchstartactive',
  MULTI_TOUCH_DRAG: 'cornerstonetoolsmultitouchdrag',

  // Keyboard events
  KEY_DOWN: 'cornerstonetoolskeydown',
  KEY_UP: 'cornerstonetoolskeyup',
  KEY_PRESS: 'cornerstonetoolskeypress',

  // Measurement / tool events
  MEASUREMENT_ADDED: 'cornerstonetoolsmeasurementadded',
  MEASUREMENT_MODIFIED: 'cornerstonetoolsmeasurementmodified',
  MEASUREMENT_REMOVED: 'cornerstonemeasurementremoved',
  TOOL_DEACTIVATED: 'cornerstonetoolstooldeactivated',
  CLIP_STOPPED: 'cornerstonetoolsclipstopped',
  STACK_SCROLL: 'cornerstonestackscroll', // Should be renamed

  LINE_SAMPLE_UPDATED: 'cornerstonelinesampleupdated'
};

exports.default = EVENTS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, eventData, targetElement, referenceElement) {
  var cornerstone = _externalModules2.default.cornerstone;
  var targetImage = cornerstone.getEnabledElement(targetElement).image;
  var referenceImage = cornerstone.getEnabledElement(referenceElement).image;

  // Make sure the images are actually loaded for the target and reference
  if (!targetImage || !referenceImage) {
    return;
  }

  var targetImagePlane = cornerstone.metaData.get('imagePlaneModule', targetImage.imageId);
  var referenceImagePlane = cornerstone.metaData.get('imagePlaneModule', referenceImage.imageId);

  // Make sure the target and reference actually have image plane metadata
  if (!targetImagePlane || !referenceImagePlane || !targetImagePlane.rowCosines || !targetImagePlane.columnCosines || !targetImagePlane.imagePositionPatient || !referenceImagePlane.rowCosines || !referenceImagePlane.columnCosines || !referenceImagePlane.imagePositionPatient) {
    return;
  }

  // The image planes must be in the same frame of reference
  if (targetImagePlane.frameOfReferenceUID !== referenceImagePlane.frameOfReferenceUID) {
    return;
  }

  targetImagePlane.rowCosines = (0, _convertToVector2.default)(targetImagePlane.rowCosines);
  targetImagePlane.columnCosines = (0, _convertToVector2.default)(targetImagePlane.columnCosines);
  targetImagePlane.imagePositionPatient = (0, _convertToVector2.default)(targetImagePlane.imagePositionPatient);
  referenceImagePlane.rowCosines = (0, _convertToVector2.default)(referenceImagePlane.rowCosines);
  referenceImagePlane.columnCosines = (0, _convertToVector2.default)(referenceImagePlane.columnCosines);
  referenceImagePlane.imagePositionPatient = (0, _convertToVector2.default)(referenceImagePlane.imagePositionPatient);

  // The image plane normals must be > 30 degrees apart
  var targetNormal = targetImagePlane.rowCosines.clone().cross(targetImagePlane.columnCosines);
  var referenceNormal = referenceImagePlane.rowCosines.clone().cross(referenceImagePlane.columnCosines);
  var angleInRadians = targetNormal.angleTo(referenceNormal);

  angleInRadians = Math.abs(angleInRadians);
  if (angleInRadians < 0.5) {
    // 0.5 radians = ~30 degrees
    return;
  }

  var referenceLine = (0, _calculateReferenceLine2.default)(targetImagePlane, referenceImagePlane);

  if (!referenceLine) {
    return;
  }

  var refLineStartCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.start);
  var refLineEndCanvas = cornerstone.pixelToCanvas(eventData.element, referenceLine.end);

  var color = _toolColors2.default.getActiveColor();
  var lineWidth = _toolStyle2.default.getToolWidth();

  // Draw the referenceLines
  context.setTransform(1, 0, 0, 1, 0, 0);

  context.save();
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(refLineStartCanvas.x, refLineStartCanvas.y);
  context.lineTo(refLineEndCanvas.x, refLineEndCanvas.y);
  context.stroke();
  context.restore();
};

var _externalModules = __webpack_require__(0);

var _externalModules2 = _interopRequireDefault(_externalModules);

var _calculateReferenceLine = __webpack_require__(1);

var _calculateReferenceLine2 = _interopRequireDefault(_calculateReferenceLine);

var _toolColors = __webpack_require__(10);

var _toolColors2 = _interopRequireDefault(_toolColors);

var _toolStyle = __webpack_require__(11);

var _toolStyle2 = _interopRequireDefault(_toolStyle);

var _convertToVector = __webpack_require__(2);

var _convertToVector2 = _interopRequireDefault(_convertToVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calculateReferenceLine = __webpack_require__(1);

var _calculateReferenceLine2 = _interopRequireDefault(_calculateReferenceLine);

var _referenceLinesTool = __webpack_require__(6);

var _referenceLinesTool2 = _interopRequireDefault(_referenceLinesTool);

var _renderActiveReferenceLine = __webpack_require__(4);

var _renderActiveReferenceLine2 = _interopRequireDefault(_renderActiveReferenceLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var referenceLiness = {
  calculateReferenceLine: _calculateReferenceLine2.default,
  tool: _referenceLinesTool2.default,
  renderActiveReferenceLine: _renderActiveReferenceLine2.default
};

exports.default = referenceLiness;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(3);

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(0);

var _externalModules2 = _interopRequireDefault(_externalModules);

var _toolState = __webpack_require__(7);

var _renderActiveReferenceLine = __webpack_require__(4);

var _renderActiveReferenceLine2 = _interopRequireDefault(_renderActiveReferenceLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolType = 'referenceLiness';

function onImageRendered(e) {
  var eventData = e.detail;

  // If we have no toolData for this element, return immediately as there is nothing to do
  var toolData = (0, _toolState.getToolState)(e.currentTarget, toolType);

  if (toolData === undefined) {
    return;
  }

  // Get the enabled elements associated with this synchronization context and draw them
  var syncContext = toolData.data[0].synchronizationContext;
  var enabledElements = syncContext.getSourceElements();

  var renderer = toolData.data[0].renderer;

  // Create the canvas context and reset it to the pixel coordinate system
  var context = eventData.canvasContext.canvas.getContext('2d');

  _externalModules2.default.cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, context);

  // Iterate over each referenced element
  enabledElements.forEach(function (referenceEnabledElement) {

    // Don't draw ourselves
    if (referenceEnabledElement === e.currentTarget) {
      return;
    }

    // Render it
    renderer(context, eventData, e.currentTarget, referenceEnabledElement);
  });
}

// Enables the reference line tool for a given element.  Note that a custom renderer
// Can be provided if you want different rendering (e.g. all reference lines, first/last/active, etc)
function enable(element, synchronizationContext, renderer) {
  renderer = renderer || _renderActiveReferenceLine2.default;

  (0, _toolState.addToolState)(element, toolType, {
    synchronizationContext: synchronizationContext,
    renderer: renderer
  });

  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  element.addEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Disables the reference line tool for the given element
function disable(element) {
  element.removeEventListener(_events2.default.IMAGE_RENDERED, onImageRendered);
  _externalModules2.default.cornerstone.updateImage(element);
}

// Module/private exports
var tool = {
  enable: enable,
  disable: disable
};

exports.default = tool;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementToolStateManager = exports.setElementToolStateManager = exports.clearToolState = exports.removeToolState = exports.getToolState = exports.addToolState = undefined;

var _events = __webpack_require__(3);

var _events2 = _interopRequireDefault(_events);

var _externalModules = __webpack_require__(0);

var _externalModules2 = _interopRequireDefault(_externalModules);

var _imageIdSpecificStateManager = __webpack_require__(8);

var _triggerEvent = __webpack_require__(9);

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getElementToolStateManager(element) {
  var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);
  // If the enabledImage has no toolStateManager, create a default one for it
  // NOTE: This makes state management element specific

  if (enabledImage.toolStateManager === undefined) {
    enabledImage.toolStateManager = _imageIdSpecificStateManager.globalImageIdSpecificToolStateManager;
  }

  return enabledImage.toolStateManager;
}

// Here we add tool state, this is done by tools as well
// As modules that restore saved state
function addToolState(element, toolType, measurementData) {
  var toolStateManager = getElementToolStateManager(element);

  toolStateManager.add(element, toolType, measurementData);

  var eventType = _events2.default.MEASUREMENT_ADDED;
  var eventData = {
    toolType: toolType,
    element: element,
    measurementData: measurementData
  };

  (0, _triggerEvent2.default)(element, eventType, eventData);
}

// Here you can get state - used by tools as well as modules
// That save state persistently
function getToolState(element, toolType) {
  var toolStateManager = getElementToolStateManager(element);

  return toolStateManager.get(element, toolType);
}

function removeToolState(element, toolType, data) {
  var toolStateManager = getElementToolStateManager(element);
  var toolData = toolStateManager.get(element, toolType);
  // Find this tool data
  var indexOfData = -1;

  for (var i = 0; i < toolData.data.length; i++) {
    if (toolData.data[i] === data) {
      indexOfData = i;
    }
  }

  if (indexOfData !== -1) {
    toolData.data.splice(indexOfData, 1);

    var eventType = _events2.default.MEASUREMENT_REMOVED;
    var eventData = {
      toolType: toolType,
      element: element,
      measurementData: data
    };

    (0, _triggerEvent2.default)(element, eventType, eventData);
  }
}

function clearToolState(element, toolType) {
  var toolStateManager = getElementToolStateManager(element);
  var toolData = toolStateManager.get(element, toolType);

  // If any toolData actually exists, clear it
  if (toolData !== undefined) {
    toolData.data = [];
  }
}

// Sets the tool state manager for an element
function setElementToolStateManager(element, toolStateManager) {
  var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);

  enabledImage.toolStateManager = toolStateManager;
}

exports.addToolState = addToolState;
exports.getToolState = getToolState;
exports.removeToolState = removeToolState;
exports.clearToolState = clearToolState;
exports.setElementToolStateManager = setElementToolStateManager;
exports.getElementToolStateManager = getElementToolStateManager;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalImageIdSpecificToolStateManager = exports.newImageIdSpecificToolStateManager = undefined;

var _externalModules = __webpack_require__(0);

var _externalModules2 = _interopRequireDefault(_externalModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This implements an imageId specific tool state management strategy.  This means that
// Measurements data is tied to a specific imageId and only visible for enabled elements
// That are displaying that imageId.

function newImageIdSpecificToolStateManager() {
  var toolState = {};

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state

  function saveImageIdToolState(imageId) {
    return toolState[imageId];
  }

  function restoreImageIdToolState(imageId, imageIdToolState) {
    toolState[imageId] = imageIdToolState;
  }

  function saveToolState() {
    return toolState;
  }

  function restoreToolState(savedToolState) {
    toolState = savedToolState;
  }

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addImageIdSpecificToolState(element, toolType, data) {
    var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);
    // If we don't have any tool state for this imageId, add an empty object

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      toolState[enabledImage.image.imageId] = {};
    }

    var imageIdToolState = toolState[enabledImage.image.imageId];

    // If we don't have tool state for this type of tool, add an empty object
    if (imageIdToolState.hasOwnProperty(toolType) === false) {
      imageIdToolState[toolType] = {
        data: []
      };
    }

    var toolData = imageIdToolState[toolType];

    // Finally, add this new tool to the state
    toolData.data.push(data);
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getImageIdSpecificToolState(element, toolType) {
    var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);
    // If we don't have any tool state for this imageId, return undefined

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      return;
    }

    var imageIdToolState = toolState[enabledImage.image.imageId];

    // If we don't have tool state for this type of tool, return undefined
    if (imageIdToolState.hasOwnProperty(toolType) === false) {
      return;
    }

    var toolData = imageIdToolState[toolType];

    return toolData;
  }

  // Clears all tool data from this toolStateManager.
  function clearImageIdSpecificToolStateManager(element) {
    var enabledImage = _externalModules2.default.cornerstone.getEnabledElement(element);

    if (!enabledImage.image || toolState.hasOwnProperty(enabledImage.image.imageId) === false) {
      return;
    }

    delete toolState[enabledImage.image.imageId];
  }

  return {
    get: getImageIdSpecificToolState,
    add: addImageIdSpecificToolState,
    clear: clearImageIdSpecificToolStateManager,
    saveImageIdToolState: saveImageIdToolState,
    restoreImageIdToolState: restoreImageIdToolState,
    saveToolState: saveToolState,
    restoreToolState: restoreToolState,
    toolState: toolState
  };
}

// A global imageIdSpecificToolStateManager - the most common case is to share state between all
// Visible enabled images
var globalImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager();

exports.newImageIdSpecificToolStateManager = newImageIdSpecificToolStateManager;
exports.globalImageIdSpecificToolStateManager = globalImageIdSpecificToolStateManager;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerEvent;
/**
 * Trigger a CustomEvent
 *
 * @param {EventTarget} el The element or EventTarget to trigger the event upon
 * @param {String} type The event type name
 * @param {Object|null} detail=null The event data to be sent
 * @returns {Boolean} The return value is false if at least one event listener called preventDefault(). Otherwise it returns true.
 */
function triggerEvent(el, type) {
  var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var event = void 0;

  // This check is needed to polyfill CustomEvent on IE11-
  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(type, {
      detail: detail,
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, detail);
  }

  return el.dispatchEvent(event);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultColor = 'white',
    activeColor = 'greenyellow',
    fillColor = 'transparent';

function setFillColor(color) {
  fillColor = color;
}

function getFillColor() {
  return fillColor;
}

function setToolColor(color) {
  defaultColor = color;
}

function getToolColor() {
  return defaultColor;
}

function setActiveColor(color) {
  activeColor = color;
}

function getActiveColor() {
  return activeColor;
}

function getColorIfActive(active) {
  return active ? activeColor : defaultColor;
}

var toolColors = {
  setFillColor: setFillColor,
  getFillColor: getFillColor,
  setToolColor: setToolColor,
  getToolColor: getToolColor,
  setActiveColor: setActiveColor,
  getActiveColor: getActiveColor,
  getColorIfActive: getColorIfActive
};

exports.default = toolColors;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultWidth = 1,
    activeWidth = 2;

function setToolWidth(width) {
  defaultWidth = width;
}

function getToolWidth() {
  return defaultWidth;
}

function setActiveWidth(width) {
  activeWidth = width;
}

function getActiveWidth() {
  return activeWidth;
}

var toolStyle = {
  setToolWidth: setToolWidth,
  getToolWidth: getToolWidth,
  setActiveWidth: setActiveWidth,
  getActiveWidth: getActiveWidth
};

exports.default = toolStyle;

/***/ })
/******/ ]);
});
//# sourceMappingURL=cornerstoneTools.js.map