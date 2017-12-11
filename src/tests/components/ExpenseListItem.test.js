import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';


test('should render one expense list item', () => {
    const wrapper = shallow(<ExpenseListItem key={expenses[0].is} {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});