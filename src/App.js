import React, { Component } from 'react';

import PressureSignaturePad from './PressureSignaturePad';
import Stats from './Stats';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signatureData: [], // current signature data
      db:[], // database of signature data
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
        <div className="col-xs-4">
          <Stats color="teal" data={data.map(i => i.pressure)} />
        </div>
        <div className="col-xs-4">
          <Stats color="blue" data={data.map(i => i.x)} />
        </div>
        <div className="col-xs-4">
          <Stats color="purple" data={data.map(i => i.y)} />
        </div>
      </div>
    );

    return (
      <div className="App">
       <div className="row" >
        <PressureSignaturePad 
            onChange={this.addPoint}
            ref="signature" />
       </div>
        <div className="row" >
          <div className="col-xs-6">
           
          </div>
          <div className="col-xs-6">
            <input className="btn btn-primary" type="button" onClick={this.save} value="Save" />
            <input className="btn btn-primary" type="button" onClick={this.export} value="Export" />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">
            Pressure
          </div>
          <div className="col-xs-4">
            X coordinate
          </div>
          <div className="col-xs-4">
            Y coordinate
          </div>
        </div>
         { renderStats(this.state.signatureData)}
         { this.state.db.map(entry => renderStats(entry)) }
      </div>
    );
  }
}

export default App;
