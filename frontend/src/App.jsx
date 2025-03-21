import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './pages/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import api from './api'
import { Link } from 'react-router-dom'
import NavBar from "./components/NavBar"
import AuthorizationRoute from './pages/AuthorizationRoute'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import BecomeCreator from './pages/BecomeCreator'
import EditCreator from './pages/EditCreator'
import SubscriptionPlan from './pages/SubscriptionPlan'
import { Navigate } from 'react-router-dom'
import CreatorRoute from './pages/CreatorRoute'


function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState("")
  const [creator, setCreator] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function initializeAuth() {
      try {
        const response = await api.get("/api/user/check-auth/");
        setAuthenticated(response.data.is_authenticated);
        setCreator(response.data.is_creator);
        setUser(response.data.user);
        sessionStorage.setItem('username', response.data.user);
        sessionStorage.setItem('is_creator', response.data.is_creator);
      } catch (err) {
        console.warn("check-auth failed. Error: ", err);
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <NavBar user={user} authenticated={authenticated} creator={creator}/>
      <div className='main-content'>
      <Routes>
        <Route path='/login'  element={<AuthorizationRoute authenticated={authenticated} ><Login setAuthenticated={setAuthenticated} setCreator={setCreator} setUser={setUser}/></AuthorizationRoute>}/>
        <Route path='/register' element={!authenticated?<Register/>:<Navigate to="/"/>}/>
        <Route path='/' element={<ProtectedRoute setAuthenticated={setAuthenticated} authenticated={authenticated}><Home/></ProtectedRoute>}/>
        <Route path='/logout' element={<ProtectedRoute setAuthenticated={setAuthenticated} authenticated={authenticated}><Logout setAuthenticated={setAuthenticated} setCreator={setCreator}/></ProtectedRoute>}/>
        <Route path='/user/:username' element={<ProtectedRoute setAuthenticated={setAuthenticated} authenticated={authenticated}><Profile /></ProtectedRoute>}/>
        <Route path='/creator/subscription_plan/' element={<ProtectedRoute setAuthenticated={setAuthenticated} authenticated={authenticated}><SubscriptionPlan  creator={creator} setCreator={setCreator}/></ProtectedRoute>}/>
        {/* <Route path='/creator/become/' element={<ProtectedRoute><BecomeCreator setCreator={setCreator}/></ProtectedRoute>}/> */}
        <Route path='/creator/edit/' element={<CreatorRoute setAuthenticated={setAuthenticated} authenticated={authenticated} creator={creator}><EditCreator setCreator={setCreator}/></CreatorRoute>}/>
        <Route path='/post/create' element={<CreatorRoute setAuthenticated={setAuthenticated} authenticated={authenticated} creator={creator}><CreatePost /></CreatorRoute>}/>
        <Route path='/post/edit/:id/' element={<CreatorRoute setAuthenticated={setAuthenticated} authenticated={authenticated} creator={creator}><EditPost/></CreatorRoute>}/>
        <Route path='/404' element={<NotFound/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
