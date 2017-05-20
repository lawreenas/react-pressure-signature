import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad';
import Pressure from 'pressure';

class PressureSignature extends SignaturePad  {

  constructor(props) {
    super(props);

    this.maxWidth = this.props.maxWidth || 1.5;

    this.registerPressure = this.registerPressure.bind(this);
    this.unsupportedPressure = this.unsupportedPressure.bind(this);

    this.onChangeCallback = this.props.onChange;

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
    // Read pressure from canvas
    super.componentDidMount();
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
    this.onChangeCallback(
        {
          x: point.x,
          y: point.y,
          time: point.time,
          pressure: this.state.currentPressure
        }
    );
    super._addPoint(point);
  }

  render() {
    return (
      <div id="signature-pad" className="m-signature-pad">
        <div className="m-signature-pad--body">
          <canvas ref="cv"></canvas>
        </div>
      </div>);
  }
};

export default PressureSignature;
