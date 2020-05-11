import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import reducer from './reducers';
import App from './components/App';
import rootSaga from './sagas';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

// optional configuration for alerts
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}

render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <App/>
        </AlertProvider>
    </Provider>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept(App);
}

