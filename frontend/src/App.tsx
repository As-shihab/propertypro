import { useEffect, useState , useRef } from "react";
import "./App.css";
import Header from "./components/header";
import { GlobalContext } from "./guard/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyPro from "./pages/home/PropertyPro";
import Footer from "./pages/footer/Footer";
import NotFound404 from "./pages/notfound/notfound404";
import Login from "./Auth/Login"; // Login Page
import ProfilePage from "./Auth/profile/profile";
import { httpClient } from "./services/http";
import { useFetchUser } from "./config/GetUserFromServer";
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const http = new httpClient();

  const fetchUser = useFetchUser();

  // inside App component:
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    fetchUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, setLoading, http, loading }}
    >
      <Router>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PropertyPro />} />
          <Route path="/login" element={<Login switchToSignup={() => {}} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
