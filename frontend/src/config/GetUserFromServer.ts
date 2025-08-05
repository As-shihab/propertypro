import { useContext } from "react";
import { httpClient } from "../services/http";
import { GlobalContext } from "../guard/GlobalContext";

export const useFetchUser = () => {
  const { setUser, setLoading } = useContext(GlobalContext); 
  const http = new httpClient();

  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log("Fetching user data from server...");
      const response = await http.get("/api/auth/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return fetchUser;
};
