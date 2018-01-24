import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import { getVisibleExpenses } from '../selectors/expenses';

export class ExpenseList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-container">
                <div className="list-header">
                    <div className="show-for-mobile">Expenses</div>
                    <div className="show-for-desktop">Expense</div>
                    <div className="show-for-desktop">Amount</div>
                </div>
                <div className="list-body">
                    {
                        this.props.expenses.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>No expenses</span>
                            </div>
                        ) : (
                                this.props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
                            )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);
