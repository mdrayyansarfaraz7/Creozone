import './App.css';
import {Outlet} from 'react-router-dom'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';

function App() {
  const {isAuthenticated,user,checkAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log("Is Authenticated",isAuthenticated);
  console.log(user)
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>

  );
}

export default App;
