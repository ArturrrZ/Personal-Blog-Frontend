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
import EditCreator from './pages/EditCreator'
import SubscriptionPlan from './pages/SubscriptionPlan'
import { Navigate } from 'react-router-dom'
import CreatorRoute from './pages/CreatorRoute'
import { AuthContext } from './AuthContext'

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
    <AuthContext.Provider value={{authenticated, setAuthenticated, user, setUser, creator, setCreator}}>
    <BrowserRouter>
      <NavBar/>
      <div className='main-content'>
      <Routes>
        <Route path='/login'  element={<AuthorizationRoute><Login /></AuthorizationRoute>}/>
        <Route path='/register' element={<AuthorizationRoute><Register /></AuthorizationRoute>}/>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/logout' element={<ProtectedRoute><Logout/></ProtectedRoute>}/>
        <Route path='/user/:username' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='/creator/subscription_plan/' element={<ProtectedRoute><SubscriptionPlan/></ProtectedRoute>}/>
        <Route path='/creator/edit/' element={<CreatorRoute><EditCreator/></CreatorRoute>}/>
        <Route path='/post/create' element={<CreatorRoute><CreatePost /></CreatorRoute>}/>
        <Route path='/post/edit/:id/' element={<CreatorRoute><EditPost/></CreatorRoute>}/>
        <Route path='/404' element={<NotFound/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
