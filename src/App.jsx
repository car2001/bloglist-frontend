import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try
    {
      const newNote = {
        title, 
        author, 
        url
      }
      const savedBlog = await blogService.create(newNote);
      setBlogs(blogs.concat(savedBlog));
      setIsError(false)
      setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author}`)
      setTimeout( () => {
        setMessage(null)
      },3000)
      setTitle('');
      setUrl('');
      setAuthor('');
    }
    catch(exception) {
      setIsError(true);
      setMessage(exception.response.data.error)
      setTimeout( () => {
        setMessage(null)
      },3000)
    }

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
        <Notification message={message} isError={isError}  />
        <h2>blogs</h2>
        <b>{user?.name} logged in</b>
        <button onClick={handleLogout}>logout</button>
        <h2>Create new note</h2>
        <CreateBlogForm
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          handleCreateBlog={handleCreateBlog}
        />
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