import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';

import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';


export class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarFocused: null
        };
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSortByChange = this.onSortByChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange(calendarFocused) {
        this.setState(() => ({ calendarFocused }));
    }

    onTextChange(e) {
        this.props.setTextFilter(e.target.value);
    }

    onSortByChange(e) {
        if (e.target.value === 'amount') {
            this.props.sortByAmount();
        } else if (e.target.value === 'date') {
            this.props.sortByDate();
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />
                <select
                    name="sortBy"
                    value={this.props.filters.sortBy}
                    onChange={this.onSortByChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        sortByAmount: () => dispatch(sortByAmount()),
        sortByDate: () => dispatch(sortByDate())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
