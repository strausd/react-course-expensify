import authReducer from '../../reducers/auth';


const defaultState = {
    uid: 'somestringhere'
};

test('should set uid on login', () => {
    const uid = 'myrandomuid';
    const state = authReducer({}, { type: 'LOGIN', uid });
    expect(state).toEqual({
        ...defaultState,
        uid
    });
});

test('should clear auth object on logout', () => {
    const state = authReducer(defaultState, { type: 'LOGOUT' });
    expect(state).toEqual({});
});