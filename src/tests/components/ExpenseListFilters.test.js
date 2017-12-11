import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';

import { filters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';


let wrapper, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters component properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters component properly with alternate filter data', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const filter_text = {
        target: {
            value: 'testing123'
        }
    };
    wrapper.find('input').simulate('change', filter_text);
    expect(setTextFilter).toHaveBeenLastCalledWith(filter_text.target.value);
});

test('should handle sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    const newSortBy = {
        target: {
            value: 'date'
        }
    };
    wrapper.find('select').simulate('change', newSortBy);
    expect(sortByDate).toHaveBeenCalled();
    expect(sortByAmount).not.toHaveBeenCalled();
});

test('should handle sort by amount', () => {
    const newSortBy = {
        target: {
            value: 'amount'
        }
    };
    wrapper.find('select').simulate('change', newSortBy);
    expect(sortByAmount).toHaveBeenCalled();
    expect(sortByDate).not.toHaveBeenCalled();
});

test('should handle date changes', () => {
    const newStartDate = moment();
    const newEndDate = moment().add(3, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: newStartDate,
        endDate: newEndDate
    });
    expect(setStartDate).toHaveBeenLastCalledWith(newStartDate);
    expect(setEndDate).toHaveBeenLastCalledWith(newEndDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state()).toEqual({ calendarFocused });
});