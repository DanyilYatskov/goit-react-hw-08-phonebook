import React from 'react';
import ReactLoader from 'react-loader-spinner';
import styles from './loader.module.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <ReactLoader
      className={styles.loader}
      type="TailSpin"
      color="#00BFFF"
      height={30}
      width={30}
      timeout={13000}
    />
  );
};

export default Loader;
