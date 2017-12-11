import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';

import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({
    description: 'Water bill',
    note: 'This is my water bill',
    amount: 7700,
    createdAt: 50
}));

store.dispatch(addExpense({
    description: 'Gas bill',
    note: 'For cooking and stuff',
    amount: 8500,
    createdAt: 10
}));

store.dispatch(addExpense({
    description: 'Mortgage',
    note: 'For cooking and stuff',
    amount: 130000,
    createdAt: 123456
}));

const state = store.getState();
// store.subscribe(() => {
//     console.log(store.getState());
// });

const jsx = (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
