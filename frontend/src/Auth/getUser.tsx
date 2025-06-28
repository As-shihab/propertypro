import { useContext } from "react";
import { GlobalContext } from "../guard/GlobalContext";
import { httpClient } from "../services/http";

export const getUser = () => {
  const { user, setUser } = useContext(GlobalContext);

  if (!user) {
    let http = new httpClient();
    const token = http.getToken("authToken");

    if (token) {
      http
        .get("/auth/user")
        .then((res: any) => {
          setUser(res.data);
        })
        .catch((err: any) => {
          console.error("Error fetching user data:", err);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }
   console.log("User data:", user);
  return user;
};
