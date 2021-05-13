import React, { Component } from 'react';
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

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    const { contacts, isLoading } = this.props;

    return (
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
