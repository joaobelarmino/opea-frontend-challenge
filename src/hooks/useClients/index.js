import { useState } from 'react';

import ClientsService from '../../services/ClientsService';

export default function useClients() {
  const [clientsList, setClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  function handleToggleModal() {
    setIsVisibleModal((prevState) => !prevState);
  }

  async function loadClients() {
    try {
      setIsLoading(true);
      const clients = await ClientsService.listClients();
      setClientsList(clients);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleActionModal() {
    loadClients();
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
    } catch {
      throw new Error('Não foi possível editar o cliente');
    }
  }

  async function removeClient(clientId) {
    try {
      await ClientsService.removeClient(clientId);
      handleActionModal();
    } catch {
      throw new Error('Não foi possível excluir o cliente');
    }
  }

  return {
    loadClients,
    createClient,
    editClient,
    removeClient,
    clientsList,
    isLoading,
    hasError,
    handleToggleModal,
    isVisibleModal,
  };
}
