import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { filters } from '../fixtures/filters'
import { getVisibleExpenses, getExpensesTotal } from '../../selectors/expenses'
import { ExpenseSummary } from '../../components/ExpenseSummary';


test('should render ExpenseSummary with multiple expenses', () => {
    const wrapper = shallow(
        <ExpenseSummary
            getVisibleExpenses={() => getVisibleExpenses(expenses, filters)}
            getExpensesTotal={(es) => getExpensesTotal(es)}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with one expense', () => {
    const wrapper = shallow(
        <ExpenseSummary
            getVisibleExpenses={() => getVisibleExpenses(expenses, {...filters, text: expenses[0].description})}
            getExpensesTotal={(es) => getExpensesTotal(es)}
        />
    );
    expect(wrapper).toMatchSnapshot();
});