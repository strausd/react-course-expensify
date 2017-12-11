import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteExpense = this.onDeleteExpense.bind(this);
    }

    onSubmit(expense) {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onDeleteExpense(e) {
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onDeleteExpense}>
                    Delete Expense
                </button>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editExpense: (id, expense) => dispatch(editExpense(id, expense)),
        removeExpense: ({ id }) => dispatch(removeExpense({ id }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
