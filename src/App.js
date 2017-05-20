import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pressure from 'pressure';
import { initCanvas, data, erase } from './Draw';
import SignatureBox from './SignatureBox';

import Stats from './Stats';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressure: 0, // current pressure
      signatureData: [], // current signature data
      db:[], // database of signature data
    }
    this.registerPressure = this.registerPressure.bind(this);
    this.registerInputData = this.registerInputData.bind(this);
    this.save = this.save.bind(this);
  }

  registerPressure(value) {
    // console.log('->', value);
    this.setState({ pressure: value });
  }

  registerInputData(x, y, time) {
    this.setState({ signatureData:
                    [...this.state.signatureData,
                     {x, y, time, pressure: this.state.pressure }]})
  }

  save() {
    console.log(this.state.signatureData);
    this.setState({ db: [...this.state.db, this.state.signatureData], signatureData: [] });
    erase();
  }

  render() {
    const registerPressure = this.registerPressure;
    const registerInputData = this.registerInputData;

    const block =  {
      start: function(event){
        // this is called on force start
      },
      end: function(){
        // this is called on force end
        // printData();
      },
      startDeepPress: function(event){
        // this is called on "force click" / "deep press", aka once the force is greater than 0.5
      },
      endDeepPress: function(){
        // this is called when the "force click" / "deep press" end
      },
      change: function(force, event){
        // this is called every time there is a change in pressure
        // force will always be a value from 0 to 1 on mobile and desktop
        registerPressure(force);
      },
      unsupported: function(){
        // NOTE: this is only called if the polyfill option is disabled!
        // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
        console.log('unsupported');
      }
    };

    document.addEventListener("DOMContentLoaded",function(){
      Pressure.set(document.getElementById('can'), block, {polyfill: false});
      initCanvas(registerInputData);
    });

    const style = {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0.5',
    }

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
          <div style={{position: 'relative', height: '400px'}}>
            <canvas id="can" width="800" height="400"
                    style={{backgroundColor: 'gray', ...style}} />
          </div>
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
