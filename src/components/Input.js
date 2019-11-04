import React,{Component} from 'react';


export default class Input extends Component {
  constructor(props){
    super(props)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(e){
    e.preventDefault();
    this.props.handleChange(e, this.props.iLabel)
  }

  render(){
    return(
      <div>
        <label>{this.props.iLabel}</label>
        <input type={this.props.iType} value={this.props.iValue || " " } onChange={this.handleChange} readOnly={!this.props.canEdit}/>
      </div>
    )
  }

}
