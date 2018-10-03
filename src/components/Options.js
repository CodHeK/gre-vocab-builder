import React, { Component } from 'react';
import '../App.css';

class Options extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <a href="/test" className="btn btn-default">TEST</a>
            <a href="/learn" className="btn btn-default">LEARN</a>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default Options;
