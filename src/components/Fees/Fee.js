import React,{Component} from 'react';


class Fee extends Component{

  constructor(props){
    super(props)

    this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange(e){
    let add= e.target.checked;
    let fee= {
      id: this.props.data.id,
      amount:this.props.data.amount,
      recordId:this.props.data.recordId.id,
      description:this.props.data.description.value,
      qty:this.props.data.quantity
    }
    this.props.addToFees(fee, add)
  }
// const Fee =(props)=>{

  render(){
    return(
      <tr>
        <td><input type="checkbox" onChange={this.handleCheckboxChange} disabled={this.props.data.balanceDue===0 || this.props.data.status!=='INVOICED'} name="fee"/></td>
        <td>{this.props.data.description.value}</td>
        <td>{this.props.data.balanceDue === 0 ? "PAID" : this.props.data.status}</td>
        <td>{this.props.data.quantity}</td>
        <td>${this.props.data.amount}</td>
      </tr>
    )

  }

}

export default Fee
