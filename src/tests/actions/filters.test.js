import moment from 'moment'

import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';


test('should create set text filter action with text set to provider value', () => {
    const provided_text = 'Afton';
    const action = setTextFilter(provided_text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: provided_text
    });
});

test('should create set text filter action with text set to default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should create sort by amount action object', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should create sort by date action object', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('should create set start date action object with provided value', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should create set end date action object with provided value', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});