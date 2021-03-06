import React, {Component} from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Fee from './Fee.js';
import Icon from '@material-ui/core/Icon';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';


class Fees extends Component{

  constructor(props){
    super(props)
    this.state={
      feesToAdd:[]
    }
    this.addToFees=this.addToFees.bind(this);
    this.handleShoppingCartAdd=this.handleShoppingCartAdd.bind(this)
  }

  addToFees(nFee, add){
    if(add){
      this.setState({
        feesToAdd:[...this.state.feesToAdd, nFee]
      })
    }else{
      let idx= this.state.feesToAdd.findIndex((fee)=> fee.id===nFee.id);
      this.setState({
        feesToAdd:[...this.state.feesToAdd.slice(0, idx),
          ...this.state.feesToAdd.slice(idx+1)]
      })
    }
  }

  handleShoppingCartAdd(e){
      e.preventDefault();
      this.props.addToCart(this.state.feesToAdd)
  }


// const Fees = (props)=>{

  render(){

      const feesList =this.props.data ? this.props.data.map((rec)=>{
        if(rec.result){
          return (rec.result.flat())
        }else{
          return []
        }
        }
      ).flat() : [];

      const allFees= feesList ?  feesList.map((fee, index)=>{
        return (
          <Fee
          key={index}
          addToFees={this.addToFees}
          data={fee}
          />
        )
      }) : 'No fees found'
      return (
        <div className="details-container">
          <div className="details-container-title">
            <button onClick={this.handleShoppingCartAdd}><AddShoppingCart /></button>
          </div>
          <table className="text-sm">
          <tbody>
            <tr className="table-header">
              <th></th>
              <th>Fee Description</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
            {allFees}
          </tbody>
          </table>
        </div>
      )
  }
}

export default Fees
