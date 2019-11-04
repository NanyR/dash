import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';


const Fees = (props)=>{
  debugger
  const feesList= props.feesList.map((fee, index)=>{
    return (
      <tr>
        <td>{fee.accountCode1}</td>
        <td>{fee.status}</td>
        <td>{fee.quantity}</td>
        <td>${fee.amount}</td>
      </tr>
    )
  })
  return (
    <div>
      <div>
        <MaterialIcon icon="add_shopping_cart"/>
      </div>
      <table>
      <tbody>
        <tr>
          <th>Fee Description</th>
          <th>Status</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
      </tbody>
      </table>
    </div>
  )

}

export default Fees
