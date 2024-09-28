import { useState } from "react";


const LoginForm = ({handleLogin}) => {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin({username, password})
    setUsername('');
    setPassword('');
  }

  return(
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input 
            type="text"
            value={username}
            onChange={ ({target}) => {setUsername(target.value) } }
            name="Username" />
        </div>
        <div>
          password:
          <input 
            type="password"
            value={password}
            onChange={ ({target}) => { setPassword(target.value) } }
            name="Password" />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm;