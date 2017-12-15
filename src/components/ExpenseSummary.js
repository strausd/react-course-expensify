import React from 'react';
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
            <p>Viewing {num_expenses} {expense_string} totalling {amount}</p>
        );
    }

    render() {
        return (
            <div>
                {this.getFinalString()}
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