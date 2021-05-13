import React from 'react';
//import PropTypes from 'prop-types';
//import fetchAPI from '../../../API/fetchAPI';
import { NavLink } from 'react-router-dom';
import routes from '../../../routes';
import styles from './navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        exact
        to={routes.homePage}
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Home
      </NavLink>
      <NavLink
        to={routes.contactsPage}
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;
