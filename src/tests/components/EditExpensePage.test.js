import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';


let wrapper, startEditExpense, startRemoveExpense, expense, history;

beforeAll(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() }
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} history={history} expense={expense} />);
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should verify onSubmit calls functions with proper data', () => {
    const component_expense = wrapper.find('Connect(ExpenseForm)').prop('expense');
    expect(component_expense).toEqual(expense);
    wrapper.find('Connect(ExpenseForm)').prop('onSubmit')(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should verify onDeleteExpense calls function with proper data', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id });
});