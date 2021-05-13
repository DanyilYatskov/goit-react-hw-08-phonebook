import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../../routes';
import styles from './authNav.module.scss';

const AuthNav = () => (
  <div>
    <NavLink
      to={routes.registerPage}
      exact
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Регистрация
    </NavLink>
    <NavLink
      to={routes.loginPage}
      exact
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Логин
    </NavLink>
  </div>
);

export default AuthNav;
