import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Admin from "./components/Meals/Admin";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Router>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}

        <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
        <main>
          <Routes>
            <Route path="/" element={<Meals />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </CartProvider>
    </Router>
  );
}

export default App;
