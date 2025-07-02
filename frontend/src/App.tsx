import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import { GlobalContext } from "./guard/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyPro from "./pages/home/PropertyPro";
import Footer from "./pages/footer/Footer";
import NotFound404 from "./pages/notfound/notfound404";
import Login from "./Auth/Login"; // Login Page
import PrivateRoute from "./guard/privateRoute"; // Import the PrivateRoute component
import ProfilePage from "./Auth/profile/profile";
import { httpClient } from "./services/http";
import { sentUserOtp } from "./config/OtpSender";

function App() {
  const [user, setUser] = useState();
  const sent = () => {
    let http = new httpClient();
    http
      .post(http.authUrl + "/api/user/sent-otp", {})
      .then((res: any) => {
        console.log("OTP sent successfully:", res.data);
      })
      .catch((err: any) => {
        console.error("Error sending OTP:", err);

        http.get(http.authUrl + "/api/user").then(res=>console.log("User data:", res.data))
      });
  }
  return (
    <button onClick={sent}>sent</button>
    // <GlobalContext.Provider value={{ user, setUser }}>
    //   <Router>
    //     <Header />
    //     <Routes>
    //       {/* Public routes */}
    //       <Route path="/" element={<PropertyPro />} />
    //       <Route path="/login" element={<Login switchToSignup={() => {}} />} />

    //       {/* Protected routes */}
    //       <Route path="/profile" element={<ProfilePage/>} />

    //       {/* Catch all route for 404 */}
    //       <Route path="*" element={<NotFound404 />} />
    //     </Routes>
    //     <Footer />
    //   </Router>
    // </GlobalContext.Provider>
  );
}

export default App;
