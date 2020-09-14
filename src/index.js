import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import {BrowserRouter as Router} from "react-router-dom";
import TaskContext from "./components/taskContext";
import TaskInfo from "./services/service";
import ErrorBoundry from "./components/errorBoundry"
import {Provider} from "react-redux";
import store from "./store";
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <TaskContext.Provider value={TaskInfo}>
        <Router>
            <App/>
        </Router>
      </TaskContext.Provider>
    </ErrorBoundry>
  </Provider>
  ,
  document.getElementById('root')
);
