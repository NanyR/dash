import React, {Component} from 'react'
import axios from 'axios';
import '../LoginForm.css'
axios.defaults.withCredentials = true


export default class LoginForm extends Component{
  constructor(props){
    super(props)
    this.state={
      user:''
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e){
      axios.defaults.withCredentials = true;
    e.preventDefault();
    axios.post('http://localhost:3001/authenticate', {
      user:'lwacht@septechconsulting.com',
      password: 'accela55',
      withCredentials:true
    })
    .then(data=>{
      let username= data.data[0].result.loginName;
      let records= data.data[1].result;
      this.props.updateUser(username, records);
    })
    .catch(err=>{
      console.log(err)
    })
  }



render(){
  return(
    <div className="LoginForm">
    {this.state.user ? <div> {this.state.user} </div> :
      <div className='login-container'>
      <div className="form-container">
        <h3>WELCOME!</h3>
        <p>Login with your Citizen Access Credentials</p>

          <form onSubmit={this.handleSubmit}>
            <label>Username:</label>
            <input type="text" />
            <label>Password:</label>
            <input type="password" />
            <input type="submit" value="LOGIN"/>
          </form>
      </div>
      <div className="logo"></div>
      </div>
    }
    </div>
  )
}

}
