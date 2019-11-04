export default function recordsReducer(
  state=[], action){
    let idx;
    switch (action.type){
      case 'ADD_RECORD':
        return [...state, action.record];
      case 'DELETE_RECORD':
        idx=state.findIndex(rec => rec)
          return [...state.slice(0, idx), ...state.slice(idx+1)];

        default:
        return state
    }

}
