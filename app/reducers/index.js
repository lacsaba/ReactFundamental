import { combineReducers } from 'redux';
import { game, doneStatus } from './gameReducer';

const rootReducer = combineReducers({
  game,
  doneStatus,
});

export default rootReducer;
