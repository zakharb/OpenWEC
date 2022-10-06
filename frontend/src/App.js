import React, {useState, useMemo, useEffect} from 'react'
import './styles/App.css'
import {BrowserRouter, Routes, Route, Link, Switch} from 'react-router-dom'
import About from "./pages/About"
import Posts from "./pages/Posts"
import PostIdPage from "./pages/PostIdPage"
import NoPage from "./pages/NoPage"
import Login from "./pages/Login"
import MyNavbar from "./components/UI/navbar/Navbar"
import AppRouter from "./router"
import {AuthContext} from "./context"



import 'bootstrap/dist/css/bootstrap.min.css';


import './App.scss';


function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect( () => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
    <BrowserRouter>
      <MyNavbar/>
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
