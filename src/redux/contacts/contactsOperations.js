import axios from 'axios';
import { toast } from 'react-toastify';
import contactsActions from './contactsActions';
const {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} = contactsActions;

const checkIfContactExists = (contacts, newContact) => {
  const contactFound = contacts.find(
    contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
  );
  if (contactFound !== undefined) {
    const notify = () =>
      toast.error(`${newContact.name} is already in contacts`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
    return true;
  }
  return false;
};

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
};

const addNewContact = (name, number) => dispatch => {
  const newContact = {
    name,
    number,
  };
  dispatch(addContactRequest());
  axios
    .get('/contacts')
    .then(response => {
      const oldContacts = response.data;
      if (checkIfContactExists(oldContacts, newContact) === true) return;
      axios
        .post('/contacts', newContact)
        .then(({ data }) => dispatch(addContactSuccess(data)));
    })
    .catch(error => dispatch(addContactError(error)));
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

const contactsOperations = {
  deleteContact,
  addNewContact,
  fetchContacts,
};
export default contactsOperations;
