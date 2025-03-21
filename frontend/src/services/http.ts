import axios from "axios";
axios.defaults.baseURL='http://localhost:3000'
export class http {
  constructor() {}

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
}
