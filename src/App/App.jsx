import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Dashboard } from '../components/Dashboard';
import { LoginPage } from '../components/LoginPage';
import { RegisterPage } from '../components/RegisterPage';

import '../index.css';
import 'reactjs-toastr/lib/toast.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="container-fluid">
                <div className="">
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 