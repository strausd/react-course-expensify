const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    if (typeof timestamp === 'string') {
        const new_time = moment(timestamp, 'MM-DD-YYYY');
        return new_time;
    } else {
        return moment(timestamp);
    }
};