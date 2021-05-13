import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contactsReducer';

const middleware = [
  ...getDefaultMiddleware(),
  // logger,
];
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  middleware,
  // devTools: process.env.NODE_ENV === 'development',
});

export default store;
