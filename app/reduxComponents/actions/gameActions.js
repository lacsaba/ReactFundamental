import * as types from './actionTypes';

export function selectNumber(selectedNumber) {
  return {
    type: types.SELECT_NUMBER,
    selectedNumber,
  };
}

export function unselectNumber(selectedNumber) {
  return {
    type: types.UNSELECT_NUMBER,
    selectedNumber,
  };
}
