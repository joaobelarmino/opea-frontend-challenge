import HttpClient from './utils/HttpClient';

class ClientsService {
  constructor() {
    this.httpClient = new HttpClient('https://homolog.planetasec.com.br/prova/front/api');
  }

  async listClients() {
    return this.httpClient.get('/clients');
  }

  async showClient(client) {
    return this.httpClient.get(`/clients?text=${client}`);
  }
}

export default new ClientsService();
