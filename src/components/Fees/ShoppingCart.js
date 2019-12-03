import React from 'react';
import ShoppingCartItem from './ShoppingCartItem.js'

const ShoppingCart=(props)=>{

  const items=props.items.map((item)=>{
    return(
      <ShoppingCartItem data={item}
      removeItem={props.removeItem}/>
    )
  })

  return(
    <div>
      <table className="shoppingcart">
        <body>
        <tr>
          <th>Fee Item</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
        {items}
        </body>
      </table>
    </div>
  )
}


export default ShoppingCart
