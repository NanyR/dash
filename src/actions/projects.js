
export const addProject=identifier=> {
  return {
    type: 'ADD_PROJECT',
    pro_id: identifier
  }
}

export const delProject= identifier=>{
  return{
    type:'DELETE_PROJECT',
    pro_id:identifier
  }
}

export const addRecord= record =>{
  return{
    type:'ADD_RECORD',
    record
  }
}

export const delRecord= record =>{
  return{
    type:'DELETE_RECORD',
    record
  }
}
