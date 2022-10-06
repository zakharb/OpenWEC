import {useContext} from 'react'
import About from "../pages/About"
import Posts from "../pages/Posts"
import Sources from "../pages/Sources"
import PostIdPage from "../pages/PostIdPage"
import NoPage from "../pages/NoPage"
import Login from "../pages/Login"
import {BrowserRouter, Routes, Route, Link, Switch} from 'react-router-dom'
import {AuthContext} from "../context"

const AppRouter = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext)
	return(
	  <div>
		{isAuth
			?
    		  <Routes>
		        <Route exact path="/sources" element=<Sources/>/>
		        <Route exact path="/posts" element=<Posts/>/>
		        <Route exact path="/posts/:id" element=<PostIdPage />/>
		        <Route path="/about" element=<About />/>
		        <Route path="*" element=<NoPage />/>
	    	  </Routes>
			:
    		  <Routes>
		        <Route exact path="/login" element=<Login />/>
		        <Route path="*" element=<Login />/>
	    	  </Routes>
		}
	  </div>
)
}

export default AppRouter