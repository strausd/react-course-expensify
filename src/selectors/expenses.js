import moment from 'moment';

// Get visible expenses
export const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment) : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment): true;
        const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export const getExpensesTotal = (expenses = []) => {
    let total = 0;
    expenses.forEach(expense => total += expense.amount);
    return total;
};
