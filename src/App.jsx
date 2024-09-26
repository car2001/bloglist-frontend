import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    if(user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try
    {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
    }
    catch(exception){
      setIsError(true);
      setMessage("Wrong credentials")
      setTimeout( () => {
        setMessage(null)
      },3000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }

  const loginForm = () => (
    <LoginForm 
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  )

  const listBlogs = () => {
    return(
      <>
        <h2>blogs</h2>
        <b>{user?.name} logged in</b>
        <button onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  if (user === null) {
      return(
        <>
          <Notification message={message} isError={isError}  />
          {loginForm()}
        </>
      )
  }
  

  return (
    <div>
      {listBlogs()}
    </div>
  )
}

export default App