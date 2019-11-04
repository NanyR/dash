
import uuid from "uuid";

export default function projectReducer(
  state=[], action){
    let idx;
    switch (action.type){
      case 'ADD_PROJECT':
        let newProject={name: action.pro_id, id: uuid()};
          return [...state, newProject];
      case 'DELETE_PROJECT':
        idx= state.findIndex(project => project.name === action.pro_id);
          return[...state.slice(0, idx), ...state.slice(idx+1)];

        default:
        return state
    }

}
