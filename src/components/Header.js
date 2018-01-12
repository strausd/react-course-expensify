import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink activeClassName="is-active" to="/dashboard">Dashboard</NavLink>
        <NavLink activeClassName="is-active" to="/create">Create Expense</NavLink>
        <button onClick={ startLogout }>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    };
}

export default withRouter(connect(undefined, mapDispatchToProps)(Header));
