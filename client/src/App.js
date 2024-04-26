import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import CartMenu from "./scenes/global/CartMenu";
import PaymentForm from "./scenes/checkout/PaymentForm";
import LoginPage from "./scenes/loginPage";
import { useSelector } from "react-redux";
import AddItemPage from "./scenes/admin/AddItem";
import EditPage from "./scenes/admin/Form2";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  const isAuth = Boolean(useSelector((state) => state.cart.token));
  const user = useSelector((state) => state.cart.user);
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="addItem" element={user._id === "65f869337016a3c58ee361c0" ?<AddItemPage /> : <Navigate to="/" />} />
          <Route path="editItem/:itemId" element={user._id === "65f869337016a3c58ee361c0" ?<EditPage /> : <Navigate to="/" />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          {/* <Route path="checkout" element={<Checkout />} /> */}
          <Route path="checkout" element={isAuth ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="pay" element={<PaymentForm />} />
          {/* PaymentForm */}
          {/* <Route path="checkout/success" element={<Confirmation />} /> */}
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
