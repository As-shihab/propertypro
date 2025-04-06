import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import { GlobalContext } from "./guard/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyPro from "./pages/home/PropertyPro";
import Footer from "./pages/footer/Footer";

function App() {
  const [user, setUser] = useState("hello");
  const data = { name: "shiab" };

  return (
    <>
      <GlobalContext.Provider value={{ user, data }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<PropertyPro />} />
          </Routes>
        </Router>
        <Footer/>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
