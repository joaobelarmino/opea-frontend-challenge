import React from 'react';

import opeaLogo from '../../assets/img/opea-logo.svg';
import iconUser from '../../assets/img/icon-user.svg';
import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-wrapper']}>
        <figure className={styles['header-logo']}>
          <img src={opeaLogo} alt="Opea logotipo" />
        </figure>
        <div className={styles.user}>
          <span>Nome do usuário</span>
          <img src={iconUser} alt="Ícone de usuário" />
        </div>
      </div>
    </header>
  );
}

export default Header;
