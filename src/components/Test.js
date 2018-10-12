import React, { Component } from 'react';
import { data } from '../vocabList/words';
import Question from './Question';
import Chart from './Chart';
import $ from 'jquery';

class Test extends Component {
  constructor() {
    super();
    const startTime = Date.now();
    this.state = {
      questions: [],
      lower: 0,
      upper: 0,
      score: 0,
      total: 5,
      chartData: [],
      numTest: 0,
      end: 0,
      qAns: 0,
      startTime: startTime,
      times: [],
      wrong: [],
    }
  }

  lower(e) {
      this.setState({ lower: e.target.value.trim() });
  }

  upper(e) {
      this.setState({ upper: e.target.value.trim() });
  }

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }

  generateQuestions() {
    const { lower, upper } = this.state;
    $(".start, .select, .learn-title").fadeOut(300);
    $(".score-board, .end, .new").fadeIn(200);
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
      options = this.shuffle(options);
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
    this.setState({ questions: questions, numTest: this.state.numTest + 1, end: 0 });
  }

  updateScore(score, id, word, type, right) {
    var timesArray = this.state.times;
    var wrong = this.state.wrong;
    if(this.state.qAns === this.state.total-1) {
      var timesNow = Date.now();
      timesArray.push(timesNow);
    }
    if(right === 0) {
      wrong.push({ word: word, type: type });
    }
    this.setState({ score: score, qAns: this.state.qAns + 1, times: timesArray, wrong: wrong });
  }

  newTest() {
    var chartData = this.state.chartData;
    const { times } = this.state;
    var testTime;
    if(this.state.numTest === 1) {
      testTime = Math.floor((times[this.state.numTest-1] - this.state.startTime)/1000);
    } else {
      testTime = Math.floor((times[this.state.numTest-1] - times[this.state.numTest-2])/1000);
    }
    var eachTestData = {
      name: 'Test '+this.state.numTest.toString(),
      score: this.state.score,
      time: testTime,
    };
    chartData.push(eachTestData);
    this.setState({
      questions: [],
      lower: this.state.lower,
      upper: this.state.upper,
      score: 0,
      total: this.state.total,
      chartData: chartData,
      qAns: 0,
    }, () => {
      this.generateQuestions();
    });
  }

  endTest() {
    $(".score-board, .test-btn .test-area").hide();
    $("#end-btn, #new-btn").hide();
    $(".refresh").show();
    var chartData = this.state.chartData;
    const { times } = this.state;
    var testTime;
    if(this.state.numTest === 1) {
      testTime = Math.floor((times[this.state.numTest-1]- this.state.startTime)/1000);
    } else {
      testTime = Math.floor((times[this.state.numTest-1] - times[this.state.numTest-2])/1000);
    }
    var eachTestData = {
      name: 'Test '+this.state.numTest.toString(),
      score: this.state.score,
      time: testTime,
    };

    chartData.push(eachTestData);
    this.setState({
      questions: [],
      lower: this.state.lower,
      upper: this.state.upper,
      score: 0,
      total: this.state.total,
      chartData: chartData,
      end: 1,
      qAns: 0,
      times: [],
    }, () => {
      $(".testChart, .got-wrong").show(100);
    });
  }

  render() {
    const { questions, chartData, end, wrong } = this.state;
    const renderQuestions = questions.map((each) => <Question key={each.id} data={each} passScore={this.updateScore.bind(this)} state={this.state} />);
    const wrongs = wrong.map((each) => <div className="opts">{each.word} - <b>{each.type}</b></div>)
    let chart;
    if(end == 1) {
      chart = <Chart data={chartData} />;
    }
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-3 col-sm-12 score">
            <div className="score-board">Score: {this.state.score} / {this.state.total} </div>
          </div>
          <div className="col-md-6 learn col-sm-12">
            <h2 className="learn-title">Enter the range of vocab lists to generate test!</h2>
            <hr />
            <table style={{ width: '100%' }} className="select">
              <tr>
                <td><input type="text" className="l" placeholder="min = 1" onChange={this.lower.bind(this)} /></td>
                <td><h4>to</h4></td>
                <td><input type="text" className="r" placeholder="max = 14" onChange={this.upper.bind(this)} /></td>
              </tr>
            </table>
            {chart}
          </div>
          <div className="col-md-3">
            <button className="btn btn-default test-btn end" id="end-btn" onClick={this.endTest.bind(this)}>End Test</button>
            <button className="btn btn-default test-btn new" id="new-btn" onClick={this.newTest.bind(this)}>New Test</button>
            <a href="/" className="btn btn-default test-btn refresh">EXIT</a>
          </div>
        </div>
        <button className="btn btn-default start" onClick={this.generateQuestions.bind(this)}>start</button>
        <div className="test-area">
          {renderQuestions}
        </div>
        {chartData}
        <div className="got-wrong">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h3 className="learn-title1">Words that you got wrong !</h3>
              <br />
              {wrongs}
              <br />
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
