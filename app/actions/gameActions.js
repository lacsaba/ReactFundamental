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

export function processAnswer() {
  return {
    type: types.PROCESS_ANSWER,
  };
}

export function setRandomNumberOfStars(randomNumberOfStars) {
  return {
    type: types.SET_RANDOM_NUMBER_OF_STARS,
    randomNumberOfStars,
  };
}

export function removeSelectedNumbers() {
  return {
    type: types.REMOVE_SELECTED_NUMBERS,
  };
}

export function resetGame() {
  return {
    type: types.RESET_GAME,
  };
}

export function redraw() {
  return {
    type: types.REDRAW,
  };
}
