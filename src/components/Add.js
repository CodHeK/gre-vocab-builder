import React, { Component } from 'react';
import { data } from '../vocabList/words';
import $ from 'jquery';
import '../App.css';

class Add extends Component {
  constructor() {
    super();
    this.state = {
      wordType: '',
      meaning: '',
    }
  }

  wordType(e) {
      this.setState({ wordType: e.target.value.trim() });
  }

  meaning(e) {
      this.setState({ meaning: e.target.value.trim() });
  }

  addDash(wordType) {
    var newType = '', type;
    type = wordType.trim();
    type = type.split(' ');
    var newType = '';
    for(var i = 0;i < type.length - 1;i++) {
      newType += (type[i]+'-');
    }
    newType += type[type.length-1];
    return newType;
  }

  add() {
    const { wordType, meaning } = this.state;
    var wordList = meaning, type = wordType;
    wordList = wordList.trim().split(',');
    for(var i = 0;i < wordList.length;i++) {
      wordList[i] = this.addDash(wordList[i].trim());
    }
    type = this.addDash(type);
    var obj = {
      "type": type,
      "words": wordList,
    }

    data["1"].push(obj);

    var statusSet = setTimeout(function() {
      $(".addStatus").text("Word Added !");
    }, 500)
    clearTimeout(statusSet);
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h3 style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>Add a new word / type and its meaning(s)</h3>
            <hr />
            <input type="text" className="wordType" placeholder="Type of word eg: very-talanted" onChange={this.wordType.bind(this)} />
            <br />
            <input type="text" className="meaning" placeholder="Meanings, eg: prodigy, precocious, savant" onChange={this.meaning.bind(this)} />
            <span style={{ fontSize: '12px', color: 'black', fontWeight: 100 }}>( must be comma separated )</span>
            <br />
            <button className="btn btn-default start" onClick={this.add.bind(this)}>ADD</button>
          </div>
          <div className="col-md-4">
              <a href="/" className="btn btn-default test-btn refresh1">EXIT</a>
              <div className="addStatus"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
