import uuid from 'uuid';

import database from '../firebase/firebase';

export const addExpense = (expense) => {
    return {
        type: 'ADD_EXPENSE',
        expense
    };
};

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        }).catch(() => {});
    }
};

export const removeExpense = ({ id }) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    };
};

export const editExpense = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id,
        updates
    };
};

export const setExpenses = (expenses) => {
    return {
        type: 'SET_EXPENSES',
        expenses
    }
};

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((dataSnapshot) => {
            const expenses = [];
            dataSnapshot.forEach((childSnapshot) => {
                const expenseData = childSnapshot.val();
                expenses.push({
                    id: childSnapshot.key,
                    ...expenseData
                });
            });
            dispatch(setExpenses(expenses));
        }).catch(() => {});
    };
};