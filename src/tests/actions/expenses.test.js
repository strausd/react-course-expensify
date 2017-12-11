import { addExpense, removeExpense, editExpense } from '../../actions/expenses';


test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Mortgage payment',
        amount: 130000,
        createdAt: 1000,
        note: 'This was last months mortgage payment'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            note: '',
            createdAt: 0,
            id: expect.any(String)
        }
    });
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const updates_obj = {
        description: 'Updated Description',
        amount: 90000,
        note: 'This is my updated note.'
    };
    const action = editExpense('abc123', updates_obj);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: updates_obj
    });
});