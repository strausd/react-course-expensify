import moment from 'moment';

const expenses = [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: moment('12-25-2017', 'MM-DD-YYYY').valueOf(),
    },
    {
        id: '2',
        description: 'Burger',
        note: '',
        amount: 595,
        createdAt: moment('12-24-2017', 'MM-DD-YYYY').valueOf(),
    },
    {
        id: '3',
        description: 'Soda',
        note: '',
        amount: 250,
        createdAt: moment('12-26-2017', 'MM-DD-YYYY').valueOf(),
    },
];

export default expenses;