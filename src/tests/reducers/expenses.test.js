import uuid from 'uuid';
import moment from 'moment';

import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


const test_expense = {
    id: uuid(),
    description: 'Test expense',
    note: 'This is some test note',
    amount: 195,
    createdAt: moment()
};

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const num_expenses = expenses.length;
    const expense_to_remove = expenses[0];
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expense_to_remove.id
    };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(num_expenses - 1);
    state.forEach((expense) => {
        expect(expense.id).not.toBe(expense_to_remove.id);
    });
});

test('should not remove expense if ID not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: test_expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        ...expenses,
        test_expense
    ]);
});

test('should edit an expense', () => {
    const new_description = 'jashkjashlgkh4235564kjnglkdfns';
    const expense = expenses[0];
    const action = {
        type: 'EDIT_EXPENSE',
        id: expense.id,
        updates: {
            ...expense,
            description: new_description
        }
    }
    const state = expensesReducer(expenses, action);
    state.forEach((e) => {
        if (e.id === expense.id) {
            expect(e).toEqual({
                ...expense,
                description: new_description
            });
        }
    });
});

test('should not edit expense if expense not found', () => {
    const new_description = 'jashkjashlgkh4235564kjnglkdfns';
    const expense = expenses[0];
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            ...expense,
            description: new_description
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});