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
import CreateStashForm from './pages/CreateStashForm.jsx';
import ViewCreation from './pages/ViewCreation.jsx';
import ViewStash from './pages/ViewStash.jsx';
import AllStash from './pages/AllStash.jsx';
import ViewOutlooks from './pages/ViewOutlooks.jsx';
import AllStyleChain from './pages/AllStyleChain.jsx';
import AllRefinementRequest from './pages/AllRefinementRequest.jsx';
import AllCreatedOutlooks from './pages/AllCreatedOutlooks.jsx';
import NotFound from './pages/NotFound.jsx';
import ExploreStashes from './pages/ExploreStashes.jsx';
import ExploreCreations from './pages/ExploreCreations.jsx';
let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/create-stash" 
        element={
        <RedirectIfNotAuth>
           <CreateStashForm />
        </RedirectIfNotAuth>} />
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/login" element={
        <RedirectIfAuth>
          <Login />
        </RedirectIfAuth>} />
      <Route path="/signup" element={
        <RedirectIfAuth>
          <SignUp />
        </RedirectIfAuth>
      } />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/creation/:id" element={<ViewCreation />} />
      <Route path='/stash/:id' element={<ViewStash />} />
      <Route path='/all-stash/:username' element={<AllStash />} />
      <Route path='/outlook/:id' element={<ViewOutlooks />} />
      <Route path='/your-style-chain/:username' element={<RedirectIfNotAuth> <AllStyleChain /> </RedirectIfNotAuth> } />
      <Route path='/your-outlooks/:username' element={<RedirectIfNotAuth>  <AllCreatedOutlooks/> </RedirectIfNotAuth>}/>
      <Route  path='/explore-stashes/' element={<ExploreStashes/>}/>
      <Route  path='/explore-creations/' element={<ExploreCreations/>}/>
      <Route path="*" element={<NotFound/>} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
