import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteExpense = this.onDeleteExpense.bind(this);
    }

    onSubmit(expense) {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onDeleteExpense(e) {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h2 className="page-header__title">Edit Expense</h2>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onDeleteExpense}>
                        Delete Expense
                    </button>
                </div>
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
        startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
        startRemoveExpense: ({ id }) => dispatch(startRemoveExpense({ id }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
