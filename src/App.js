import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuizSelect from './components/QuizSelect'
import QuizTitle from './components/QuizTitle'
import Questions from './components/Questions'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={QuizSelect} exact/>
        <Route path="/quiz/:category" component={QuizTitle} exact/>
        <Route path="/quiz/:category/:title" component={Questions} exact/>
      </Switch>
    </Router>
  )
}
export default App;
