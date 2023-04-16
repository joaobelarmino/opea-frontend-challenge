import React from 'react';

import ClientsGrid from '../ClientsGrid';

import searchIconGlass from '../../assets/img/search.svg';

import styles from './styles.module.scss';

function Main() {
  return (
    <main className={styles['page-main']}>
      <form>
        <div className={styles['form-controll']}>
          <input type="text" placeholder="Buscar empresa..." id="search-company" />
          <button type="button" disabled><img src={searchIconGlass} alt="Ícone de busca" /></button>
        </div>
      </form>
      <ClientsGrid />
    </main>
  );
}

export default Main;
