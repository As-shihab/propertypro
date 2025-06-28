import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export class httpClient {
  constructor() {}
  authUrl = "http://127.0.0.1:8000";
  post(endpoint: string, data: object | any) {
    return axios.post(endpoint, data);
  }

  get(endpoint: string) {
    return axios.get(endpoint);
  }

  put(endpoint: string, id: string | number, data: any | object) {
    return axios.put(endpoint + "/" + id, data);
  }

  delete(endpoint: string, id: string | number) {
    return axios.delete(endpoint + "/" + id);
  }

  saveToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }
  getToken(name: string) {
    return localStorage.getItem(name);
  }
  removeToken(name: string) {
    localStorage.removeItem(name);
  }
  clearAllTokens() {
    localStorage.clear();
  }
}
