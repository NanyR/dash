import React from 'react';
import Message from './Message.js'


const LoginForm=(props)=>{
  const failedMessage= "User could not be verified";
  return(
    <div className="form-container">
      <h3>WELCOME!</h3>
      <p>{props.instructions}</p>
        <form onSubmit={props.handleSubmit}>
        {props.failedLogin ? <Message text={failedMessage} className="error"/> : null}
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
