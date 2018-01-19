import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { getExpensesTotal, getVisibleExpenses } from '../selectors/expenses';


export class ExpenseSummary extends React.Component {
    constructor(props) {
        super(props);
        this.getFormattedExpenseTotal = this.getFormattedExpenseTotal.bind(this);
        this.getFinalString = this.getFinalString.bind(this);
    }

    getFormattedExpenseTotal() {
        const amount = this.props.getExpensesTotal(this.props.getVisibleExpenses());
        return numeral(amount / 100).format('$0,0.00');
    }

    getFinalString() {
        const num_expenses = this.props.getVisibleExpenses().length;
        const amount = this.getFormattedExpenseTotal();
        const expense_string = num_expenses === 1 ? 'expense' : 'expenses';
        return (
            <h2 className="page-header__title">Viewing <span className="bold">{num_expenses}</span> {expense_string} totalling <span className="bold">{amount}</span></h2>
        );
    }

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    {this.getFinalString()}
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        getVisibleExpenses: () => getVisibleExpenses(state.expenses, state.filters),
        getExpensesTotal: (expenses) => getExpensesTotal(expenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);