import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import AuthNav from './AuthNav/';
import { authSelectors } from '../../redux/authentication';
//import Container from '../Container';
import styles from './appBar.module.scss';

const AppBar = ({ loggedIn }) => {
  return (
    <header className={styles.appBar}>
      <div className={styles.container}>
        <Navigation />
        {loggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  loggedIn: authSelectors.getIfLoggedIn(state),
});

export default connect(mapStateToProps)(AppBar);
