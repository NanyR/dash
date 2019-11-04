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
