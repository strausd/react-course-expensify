import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import moment from 'moment';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { getVisibleExpenses } from './selectors/expenses';

import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();

// store.dispatch(addExpense({ description: 'Cable', amount: 595, createdAt: moment().add(2, 'days') }));
// store.dispatch(addExpense({ description: 'Food', amount: 1274, createdAt: moment().subtract(10, 'days') }));
// store.dispatch(addExpense({ description: 'Mortgage', amount: 120000, createdAt: moment() }));
// store.dispatch(addExpense({ description: 'Cable bill', amount: 6012, createdAt: moment().add(5, 'days') }));

const jsx = (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
