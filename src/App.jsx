import './App.css';
import { Outlet } from 'react-router-dom'
import SleekFooter from './components/SleekFooter.jsx';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import ScrollToTop from './utils/ScrollToTop.jsx';


function App() {
  const {  checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <SleekFooter />
    </>

  );
}

export default App;
