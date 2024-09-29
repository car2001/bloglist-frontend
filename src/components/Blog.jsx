import { useState } from "react"

const Blog = ({ blog, onClickLike, handleRemovePress }) => {

  const [visible, setVisible] = useState(false)

  const isVisibleDetail = {display: visible ? '' : 'none'}
  const labelButton = visible ? 'hide' : 'view'

  const toggleVisibility = () =>  setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    border: 'none',
    borderRadius: 5,
    backgroundColor: '#1c6dec',
    marginBottom: 2,
    color: '#fff'
  }
  
  return (
    <div style={blogStyle}>
      <div>
        <b>{blog.title} - {blog.author} </b>
        <button onClick={toggleVisibility}>{labelButton}</button>
      </div>
      <div style={isVisibleDetail} className="detail-section" >
        <span>{blog.url}</span><br/>
        <span>
          likes <b>{blog.likes} </b> 
          <button onClick={onClickLike}>like</button>
        </span><br/>
        <span>{blog.user.username}</span><br />
        <button style={buttonStyle} onClick={handleRemovePress} >remove</button>
      </div>
    </div>
  )
  
}

export default Blog