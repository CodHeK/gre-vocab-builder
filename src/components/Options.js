import React, { Component } from 'react';
import '../App.css';

class Options extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 module">
            <a href="/test" className="btn btn-default test-btn">Take a Test</a>
            <hr />
            <a href="/learn" className="btn btn-default learn-btn">Learn/Search</a>
            <hr />
            <a href="/add" className="btn btn-default learn-btn">Add words?</a>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default Options;
