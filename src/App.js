import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom';
import Test from './components/Test';
import Learn from './components/Learn';
import Add from './components/Add';
import Options from './components/Options';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={Options} />
        <Route path="/test" component={Test} />
        <Route path="/learn" component={Learn} />
        <Route path="/add" component={Add} />
      </Switch>
    );
  }
}

export default App;
