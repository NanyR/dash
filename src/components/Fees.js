import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';


const Fees = (props)=>{
  const feesList =props.data ? props.data.map((rec)=>rec.result.flat()).flat() : [];

  const allFees= feesList ?  feesList.map((fee, index)=>{
    return (
      <tr>
        <td>{fee.description.value}</td>
        <td>{fee.balanceDue === 0 ? "PAID" : fee.status}</td>
        <td>{fee.quantity}</td>
        <td>${fee.amount}</td>
      </tr>
    )
  }) : 'No fees found on this record'
  return (
    <div>
      <table>
      <tbody>
        <tr>
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

export default Fees
