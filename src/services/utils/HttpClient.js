class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);
    const contentType = response.headers.get('Content-Type');
    let body = null;

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new Error(body, response);
  }
}

export default HttpClient;
