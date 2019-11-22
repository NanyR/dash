import React from 'react';


const Table=(props)=>{
  const tcontent=props.content.map((task)=>{
    debugger
  })

  return(
    <table>
      <tbody>
        <tr>
          <th>Status</th>
          <th>Task</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
        {tcontent}
      </tbody>
    </table>

  )
}

export default Table;
