import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import { GlobalContext } from "./guard/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyPro from "./pages/home/PropertyPro";
import Footer from "./pages/footer/Footer";
import NotFound404 from "./pages/notfound/notfound404";

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <GlobalContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<PropertyPro />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
        <Footer />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
