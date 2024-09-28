import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true);

  const blogFormRef = useRef()

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

  const handleLogin = async (credentials) => {
    try
    {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user);
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

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try
    {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
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

  const onClickLike = async (blog) => {
    try
    {
      const changedBlog = {...blog, likes: blog.likes + 1}

      const returnedBlog = await blogService.update(changedBlog);
      const newBlogs = blogs.map(b => b.id !== blog.id ? b : returnedBlog )
      setBlogs(newBlogs);
    }
    catch(exception){
      setIsError(true);
      setMessage(exception.response.data.error)
      setTimeout( () => {
        setMessage(null)
      },3000)
    }
  }

  const handleRemovePress = async (idBlog) => {
    try
    {
      const foundBlog = blogs.find(blog => blog.id = idBlog);
      if(foundBlog){
        const isRemove = window.confirm(`Remove blog ${foundBlog.title} by ${foundBlog.author}`)
        if(isRemove){
          await blogService.deleteBlog(idBlog);
          const updateBlogs = blogs.filter(blog => blog.id !== idBlog);
          setBlogs(updateBlogs)
        }
      }
    }
    catch(exception) 
    {
      setIsError(true);
      setMessage(exception.response.data.error)
      setTimeout( () => {
        setMessage(null)
      },3000)
    }
  }

  const loginForm = () => (
    <Toggable buttonLabel="login">
      <LoginForm 
        handleLogin={handleLogin}
      />
    </Toggable>
  )

  const listBlogs = () => {
    return(
      <>
        <b>{user?.name} logged in</b>
        <button onClick={handleLogout}>logout</button>
        <Toggable buttonLabel="new note" ref={blogFormRef}>
          <CreateBlogForm handleCreateBlog={handleCreateBlog} />
        </Toggable>
        <h2>Blog List</h2>
        {blogs.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            handleRemovePress = {() => handleRemovePress(blog.id)}
            onClickLike={() => onClickLike(blog) } 
          />
        )}
      </>
    )
  }

  return (
    <div>
      <Notification 
        message={message} 
        isError={isError}  
      />
      <h2>Blogs</h2>
      { user === null ? 
        loginForm() : 
        listBlogs()
      }

    </div>
  )
}

export default App