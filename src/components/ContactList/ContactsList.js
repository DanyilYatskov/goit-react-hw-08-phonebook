import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contactsSelectors from '../../redux/contacts/contactsSelectors';
import ContactListItem from './ContactListItem';
import styles from './contactList.module.scss';

const ContactList = ({ contacts }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contactName={contact.name}
          contactNumber={contact.number}
          contactId={contact.id}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getFilteredContacts(state),
});

export default connect(mapStateToProps, null)(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};
