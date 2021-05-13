import React, { Component, Suspense, lazy } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import contactsSelectors from './redux/contacts/contactsSelectors';
import contactsOperations from './redux/contacts/contactsOperations';
import Form from './components/Form';
import Section from './components/Section/';
import ContactsList from './components/ContactList/';
import Notification from './components/Notification/';
import Filter from './components/Filter/';
import Loader from './components/Loader';
import AppBar from './components/AppBar';
import Container from './components/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    const { contacts, isLoading } = this.props;

    return (
      <>
        <AppBar />
        <Container>
          <div className="App">
            <Section title="Phonebook">
              <Form />
            </Section>

            {contacts.length > 0 ? (
              <Section title="Contacts">
                <Filter />
                {isLoading && <Loader />}
                <ContactsList />
              </Section>
            ) : (
              <Notification message="Contacts are missing" />
            )}
            <ToastContainer />
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getContacts(state),
  isLoading: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
