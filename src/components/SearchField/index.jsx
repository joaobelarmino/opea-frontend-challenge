import React from 'react';

import searchIconGlass from '../../assets/img/search.svg';
import styles from './styles.module.scss';

function SearchField({ search, onChange: setSearch }) {
  return (
    <form className={styles['search-field']}>
      <div className={styles['form-controll']}>
        <input
          type="text"
          placeholder="Buscar empresa..."
          id="search-company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" disabled><img src={searchIconGlass} alt="Ícone de busca" /></button>
      </div>
    </form>
  );
}

export default SearchField;
