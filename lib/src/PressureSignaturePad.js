'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pressure = require('pressure');

var _pressure2 = _interopRequireDefault(_pressure);

var _signature_pad = require('signature_pad/dist/signature_pad.js');

var _signature_pad2 = _interopRequireDefault(_signature_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PressureSignaturePad = function (_React$Component) {
  _inherits(PressureSignaturePad, _React$Component);

  function PressureSignaturePad(props) {
    _classCallCheck(this, PressureSignaturePad);

    var _this = _possibleConstructorReturn(this, (PressureSignaturePad.__proto__ || Object.getPrototypeOf(PressureSignaturePad)).call(this, props));

    _this.handlePressureUnsupported = _this.handlePressureUnsupported.bind(_this);
    _this.handlePressureChanged = _this.handlePressureChanged.bind(_this);
    _this.handleCanvasResize = _this.handleCanvasResize.bind(_this);
    _this.addPoint = _this.addPoint.bind(_this);

    // State
    _this.state = _extends({}, _this.state, {
      currentPressure: 0, // current pressure
      signatureData: [], // current signature data
      pressureConfig: { // PressureJS config
        change: _this.handlePressureChanged,
        unsupported: _this.handlePressureUnsupported
      }
    });

    // Callbacks
    _this.callbacks = {
      onChange: _this.props.onChange
    };
    return _this;
  }

  _createClass(PressureSignaturePad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.canvas = this.refs.canvas;
      this.signaturePad = new _signature_pad2.default(this.canvas);
      this.signaturePad._addPoint = this.addPoint; // Override Signature pad methods

      this.handleCanvasResize();

      // Read pressure from canvas
      _pressure2.default.set(this.canvas, this.state.pressureConfig, { polyfill: false });

      window.onresize = this.handleCanvasResize;
    }
  }, {
    key: 'handlePressureUnsupported',
    value: function handlePressureUnsupported() {
      this.handlePressureChanged(null);
    }
  }, {
    key: 'handlePressureChanged',
    value: function handlePressureChanged(value, e) {
      this.setState({ currentPressure: value });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'pressure-signature-pad', className: 'pressure-signature-pad' },
        _react2.default.createElement('canvas', {
          style: _extends({ height: '400px', width: '100%' }, this.props.style),
          ref: 'canvas' })
      );
    }

    /* Signature Pad */

  }, {
    key: 'addPoint',
    value: function addPoint(point) {
      /* Add pressure to Point */
      point.pressure = this.state.currentPressure;
      this.callbacks.onChange(point);

      /* Call original handler */
      return _signature_pad2.default.prototype._addPoint.call(this.signaturePad, point);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.signaturePad.clear();
    }
  }, {
    key: 'handleCanvasResize',
    value: function handleCanvasResize() {
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      this.canvas.width = this.canvas.offsetWidth * ratio;
      this.canvas.height = this.canvas.offsetHeight * ratio;
      this.canvas.getContext("2d").scale(ratio, ratio);
      this.clear();
    }
  }]);

  return PressureSignaturePad;
}(_react2.default.Component);

;

exports.default = PressureSignaturePad;