import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ExpenseForm } from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import { SingleDatePicker } from 'react-dates';


test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    // Snapshot before error message shows
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Please provide description and amount.');
    // Snapshot with error message
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'New description yo';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {
    const value = 'This is my new note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set amount if valid input', () => {
    const value = '30.53';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should not set amount if invalidvalid input', () => {
    const value = 'a0.03';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    const onDateChangeProp = wrapper.find('SingleDatePicker').prop('onDateChange');
    onDateChangeProp(now);
    expect(wrapper.state('createdAt')).toBe(now);
});

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const onFocusChangeProp = wrapper.find(SingleDatePicker).prop('onFocusChange');
    expect(wrapper.state('calendarFocused')).toBe(false);
    onFocusChangeProp({focused: true});
    expect(wrapper.state('calendarFocused')).toBe(true);
});