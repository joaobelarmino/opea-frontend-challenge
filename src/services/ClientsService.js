import HttpClient from './utils/HttpClient';

class ClientsService {
  constructor() {
    this.httpClient = new HttpClient('https://homolog.planetasec.com.br/prova/front/api');
  }

  async listClients() {
    return this.httpClient.get('/clients');
  }

  async showClient(clientName) {
    return this.httpClient.get(`/clients?text=${clientName}`);
  }

  async registerClient(client) {
    return this.httpClient.post('/clients', { body: client });
  }

  async editClient(client) {
    return this.httpClient.put(`/clients/${client.id}`, { body: client });
  }

  async removeClient(clientId) {
    return this.httpClient.delete(`/clients/${clientId}`);
  }
}

export default new ClientsService();
