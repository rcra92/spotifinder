import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import { checkToken } from './redux/actions';
import spotiFinder from './redux/reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(spotiFinder, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

store.dispatch(checkToken());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);