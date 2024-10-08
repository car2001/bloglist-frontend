import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {Authorization: token}
  }

  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}

const create = async (newNote) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newNote, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}${id}`, config);
  return response.data;
}

export default { getAll, setToken, create, update, deleteBlog }