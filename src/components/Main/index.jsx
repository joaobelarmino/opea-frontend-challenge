import React from 'react';

import ClientsGrid from '../ClientsGrid';

import styles from './styles.module.scss';

function Main() {
  return (
    <main className={styles['page-main']}>
      <ClientsGrid />
    </main>
  );
}

export default Main;
