import React from 'react'

const ShoppingCartItem=(props)=>{

  return(
      <tr>
        <td>{props.data.description}</td>
        <td>{props.data.qty}</td>
        <td>{props.data.total}</td>
        <td><button onClick={()=>props.removeItem(props.data.id)}>x</button></td>
      </tr>
  )

}


export default ShoppingCartItem
