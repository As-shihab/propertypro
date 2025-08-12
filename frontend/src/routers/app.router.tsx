import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import PropertyPro from "../pages/home/PropertyPro";
import ProductOverview from "../components/CardView/cardView";
import NotFound404 from "../pages/notfound/notfound404";
import ListingContainer from "../Auth/admin/user/listing/ListingContainer";
import Login from "../Auth/Login";
import Propertys from "../pages/propertys/Propertys";
import ProfilePage from "../Auth/admin/user/profile/profile";
import Header from "../components/header";


// Lazy loading components
const AdminLayout = lazy(() => import("../Auth/admin/AdminLayout"));
export default function AppRouter() {
  return (

    <Router >
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

        <Route path="/panel/*" element={<AdminLayout />}>
          <Route path="listing" element={<ListingContainer />} />
          {/* Add more nested routes like below if needed */}
          {/* <Route path="users" element={<UsersPage />} /> */}
        </Route>

      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}


