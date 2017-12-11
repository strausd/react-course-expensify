import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { AddExpensePage } from '../../components/AddExpensePage';


let addExpense, history, wrapper;

beforeAll(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    const expense = expenses[0];
    wrapper.find('Connect(ExpenseForm)').prop('onSubmit')(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expense);
});