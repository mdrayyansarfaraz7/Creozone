import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import RedirectIfAuth from './components/RedirectIfAuth.jsx';
import Profile from './pages/Profile.jsx';
import RedirectIfNotAuth from './components/RedirectIfNotAuth.jsx';
import EditProfileForm from './pages/EditProfileForm.jsx';


let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home/>} />
      </Route>
      <Route path="/login" element={        
        <RedirectIfAuth>
      <Login/>
        </RedirectIfAuth>} />
      <Route path="/signup" element={
        <RedirectIfAuth>
      <SignUp/>
        </RedirectIfAuth>
        } />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/update/:username" element={<EditProfileForm/>}/>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
