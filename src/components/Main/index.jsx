import React from 'react';
import { ToastContainer } from 'react-toastify';

import ClientsGrid from '../ClientsGrid';

import 'react-toastify/dist/ReactToastify.min.css';
import styles from './styles.module.scss';

function Main() {
  return (
    <main className={styles['page-main']}>
      <ToastContainer autoClose={3000} />
      <ClientsGrid />
    </main>
  );
}

export default Main;
