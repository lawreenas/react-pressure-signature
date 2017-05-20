import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { initCanvas, data, erase } from './Draw';
import SignatureBox from './SignatureBox';


import PressureSignature from './PressureSignature';
import SignaturePad from 'react-signature-pad';

import Stats from './Stats';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressure: 0, // current pressure
      signatureData: [], // current signature data
      db:[], // database of signature data
    }

    this.save = this.save.bind(this);
    this.addPoint = this.addPoint.bind(this);
  }

  save(data) {
    console.log(data);
    this.setState({ db: [this.state.signatureData, ...this.state.db], signatureData: [] });

    var signature = this.refs.mySignature;
    signature.clear();
    // erase();
  }

  addPoint(p) {
    this.setState({ signatureData: [...this.state.signatureData, p] });
  }

  render() {
    const renderStats = (data) => (
      <div className="row">
        <div className="col-xs-6">
          <Stats color="red" data={data.map(i => i.pressure)} />
        </div>
        <div className="col-xs-6">
          <Stats color="blue" data={data.map(i => i.x)} />
        </div>
      </div>
    );

    return (
      <div className="App">
       <div className="row" >
        <PressureSignature
          onChange={this.addPoint}
          clearButton="true"
          ref="mySignature" />
       </div>
        <div className="row" >
          <div className="col-xs-6">
            {this.state.pressure}
          </div>
          <div className="col-xs-6">
            <input className="btn btn-primary" type="button" onClick={this.save} value="Save" />
          </div>
        </div>

         { renderStats(this.state.signatureData)}
         {
           this.state.db.map(entry => renderStats(entry))
         }
      </div>
    );
  }
}

export default App;
