import * as types from '../actions/actionTypes';

export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case types.SELECT_NUMBER: {
      if (!state.selectedNumbers) {
        return Object.assign({}, state, { selectedNumbers: [action.selectedNumber] });
      }
      return Object.assign({}, state, { selectedNumbers: [...state.selectedNumbers, action.selectedNumber] });
    }
    case types.UNSELECT_NUMBER: {
      return Object.assign({}, state, { selectedNumbers: state.selectedNumbers.filter(item => item !== action.selectedNumber) });
    }
    case types.CHECK_ANSWER: {
      // TODO continue from here
    }
    default:
      return state;
  }
}
