import React from 'react';


const LoginForm=(props)=>{

  return(
    <div className="form-container">
      <h3>WELCOME!</h3>
      <p>{props.instructions}</p>
        <form onSubmit={props.handleSubmit}>
          <label>Username:</label>
          <input type="text" required onChange={props.handleChange} name="user"/>
          <label>Password:</label>
          <input type="password" required onChange={props.handleChange} name="password"/>
          <input type="submit" value="LOGIN" />
        </form>
    </div>
  )
}


export default LoginForm
