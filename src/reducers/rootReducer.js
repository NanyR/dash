import { combineReducers } from 'redux';
import recordsReducer from './recordsReducer.js';
import projectReducer from './projectReducer.js'

const rootReducer= combineReducers({
  projects: projectReducer,
  records: recordsReducer
})

export default rootReducer
