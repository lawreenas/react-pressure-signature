import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pressure from 'pressure';
import SignaturePad from 'signature_pad';

class SignatureBox extends Component {

  constructor(props) {
    super(props);

    this.registerPressure = this.registerPressure.bind(this);
    this.unsupportedPressure = this.unsupportedPressure.bind(this);

    this.state = {
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
    Pressure.set(
      document.getElementById('signatureCanvas'),
      this.state.pressureConfig,
      { polyfill: false });

    console.log(this.signaturePad);
    // initCanvas(registerInputData);
  }

  registerPressure(value, e) {
    console.log('Pressure ->', value);
    this.setState({ currentPressure: value });
  }

  unsupportedPressure(e) {
    this.registerPressure(0);
  }

  registerInputData(x, y, time) {
    this.setState({ signatureData:
                    [...this.state.signatureData,
                     {x, y, time, pressure: this.state.pressure }]})
  }

  render() {
    const style = {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0.5',
    };
    return (
      <div>
        <canvas id="signatureCanvas" width="800" height="400"
                style={{backgroundColor: 'gray', ...style}} />
      </div>
    );
  }
};

export default SignatureBox;

SignatureBox.propTypes = {
};

SignatureBox.defaultProps = {
};
