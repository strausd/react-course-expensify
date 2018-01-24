import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';


// Class version of what is happening in stateless functional version

// export class PrivateRoute extends React.Component {
//     constructor(props) {
//         super(props);
//         this.getRouteComponent = this.getRouteComponent.bind(this);
//         this.rest = {};
//         for (let property in props) {
//             if (property !== 'isAuthenticated' && property !== 'component') {
//                 this.rest[property] = props[property];
//             }
//         }
//     }

//     getRouteComponent(props) {
//         const { isAuthenticated, component: Component } = this.props;
//         if (isAuthenticated) {
//             return <Component {...props}/>;
//         } else {
//             return <Redirect to="/" />
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <Route {...this.rest} component={this.getRouteComponent}/>
//             </div>
//         );
//     }
// }

export const PrivateRoute = ({ isAuthenticated, component:Component, ...rest }) => {
    return (
        <Route {...rest} component={ (props) => {
            return (
                isAuthenticated ? (
                    <div>
                        <Header />
                        <Component {...props}/>
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            );
        }} />
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.uid ? true : false
    };
};

export default connect(mapStateToProps)(PrivateRoute);