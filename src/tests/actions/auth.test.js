import { login, logout } from '../../actions/auth';


test('should create login action object', () => {
    const uid = 'thisistotallyarandomuid';
    expect(login(uid)).toEqual({ type: 'LOGIN', uid });
});

test('should create logout action object', () => {
    expect(logout()).toEqual({ type: 'LOGOUT' });
});