import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProductList from './components/ProductList.jsx'
import Footer from './components/Footer.jsx'
import { useState, useEffect } from 'react'
import CartPage from './components/CartPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });
  const navigate = useNavigate();

  const handleAddCart = (product) => {
    setCartItems(prevItems => {
      const updated = [...prevItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return updated;
    });
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const handleCartClick = () => navigate('/cart');

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar cartItems={cartItems} onCartClick={handleCartClick} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <ProductList onAddToCart={handleAddCart} />
          </>
        } />
        <Route path="/cart" element={isAuthenticated ? <CartPage items={cartItems} onRemove={handleRemoveCartItem} /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )

  // Remove item from cart
  function handleRemoveCartItem(index) {
    setCartItems(prevItems => {
      const updated = prevItems.filter((_, i) => i !== index);
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return updated;
    });
  }

  // Edit item in cart (for now, just alert, you can implement a modal or inline edit)
  function handleEditCartItem(index) {
    alert('Edit functionality coming soon!');
  }
}

export default App
