import React, { Component, Suspense, lazy } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { authOperations } from './redux/authentication';
import AppBar from './components/AppBar';
import Container from './components/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Loader from './components/Loader';
import { Route, Switch } from 'react-router';
import routes from './routes';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const ContactsView = lazy(() => import('./views/ContactsView'));
const NotFoundView = lazy(() => import('./views/NotFoundView'));

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <>
        <AppBar />
        <Container>
          <Suspense fallback={<Loader />}>
            <Switch>
              <PublicRoute exact path={routes.homePage} component={HomeView} />
              <PublicRoute
                path={routes.registerPage}
                restricted
                redirectTo={routes.contactsPage}
                component={RegisterView}
              />
              <PublicRoute
                path={routes.loginPage}
                restricted
                redirectTo={routes.contactsPage}
                component={LoginView}
              />
              <PrivateRoute
                path={routes.contactsPage}
                redirectTo={routes.loginPage}
                component={ContactsView}
              />
              {/* <Route path={routes.contactsPage} component={ContactsView} /> */}
              <Route component={NotFoundView} />
            </Switch>
          </Suspense>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
