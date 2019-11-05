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
    const asiVal= this.props.iValue === 'CHECKED' ? (<input type="checkbox" checked readOnly/>): (  <p>{this.props.iValue || " " }</p>)
    return(
      <div>
        <label>{this.props.iLabel}: </label>
        {this.props.canEdit ?
        <input type={this.props.iType} value={this.props.iValue || " " } onChange={this.handleChange} /> :
        asiVal
          }

      </div>
    )
  }

}
