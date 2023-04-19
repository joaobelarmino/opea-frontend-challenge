import React from 'react';

import searchIconGlass from '../../assets/img/search.svg';
import styles from './styles.module.scss';

function SearchField({ search, onChange: setSearch }) {
  return (
    <div className={styles['search-field']}>
      <div className={styles['form-controll']}>
        <input
          type="text"
          placeholder="Buscar empresa..."
          id="search-company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" disabled tabIndex={-1}><img src={searchIconGlass} alt="Ícone de busca" /></button>
      </div>
    </div>
  );
}

export default SearchField;
