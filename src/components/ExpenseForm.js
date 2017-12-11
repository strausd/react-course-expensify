import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';

import { removeExpense } from '../actions/expenses';


export class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
        };
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.displayErrorMessage = this.displayErrorMessage.bind(this);
    }

    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    onNoteChange(e) {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onAmountChange(e) {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    onDateChange(createdAt) {
        this.setState(() => ({ createdAt }));
    }

    onFocusChange({ focused }) {
        this.setState(() => ({
            calendarFocused: focused
        }));
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.description && this.state.amount ) {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: Math.round(parseFloat(this.state.amount) * 100),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        } else {
            this.setState(() => ({error: 'Please provide description and amount.'}));
        }
    }

    displayErrorMessage() {
        if (this.state.error) {
            return (
                <p>{this.state.error}</p>
            );
        } else {
            return undefined;
        }
    }

    render() {
        return (
            <div>
                {this.displayErrorMessage()}
                <form
                    onSubmit={this.onSubmit}
                >
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        showClearDate={true}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Save Expense</button>
                </form>
            </div>
        );
    }
}

export default connect()(ExpenseForm);
