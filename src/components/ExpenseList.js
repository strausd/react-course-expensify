import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import { getVisibleExpenses } from '../selectors/expenses';
import { startSetExpenses } from '../actions/expenses';

export class ExpenseList extends React.Component {
    constructor(props) {
        super(props);
        props.startSetExpenses();
    }

    render() {
        return (
            <div>
                {
                    this.props.expenses.length === 0 ? (
                        <p>No expenses</p>
                    ) : (
                            this.props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetExpenses: () => dispatch(startSetExpenses())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
