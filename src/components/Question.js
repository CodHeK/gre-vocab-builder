import React, { Component } from 'react';
import $ from 'jquery';
import '../App.css';

class Learn extends Component {
  constructor(props) {
    super(props);
  }

  check(each, e) {
    console.log(each);
    console.log(this.props.data.type);
    if(this.props.data.type == each) {
      $("#"+this.props.data.word+each+this.props.data.type+"").css({'background-color': 'green'});
    }
    else {
      $("#"+this.props.data.word+each+this.props.data.type+"").css({'background-color': 'red'});
    }
  }

  render() {
    const options = this.props.data.options.map((each) => <div id={this.props.data.word+each+this.props.data.type} className="opts" onClick={this.check.bind(this, each)}>{each}</div>)
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="jumbotron">
              {this.props.data.word}
            </div>
            {options}
          </div>
          <div className="col-md-4">
            <div className="status"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Learn;
