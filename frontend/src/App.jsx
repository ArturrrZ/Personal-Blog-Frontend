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


function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState("")
  const [creator, setCreator] = useState(false)
  useEffect(()=>{
    api.get("/api/user/check-auth/")
    .then(response=>{
      // console.log(response.data)
      setAuthenticated(response.data.is_authenticated)
      setCreator(response.data.is_creator)
      setUser(response.data.user)
    })
    .catch(err=>{console.log(err)})
  },[])
  return (
    <BrowserRouter>
      <NavBar user={user} authenticated={authenticated} creator={creator}/> 
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login'  element={<AuthorizationRoute authenticated={authenticated}><Login setAuthenticated={setAuthenticated}/></AuthorizationRoute>}/>
        <Route path='/register' element={<AuthorizationRoute authenticated={authenticated}><Register/></AuthorizationRoute>}/>
        <Route path='/logout' element={<ProtectedRoute><Logout setAuthenticated={setAuthenticated}/></ProtectedRoute>}/>
        <Route path='/user/:username' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='/post/create' element={<ProtectedRoute><CreatePost /></ProtectedRoute>}/>
        <Route path='/post/edit/:id/' element={<ProtectedRoute><EditPost /></ProtectedRoute>}/>
        <Route path='/404' element={<NotFound/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
