import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import ExpertRoute from '../routes/ExpertRoute';
import Signal from '../../Components/Room/Signal';
import Dashboard from '../../Components/Dashboard/Dashboard/Dashboard';
import ExpertDetail from '../../Components/Experts/Experts/ExpertDetail';
import LoginForm from '../../Components/Auth/Login/LoginForm';
import RegisterForm from '../../Components/Auth/Register/registerForm';
import AccountPage from '../../Components/user/Settings/AccountPage';
import Changepass from '../../Components/user/Settings/Changepassword';
import ReduxToastr from 'react-redux-toastr'
import ManageSignal from '../../Components/ManageSignal/ManageSignal';
import PageRoute from '../routes/PageRoute';
import { connect } from 'react-redux';
import LoadingComponent from './Loading/LoadingComponent'
class App extends Component {
  
  render () {
    
    const { isLoaded } = this.props.profileUser
    const { isAuthenticated } = this.props
    if (isLoaded) {
      return (
        <div>
          <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
          />
          <Switch>
            <ExpertRoute isAuthenticated={isAuthenticated} exact component={Dashboard} path="/" />
            <ExpertRoute isAuthenticated={isAuthenticated} exact component={Signal} path="/experts" />
            <ExpertRoute isAuthenticated={isAuthenticated} component={ExpertDetail} path="/experts/:id" />
            <PageRoute component={LoginForm} path="/login" />
            <PageRoute component={RegisterForm} path="/register" />
            <ExpertRoute isAuthenticated={isAuthenticated} component={AccountPage} path="/information" />
            <ExpertRoute isAuthenticated={isAuthenticated} component={Changepass} path="/changepassword" />
            <ExpertRoute isAuthenticated={isAuthenticated} component={ManageSignal} path="/managesignal" />
          </Switch>
        </div>
      );
    }
    else{
      return (
        <LoadingComponent />
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: !state.firebase.auth.isEmpty,
    currentUser: state.firebase.auth,
    profileUser: state.firebase.profile,
  };
};
const mapDispatchToProps = dispatch => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

