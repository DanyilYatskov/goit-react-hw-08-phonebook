import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactsSelectors from '../redux/contacts/contactsSelectors';
import contactsOperations from '../redux/contacts/contactsOperations';
import Form from '../components/Form';
import Section from '../components/Section/';
import ContactsList from '../components/ContactList/';
import Notification from '../components/Notification/';
import Filter from '../components/Filter/';
import ContactsLoader from '../components/ContactsLoader';

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
};

class ContactsView extends Component {
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
            <div style={styles.loaderContainer}>
              <Filter />
              {isLoading && <ContactsLoader />}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
