import React, { Component } from 'react';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      lower: 0,
      upper: 0,
    }
  }

  lower(e) {
    if(e.which === 13) {
      this.setState({ lower: e.target.value });
    }
  }

  upper(e) {
    if(e.which === 13) {
      this.setState({ upper: e.target.value });
    }
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 learn">
            <h2 className="learn-title">Enter the range of vocab lists to take test!</h2>
            <hr />
            <table style={{ width: '100%' }}>
              <tr>
                <td><input type="text" className="l" placeholder="min = 1" onKeyPress={this.lower.bind(this)} /></td>
                <td><h4>to</h4></td>
                <td><input type="text" className="r" placeholder="max = 14" onKeyPress={this.upper.bind(this)} /></td>
              </tr>
            </table>
          </div>
          <div className="col-md-3"></div>
        </div>

      </div>
    );
  }
}

export default Test;
