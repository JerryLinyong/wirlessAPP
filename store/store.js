import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas"
import rootReducers  from './reducers'

const rootSagaMiddleware = createSagaMiddleware()

export function configureStore() {
    const store = createStore(rootReducers, applyMiddleware(rootSagaMiddleware));
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  
    return store;
  }


const rootStore =configureStore()

rootStore.runSaga=()=>rootSagaMiddleware.run(rootSaga)

export default rootStore 