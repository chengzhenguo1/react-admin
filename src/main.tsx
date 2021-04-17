import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './views/App'
import store from './store'

import './assets/normalize.less'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root'),
)
