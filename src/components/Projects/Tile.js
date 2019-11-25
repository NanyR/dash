import React from 'react'

const Tile = (props) =>{
  
  let qty= props.info.filter(rec => rec.length > 0).length;
  return(
    <button className="pd-tile" onClick={()=>props.handleTileClick(props.label)}>
      <div className="text-md">{qty}</div>
      <div className="text-sm">{props.label}</div>
    </button>
  )

}

export default Tile;
