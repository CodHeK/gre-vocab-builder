import React, { Component } from 'react';
import { data } from '../vocabList/words';
import Question from './Question';
import $ from 'jquery';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      lower: 0,
      upper: 0,
      score: 0,
      total: 10,
    }
  }

  lower(e) {
      this.setState({ lower: e.target.value.trim() });
  }

  upper(e) {
      this.setState({ upper: e.target.value.trim() });
  }

  generateQuestions() {
    const { lower, upper } = this.state;
    $(".start, .select, .learn-title").fadeOut(300);
    $(".score-board").fadeIn(200);
    var num = this.state.total, min = lower, max = upper;
    var questions = [];
    var wordMap = new Map();
    while(num != 0) {
      var vocabList = Math.floor(Math.random() * (+max - +min) + +min);
      var wordList = data["" + vocabList + ""];
      var randomType = Math.floor(Math.random() * (wordList.length - 0) + 0);
      var opts = 4, options = [];
      var map = new Map();
      while(opts != 0) {
        var optionType = Math.floor(Math.random() * (wordList.length - 0) + 0);
        if(map.has(wordList[optionType].type))
          continue;
        else {
          map.set(wordList[optionType].type, 1);
          options.push(wordList[optionType].type);
          opts--;
        }
      }
      var idx = options.indexOf(wordList[randomType].type);
      if(idx == -1) {
        options.pop();
        options.push(wordList[randomType].type)
      }
      var typeWords = wordList[randomType].words;
      var randomWord = Math.floor(Math.random() * (typeWords.length - 0) + 0);

      if(wordMap.has(typeWords[randomWord]))
        continue;
      else {
        questions.push(
          {
            id: num,
            type: wordList[randomType].type,
            word: typeWords[randomWord],
            options: options,
          }
        );
        wordMap.set(typeWords[randomWord], 1);
        num--;
      }
    }
    this.setState({ questions: questions });
  }

  updateScore(score) {
    this.setState({ score: score });
  }

  render() {
    const { questions } = this.state;
    const renderQuestions = questions.map((each) => <Question key={each.id} data={each} passScore={this.updateScore.bind(this)} state={this.state} />);
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-3">
            <div className="score-board">Score: {this.state.score} / {this.state.total} </div>
          </div>
          <div className="col-md-6 learn">
            <h2 className="learn-title">Enter the range of vocab lists to generate test!</h2>
            <hr />
            <table style={{ width: '100%' }} className="select">
              <tr>
                <td><input type="text" className="l" placeholder="min = 1" onChange={this.lower.bind(this)} /></td>
                <td><h4>to</h4></td>
                <td><input type="text" className="r" placeholder="max = 14" onChange={this.upper.bind(this)} /></td>
              </tr>
            </table>
          </div>
          <div className="col-md-3"></div>
        </div>
        <button className="btn btn-default start" onClick={this.generateQuestions.bind(this)}>start</button>
        <div className="test-area">
          {renderQuestions}
        </div>
      </div>
    );
  }
}

export default Test;
