import moment from 'moment';

import { getVisibleExpenses, getExpensesTotal } from '../../selectors/expenses';
import expenses from '../fixtures/expenses';


// getVisibleExpenses Tests
test('should filter by text value', () => {
    const filters = {
        text: 'g',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[0],
        expenses[1]
    ]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment('12-25-2017', 'MM-DD-YYYY'),
        endDate: undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[0]
    ]);
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment('12-25-2017', 'MM-DD-YYYY')
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[0],
        expenses[1]
    ]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate:undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[2],
        expenses[0],
        expenses[1]
    ]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate:undefined
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([
        expenses[1],
        expenses[2],
        expenses[0]
    ]);
});

// getExpensesTotal Tests
test('should return 0 if no expenses', () => {
    const total = getExpensesTotal();
    expect(total).toEqual(0);
});

test('should correctly add up a single expense', () => {
    const expense = expenses[0];
    const total = getExpensesTotal([expense]);
    expect(total).toEqual(expense.amount);
});

test('should correctly add up multiple expenses', () => {
    const total = getExpensesTotal(expenses);
    let expected_total = 0;
    expenses.forEach(e => expected_total += e.amount);
    expect(total).toEqual(expected_total);
});