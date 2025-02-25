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
  useEffect(()=>{
    console.log("open")
    api.get("/api/user/check-auth/")
    .then(response=>{
      // console.log(response.data)
      setAuthenticated(response.data.is_authenticated)
      setCreator(response.data.is_creator)
      setUser(response.data.user)
    })
    .catch(err=>{
        api.get("/api/user/refresh_token/")
        .then(res => {
          // console.log("Token refreshed:")
          setAuthenticated(true);
          setUser(res.data.user);
          setCreator(res.data.is_creator);
        })
        .catch(refreshErr => {
          // console.error("Refresh token failed:", refreshErr)
          setAuthenticated(false)
        })
    })
    .finally(() => {
      setLoading(false) 
    })
  },[])

  return (
    <BrowserRouter>
      <NavBar user={user} authenticated={authenticated} creator={creator}/>
      {loading?<div>Loading...</div>:
      <div className='main-content'>
      <Routes>
        <Route path='/login'  element={<AuthorizationRoute authenticated={authenticated} ><Login setAuthenticated={setAuthenticated} setCreator={setCreator} setUser={setUser}/></AuthorizationRoute>}/>
        <Route path='/register' element={!authenticated?<Register/>:<Navigate to="/"/>}/>
        <Route path='/' element={<ProtectedRoute authenticated={authenticated}><Home/></ProtectedRoute>}/>
        <Route path='/logout' element={<ProtectedRoute authenticated={authenticated}><Logout setAuthenticated={setAuthenticated} setCreator={setCreator}/></ProtectedRoute>}/>
        <Route path='/user/:username' element={<ProtectedRoute authenticated={authenticated}><Profile /></ProtectedRoute>}/>
        <Route path='/creator/subscription_plan/' element={<ProtectedRoute authenticated={authenticated}><SubscriptionPlan  creator={creator} setCreator={setCreator}/></ProtectedRoute>}/>
        {/* <Route path='/creator/become/' element={<ProtectedRoute><BecomeCreator setCreator={setCreator}/></ProtectedRoute>}/> */}
        <Route path='/creator/edit/' element={<CreatorRoute authenticated={authenticated} creator={creator}><EditCreator setCreator={setCreator}/></CreatorRoute>}/>
        <Route path='/post/create' element={<CreatorRoute authenticated={authenticated} creator={creator}><CreatePost /></CreatorRoute>}/>
        <Route path='/post/edit/:id/' element={<CreatorRoute authenticated={authenticated} creator={creator}><EditPost /></CreatorRoute>}/>
        <Route path='/404' element={<NotFound/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </div> }
    </BrowserRouter>
  )
}

export default App
