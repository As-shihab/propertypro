import { useEffect, useState, useRef } from "react";
import "./App.css";
import { GlobalContext } from "./guard/GlobalContext";
import { httpClient } from "./services/http";
import { useFetchUser } from "./config/GetUserFromServer";
import AppRouter from "./routers/app.router";
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [gfilter, setGfilter] = useState(false);
  const http = new httpClient();

  const fetchUser = useFetchUser();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (localStorage.getItem("token") && !hasFetchedRef.current) {
      fetchUser()
        .then((data) => {
          setUser(data);
          hasFetchedRef.current = true;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 401) {
            http.logout();
          }
          setUser(undefined);
        });
    }

  }, [localStorage.getItem("token")]);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, setLoading, http, loading, gfilter, setGfilter }}
    >
      <AppRouter />
    </GlobalContext.Provider>
  );
}

export default App;
