import * as types from './actionTypes';

export const selectNumber = selectedNumber => ({
  type: types.SELECT_NUMBER,
  selectedNumber
});

export const unselectNumber = selectedNumber => ({
  type: types.UNSELECT_NUMBER,
  selectedNumber
});

export const processAnswer = () => ({
  type: types.PROCESS_ANSWER
});

export const setRandomNumberOfStars = randomNumberOfStars => ({
  type: types.SET_RANDOM_NUMBER_OF_STARS,
  randomNumberOfStars
});

export const removeSelectedNumbers = () => ({
  type: types.REMOVE_SELECTED_NUMBERS
});

export const resetGame = () => ({
  type: types.RESET_GAME
});

export const redraw = () => ({
  type: types.REDRAW
});
