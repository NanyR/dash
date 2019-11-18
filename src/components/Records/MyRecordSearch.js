import React, {Component} from 'react';
import axios from 'axios';

export default class MyRecordSearch extends Component{

  constructor(props){
    super(props)
    this.state={
      rec_id:'',
      rec_type:'',
      rec_module:'',
      finishedSearch:false
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    axios.defaults.withCredentials = true;
    var body={
      customId: this.state.rec_id
        // type:this.state.rec_type,
        // module:this.state.rec_module
      }
    axios.post("http://localhost:3001/records/search",
      body
    ).then((data)=>{
      debugger
    }).catch((err)=>{
      console.log('error')
    })
}

  handleChange(e){
    e.preventDefault();
    let name= e.target.name;
    let val=e.target.value;
    this.setState({
      [name]:val
    })
  }

  render(){
    return(
      <div className="search-container">
        <form onSubmit={this.handleSubmit}>
          <label>Record Id</label>
          <input type="text" name="rec_id" onChange={this.handleChange}/>
          <label>Record Type Alias</label>
          <input type="text" name="rec_type" onChange={this.handleChange}/>
          <label>Module</label>
          <input type="text" name="rec_module" onChange={this.handleChange}/>
          <input type="submit" value="Search"/>
        </form>
        {this.state.finishedSearch ?
          <div>

          </div> :
          null
        }

      </div>
    )
  }

}
