import { useEffect, useState, useRef, lazy } from "react";
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
import Propertys from "./pages/propertys/Propertys";
import ProductOverview from "./components/CardView/cardView";
const AdminLayout = lazy(() => import("./Auth/admin/AdminLayout"));
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [gfilter, setGfilter] = useState(false);
  const http = new httpClient();

  const fetchUser = useFetchUser();
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
      value={{ user, setUser, setLoading, http, loading, gfilter, setGfilter }}
    >
      <Router>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PropertyPro />} />
          <Route path="/product-overview" element={<ProductOverview />} />

          {/* Protected routes */}
          <Route path="/propetys" element={<Propertys />}>

          </Route>

          <Route path="/login" element={<Login switchToSignup={() => { }} />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound404 />} />

          <Route
            path="/admin/*"
            element={
              <AdminLayout />
            }
          />
          
        </Routes>
        <Footer />
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
