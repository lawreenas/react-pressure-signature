import React, { Component } from 'react';

import PressureSignaturePad from './PressureSignaturePad';
import Stats from './Stats';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signatureData: [], // current signature data
      db: [], // database of signature data
    }

    this.save = this.save.bind(this);
    this.export = this.export.bind(this);
    this.addPoint = this.addPoint.bind(this);
  }

  save() {
    this.setState({
      db: [this.state.signatureData, ...this.state.db],
      signatureData: []
    });

    var signature = this.refs.signature;
    console.log('signature.toData()', signature.toData());
    signature.clear();
  }

  export() {
    var signature = this.refs.signature;
    console.log(signature.toDataURL());
  }

  addPoint(p) {
    this.setState({ signatureData: [...this.state.signatureData, p] });
  }

  render() {
    const renderStats = (data) => (
      <div className="row">
        <div className="col-4">
          <Stats color="#0275d8" data={data.map(i => i.pressure)} />
        </div>
        <div className="col-4">
          <Stats color="#0275d8" data={data.map(i => i.x)} />
        </div>
        <div className="col-4">
          <Stats color="#0275d8" data={data.map(i => i.y)} />
        </div>
      </div>
    );

    return (
      <div className="App container-fluid">
        <div className="row align-items-center">
          <h1>React Pressure Signature Pad</h1>
        </div>
        <div className="row" >
          <div className="col-12">
          <PressureSignaturePad
            style={{ height: '300px' }}
            onChange={this.addPoint}
            ref="signature" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div style={{ textAlign: 'center' }}>
              <input className="btn btn-sm btn-outline-primary" type="button" onClick={this.save} value="Save data" />
              <input className="btn btn-sm btn-outline-primary" style={{ marginLeft: '5px' }} type="button" onClick={this.export} value="Export image" />
            </div>
          </div>
        </div>
        <div className="row">
          <hr />
        </div>
        <div className="row">
          <div className="col-4">
            <h5>Pressure</h5>
          </div>
          <div className="col-4">
            <h5>X coordinate</h5>
          </div>
          <div className="col-4">
            <h5>Y coordinate</h5>
          </div>
        </div>
        {renderStats(this.state.signatureData)}
        {this.state.db.map(entry => renderStats(entry))}
      </div>
    );
  }
}

export default App;
