import React, { useEffect, useState } from 'react';
import ClientsService from '../../services/ClientsService';

import Modal from '../Modal';
import FormClient from '../FormClient';

import clipboardDisabledIcon from '../../assets/img/clipboard-list-disabled.svg';
import clipboardIcon from '../../assets/img/clipboard-list.svg';
import styles from './styles.module.scss';

function ClientsGrid() {
  const [clientsList, setClientsList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  function handleToggleModal() {
    setIsOpenModal((prevState) => !prevState);
  }

  function handleTypeModal(type) {
    setTypeModal(type);
    handleToggleModal();
  }

  async function loadCompanies() {
    const clients = await ClientsService.listClients();
    setClientsList(clients);
  }

  function handleActionModal() {
    loadCompanies();
    handleToggleModal();
  }

  async function createClient(client) {
    try {
      await ClientsService.registerClient(client);
      handleActionModal();
    } catch {
      throw new Error('Não foi possível cadastrar o cliente');
    }
  }

  async function editClient(client) {
    try {
      await ClientsService.editClient(client);
      handleActionModal();
    } catch (error) {
      throw new Error('Não foi possível editar o cliente');
    }
  }

  async function removeClient(clientId) {
    await ClientsService.removeClient(clientId);
    handleActionModal();
  }

  function handleSubmit(client) {
    if (typeModal.type === 'add') {
      return createClient(client);
    }
    return editClient(client);
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <>
      {isOpenModal && (
        <Modal
          content={(
            <FormClient
              onSubmit={handleSubmit}
              typeModal={typeModal}
              closeModal={handleToggleModal}
              onRemove={removeClient}
            />
          )}
          closeModal={handleToggleModal}
          typeModal={typeModal}
        />
      )}
      <div className={styles['clients-wrapper']}>
        <button
          type="button"
          onClick={() => handleTypeModal({ type: 'add' })}
          className={`${styles['add-card']} ${styles['client-card']}`}
        >
          <figure>
            <img src={clipboardDisabledIcon} alt="Ícone de prancheta" />
          </figure>
          <span>Adicionar empresa</span>
        </button>

        {clientsList.map((client) => (
          <button
            type="button"
            className={styles['client-card']}
            key={client.id}
            onClick={() => handleTypeModal({ type: 'edit', clientName: client.name })}
          >
            <figure>
              <img src={clipboardIcon} alt="Ícone de prancheta" />
            </figure>
            <div className={styles['client-info']}>
              <span className={styles['client-info__name']}>{client.name}</span>
              <span>{`CNPJ: ${client.cnpj}`}</span>
              <span>{` - Email: ${client.email}`}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default ClientsGrid;
