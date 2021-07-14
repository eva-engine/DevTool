self["webpackHotUpdatedevtool"]("main",{

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/row/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/col/index.js");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
/* harmony import */ var _Components_SearchTree_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/SearchTree/index */ "./src/Components/SearchTree/index.jsx");
/* harmony import */ var _Components_Tables_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/Tables/index */ "./src/Components/Tables/index.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // import "./index.css";




var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: undefined,
      obj: [{
        "position.x": "0",
        "position.y": "0",
        name: "Transform"
      }, {
        "position.x": "0",
        "position.y": "0",
        name: "ninePatch"
      }]
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      console.log(value);

      _this.setState({
        value: value
      });
    });

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_5__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_6__.default, {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_SearchTree_index__WEBPACK_IMPORTED_MODULE_3__.default, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_6__.default, {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_6__.default, {
        xs: 11,
        sm: 11,
        md: 11,
        lg: 11,
        xl: 11
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_Tables_index__WEBPACK_IMPORTED_MODULE_4__.default, {
        className: "tables",
        arr: this.state.obj,
        objId: 1
      }))));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(App, null), document.getElementById("root"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f616d768889da1718bcd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.87f06604e5da9e9eb6be.hot-update.js.map