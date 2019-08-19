import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import spotiFinder from './redux/reducers';
import rootSaga from './sagas';
import { BrowserRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(spotiFinder, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
    	<BrowserRouter>
        	<App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);