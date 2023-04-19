import { useState } from 'react';

import ClientsService from '../../services/ClientsService';

export default function useClients() {
  const [clientsList, setClientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  async function createClient(client) {
    try {
      const newClient = await ClientsService.registerClient(client);
      setClientsList((prevState) => [...prevState, newClient]);
    } catch {
      throw new Error('Não foi possível cadastrar o cliente');
    }
  }

  async function editClient(client) {
    try {
      const response = await ClientsService.editClient(client);
      const updatedList = clientsList.map((clientItem) => {
        if (clientItem.id === response.id) {
          return response;
        }
        return clientItem;
      });

      setClientsList(updatedList);
    } catch {
      throw new Error('Não foi possível editar o cliente');
    }
  }

  async function removeClient(clientId) {
    try {
      await ClientsService.removeClient(clientId);
      const updatedList = clientsList.filter((clientItem) => clientItem.id !== clientId);
      setClientsList(updatedList);
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
  };
}
