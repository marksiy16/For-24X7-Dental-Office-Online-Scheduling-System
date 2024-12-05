import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; 

// Define the initial state for the Redux store (empty object in this case)
const initialState = {};

// Create an array to store the middleware used in the Redux store
const middleware = [thunk];

// Check if Redux DevTools extension is available in the current environment
const devToolsExtension =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f; // No-op function, does nothing

// Create the Redux store using createStore()
const store = createStore(
  rootReducer,  // The rootReducer is the main reducer for the app, combining all individual reducers
  initialState,  // The initial state of the Redux store
  compose(  // Compose is used to combine multiple store enhancers (middleware, Redux DevTools, etc.)
    applyMiddleware(...middleware),  // Apply the middleware, spread the middleware array here (in this case, thunk)
    // Add Redux DevTools extension for debugging (if available in the browser)
    devToolsExtension
  )
);

// Export the store so it can be provided to the React app
export default store;
