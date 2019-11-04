import React, {Component} from 'react'
import axios from 'axios';
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
    <div>
    {this.state.user ? <div> {this.state.user} </div> :
      <form onSubmit={this.handleSubmit}>
      <h3>LOGIN WITH ACCELA CREDENTIALS</h3>
        <label>USERNAME</label>
        <input type="text" />
        <label>PASSWORD</label>
        <input type="password" />
        <input type="submit" value="LOGIN"/>
      </form>
    }
    </div>
  )
}

}
