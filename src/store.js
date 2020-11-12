import { applyMiddleware, compose, createStore } from 'redux'

import freeze from 'redux-freeze'
import { getAuthenticatedUser } from './domains/auth/actions'
import { reducers } from './reducers'
import thunk from 'redux-thunk'

// add the middlewares
let middlewares = []

middlewares.push(thunk)

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
}

// apply the middleware
let middleware = applyMiddleware(...middlewares)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(
    middleware,
    window.devToolsExtension()
  )
}

// create the store
const store = createStore(reducers, middleware)
store
  .dispatch(getAuthenticatedUser())

// export
export { store }