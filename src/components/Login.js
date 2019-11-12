import React, {Component} from 'react'
import axios from 'axios';
import '../LoginForm.css';
import LoginForm from './LoginForm.js';
axios.defaults.withCredentials = true


export default class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      user:'',
      password:'',
      citizen:false,
      agency:false
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    let app = e.target.innerText.toLowerCase();
    this.setState({
      [app]:true
    })
  }

  handleChange(e){
    e.preventDefault();
    let value= e.target.value;
    let name= e.target.name;
    this.setState({
      [name]: value
    })
  }


  handleSubmit(e){
      axios.defaults.withCredentials = true;
    e.preventDefault();
    axios.post('http://localhost:3001/authenticate', {
      user:this.state.user,
      password: this.state.password,
      agency:this.state.agency,
      withCredentials:true
    })
    .then(data=>{

      let username= this.state.agency ? data.data[0].result.value : data.data[0].result.loginName;
      let records= data.data[1].result;
      this.props.updateUser(username, records, this.state.agency);
    })
    .catch(err=>{
      console.log(err)
    })
  }



render(){
  const instructions= this.state.agency ? "Login with your Accela Civic Platform credentials" :  "Login with your Citizen Access Credentials";
  const content= (this.state.agency || this.state.citizen) ? <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} instructions={instructions}/> :
    <div className="form-container">
      <h3>WELCOME!</h3>
      <button onClick={this.handleClick}>CITIZEN</button>
      <button onClick={this.handleClick}>AGENCY</button>
    </div>
  return(
    <div className="LoginForm">
      <div className='login-container'>
        {content}
      <div className="logo"></div>
      </div>

    </div>
  )
}

}
