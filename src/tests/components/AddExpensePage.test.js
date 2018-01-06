import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { AddExpensePage } from '../../components/AddExpensePage';


let startAddExpense, history, wrapper;

beforeAll(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    const expense = expenses[0];
    wrapper.find('Connect(ExpenseForm)').prop('onSubmit')(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expense);
});