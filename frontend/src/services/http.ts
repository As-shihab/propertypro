import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../guard/GlobalContext";
axios.defaults.baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") ? localStorage.getItem("token")
      : "",
    "Access-Control-Allow-Origin": "*",
  },
});

export class httpClient {
  constructor() { }
  authUrl = "http://127.0.0.1:8000";
  
  async post(endpoint: string, data: object | FormData, onProgress?: (percent: number) => void) {
    const isFormData = data instanceof FormData;

    return axiosInstance.post(endpoint, data, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
      onUploadProgress: isFormData
        ? (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            onProgress(percentCompleted);
          }
        }
        : undefined,
    });
  }

  async get(endpoint: string) {
    return axiosInstance.get(endpoint);
  }

  async put(endpoint: string, id: string | number, data: any | object) {
    return axiosInstance.put(endpoint + "/" + id, data);
  }

  async delete(endpoint: string, id: string | number) {
    return axiosInstance.delete(endpoint + "/" + id);
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
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
  isAuthenticated() {
    return !!localStorage.getItem("token");
  }



}
