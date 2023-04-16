import React, { useEffect, useState } from 'react';
import ClientsService from '../../services/ClientsService';

import clipboardDisabledIcon from '../../assets/img/clipboard-list-disabled.svg';
import clipboardIcon from '../../assets/img/clipboard-list.svg';
import styles from './styles.module.scss';

function ClientsGrid() {
  const [clientsList, setClientsList] = useState([]);

  async function loadCompanies() {
    const clients = await ClientsService.listClients();
    setClientsList(clients);
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className={styles['clients-wrapper']}>
      <div className={`${styles['add-card']} ${styles['client-card']}`}>
        <figure>
          <img src={clipboardDisabledIcon} alt="Ícone de prancheta" />
        </figure>
        <span>Adicionar empresa</span>
      </div>

      {clientsList.map((client) => (
        <div className={styles['client-card']} key={client.id}>
          <figure>
            <img src={clipboardIcon} alt="Ícone de prancheta" />
          </figure>
          <div className={styles['client-info']}>
            <span className={styles['client-info__name']}>{client.name}</span>
            <span>{`CNPJ: ${client.cnpj}`}</span>
            <span>{` - Email: ${client.email}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClientsGrid;
