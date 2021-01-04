import React from 'react'
import ReactDOM from 'react-dom'
import PlaidLink from './components/PlaidLink/PlaidLink'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import store from './redux/store'
import history from "./history"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <PlaidLink />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)