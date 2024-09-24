const LoginForm = (props) => (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={props.handleLogin}>
          <div>
            username:
            <input 
              type="text"
              value={props.username}
              onChange={ ({target}) => { props.setUsername(target.value) } }
              name="Username" />
          </div>
          <div>
            password:
            <input 
              type="password"
              value={props.password}
              onChange={ ({target}) => { props.setPassword(target.value) } }
              name="Password" />
          </div>
          <button type='submit'>login</button>
        </form>
    </div>
)

export default LoginForm;