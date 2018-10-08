import React, { Component } from 'react';
import { data } from '../vocabList/words';
import $ from 'jquery';
import '../App.css';

class Learn extends Component {
  constructor() {
    super();
    this.state = {
      searchWord: '',
      data: [],
    }
  }

  search(e) {
      var searchVal = e.target.value;
      console.log(searchVal);
      let filtered = [];
      for(var i = 1; i < 3; i++) {
        var wordData = data["" + String(i) + ""];
        for(var j = 0; j < wordData.length; j++) {
          var wordList = wordData[j].words;
          for(var k = 0; k < wordList.length; k++) {
            if(String(wordList[k]).match(searchVal) || String(wordData[j].type).match(searchVal)) {
              filtered.push({ word: wordList[k], type: wordData[j].type });
            }
          }
        }
      }
      this.setState({ searchWord: searchVal, data: filtered });
  }

  render() {
    const { searchVal, data } = this.state;
    const searchedWords = data.map((each) => <div className="opts">{each.word} - <b>{each.type}</b></div>);
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h3 style={{ fontSize: '18px', color: 'black', fontWeight: 500 }}>Search for the words meaning</h3>
            <hr />
            <input type="text" className="wordType" placeholder="Type of word eg: savant" onChange={this.search.bind(this)} />
            <br />
            <div className="search-result">
              {searchedWords}
            </div>
          </div>
          <div className="col-md-4">
            <a href="/" className="btn btn-default test-btn refresh1">EXIT</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Learn;
