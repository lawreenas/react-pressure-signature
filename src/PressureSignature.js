import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad';
import Pressure from 'pressure';

class PressureSignature extends SignaturePad  {

  constructor(props) {
    super(props);

    this.registerPressure = this.registerPressure.bind(this);
    this.unsupportedPressure = this.unsupportedPressure.bind(this);

    // Callbacks
    this.onChangeCallback = this.props.onChange;

    // State
    this.state = {
      ...this.state,
      currentPressure: 0, // current pressure
      signatureData: [], // current signature data
      pressureConfig: { // PressureJS config
        change: this.registerPressure,
        unsupported: this.unsupportedPressure
      }
    }
  }

  componentDidMount() {
    super.componentDidMount();

    // Read pressure from canvas
    Pressure.set(
      this.refs.cv,
      this.state.pressureConfig,
      { polyfill: false });
   }

  registerPressure(value, e) {
    this.setState({ currentPressure: value });
  }

  unsupportedPressure(e) {
    this.registerPressure(0);
  }

  _addPoint(point) {
    const p = {
      x: point.x,
      y: point.y,
      time: point.time,
      pressure: this.state.currentPressure
    };
    this.onChangeCallback(p);
    // this.setState({ signatureData: [...this.state.signatureData, p] });

    super._addPoint(point);
  }

  render() {
    return (
      <div id="signature-pad" className="m-signature-pad">
        <canvas
          style={{ height: '400px', width: '100%', ...this.props.style }}
          ref="cv"></canvas>
      </div>);
  }
};

export default PressureSignature;
