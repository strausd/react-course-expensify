import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';


let wrapper, editExpense, removeExpense, expense, history;

beforeAll(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() }
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expense} />);
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should verify onSubmit calls functions with proper data', () => {
    const component_expense = wrapper.find('Connect(ExpenseForm)').prop('expense');
    expect(component_expense).toEqual(expense);
    wrapper.find('Connect(ExpenseForm)').prop('onSubmit')(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should verify onDeleteExpense calls function with proper data', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expense.id });
});