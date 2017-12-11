import moment from 'moment';

import filtersReducer from '../../reducers/filters';


const defaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        ...defaultState
    });
});

test('should set text filter on state', () => {
    const filter_text = 'Afton'
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text: filter_text
    });
    expect(state).toEqual({
        ...defaultState,
        text: filter_text
    });
});

test('should set sortBy to amount on state', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state).toEqual({
        ...defaultState,
        sortBy: 'amount'
    });
});

test('should set sortBy to date on state', () => {
    const startingState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const state = filtersReducer(startingState, { type: 'SORT_BY_DATE' });
    expect(state).toEqual({
        ...startingState,
        sortBy: 'date'
    });
});

test('should set startDate filter', () => {
    const startDate = moment(34567654);
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate
    });
    expect(state).toEqual({
        ...defaultState,
        startDate
    });
    expect(state).not.toEqual(defaultState);
});

test('should set endDate filter', () => {
    const endDate = moment(defaultState.endDate).add(1, 'month');
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate
    });
    expect(state).toEqual({
        ...defaultState,
        endDate
    });
    expect(state).not.toEqual(defaultState);
});