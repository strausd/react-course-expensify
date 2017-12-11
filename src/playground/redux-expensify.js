import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 }) => {
    return {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    };
};

const removeExpense = ({ id }) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    };
};

const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id,
        updates
    };
};

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => {
                return expense.id !== action.id;
            });
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense;
            });
        default:
            return state;
    }
};

const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT_FILTER',
        text
    };
};

const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'
    };
};

const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    };
};

const setStartDate = (startDate) => {
    return {
        type: 'SET_START_DATE',
        startDate
    };
};

const setEndDate = (endDate) => {
    return {
        type: 'SET_END_DATE',
        endDate
    };
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
        description: 'First expense',
        note: 'This is some detail text',
        amount: 1000,
        createdAt: 2000
    }));

const expenseTwo = store.dispatch(addExpense({
        description: 'Second expense',
        note: 'This is some detail text',
        amount: 15000,
        createdAt: 1000
    }));

// const removedExpense = store.dispatch(removeExpense({ id: expenseTwo.expense.id }));
//
// store.dispatch(editExpense(expenseOne.expense.id, {
//     description: 'This is another edited expense right here man',
//     amount: 123456789
// }));
//
// store.dispatch(setTextFilter('FIRST'));
// store.dispatch(setTextFilter());
//
console.log('sort by amount');
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
//
// store.dispatch(setStartDate(500));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1500));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [
        {
            id: 'jhgjklueruinv',
            description: 'January Rent',
            notes: 'This was the final payment for that address',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};
