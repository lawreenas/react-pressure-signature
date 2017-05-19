import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pressure from 'pressure';
import * as SignaturePad from 'signature_pad';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressure: 0,
      data: []
    }
    this.setPressure = this.setPressure.bind(this);
  }

  setPressure(value) {
    console.log('->', value);
    this.setState({ pressure: value, data: [...this.state.data, value] });
  }


  render() {
    console.log(SignaturePad);

    const div = (
      <div id="nn" style={{backgroundColor: 'gray', width: '400px', height: '400px'}} />
    );

    const setP = this.setPressure;
    const printData = () => {
      console.log(this.state.data);
    }

    const block =  {
      start: function(event){
        // this is called on force start
        console.log('start', event);
      },
      end: function(){
        // this is called on force end
        console.log('end');
        printData();
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
        setP(force);
      },
      unsupported: function(){
        // NOTE: this is only called if the polyfill option is disabled!
        // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
        console.log('unsupported');
      }
    };

    document.addEventListener("DOMContentLoaded",function(){
      Pressure.set(document.getElementById('nn'), block, {polyfill: false});
    });

    return (
      <div className="App">
        {div}
        {this.state.pressure}
      </div>
    );
  }
}

export default App;
