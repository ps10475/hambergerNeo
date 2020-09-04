import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// add component
import Layout from './Components/Layout/Layout';
import Checkout from './Containers/Checkout/Checkout';
import Logout from './Containers/Auth/Logout';
import * as actions from './Store/Action/actionRoot';
import asyncComponent from './HOC/asyncComponent';

const BurgerBuilder = lazy(()=> import('./Containers/BurgerBuilder/BurgerBuilder'))
const Orders = lazy(()=> import('./Containers/Orders/Orders'));
const Auth = asyncComponent(() => import('./Containers/Auth/Auth'))

class App extends Component {
  componentDidMount() {
    this.props.checkAuth()
  }
  render() {
    let routes =
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    if (this.props.isAuth) {
      routes =
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={Auth} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
    }
    return (
      <Suspense fallback={<div>loading...</div>} >
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actions.checkAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
