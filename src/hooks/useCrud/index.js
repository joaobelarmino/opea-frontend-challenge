import { useState } from 'react';
import { toast } from 'react-toastify';

import ClientsService from '../../services/ClientsService';

export default function useCrud() {
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
      toast.success('Cliente cadastrado com sucesso!');
    } catch {
      toast.error('Não foi possível cadastrar o cliente, por favor, tente novamente mais tarde.');
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
      toast.success('Cliente editado com sucesso!');
    } catch {
      toast.error(
        `Parece que não foi possível atualizar as informações do cliente,
        tente novamente mais tarde.`,
      );
    }
  }

  async function removeClient(clientId) {
    try {
      await ClientsService.removeClient(clientId);
      const updatedList = clientsList.filter((clientItem) => clientItem.id !== clientId);
      setClientsList(updatedList);
      toast.info('Cliente removido com sucesso!');
    } catch {
      toast.error('Não foi possível excluir o cliente, tente novamente mais tarde.');
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
