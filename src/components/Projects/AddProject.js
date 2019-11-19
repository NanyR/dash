import React, {Component} from 'react';


export default class AddProject extends Component{
  constructor(props){
    super(props)
    this.state={
      projectName:'',
      description:''
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(e){
    let name= e.target.name;
    let val=e.target.value;
    this.setState({
      [name]:val
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.addProject(this.state.projectName, this.state.description)
  }

  render(){
    return(
      <form className="add-form project" onSubmit={this.handleSubmit}>
        <h4 className="text-md">Create New Project </h4>
        <div className="field-container">
          <label className="text-sm">Project Name:</label>
          <p className="text-sm"> (must be unique)</p>
          <input type='text' name='projectName' onChange={this.handleChange.bind(this)} required/>
        </div>
        <div className="field-container">
          <label >Description of Project</label>
          <textarea name="description" onChange={this.handleChange.bind(this)} />
          <input type="submit" value="+"/>
        </div>
      </form>
    )
  }

}
