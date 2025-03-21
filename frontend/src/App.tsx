import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import { GlobalContext } from "./guard/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyPro from "./pages/home/PropertyPro";

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
      </GlobalContext.Provider>
    </>
  );
}

export default App;
