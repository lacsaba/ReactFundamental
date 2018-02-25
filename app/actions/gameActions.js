import * as types from './actionTypes';
import randomNumber from '../helpers/random';

export const selectNumber = selectedNumber => ({
  type: types.SELECT_NUMBER,
  selectedNumber
});

export const unselectNumber = selectedNumber => ({
  type: types.UNSELECT_NUMBER,
  selectedNumber
});

export const acceptAnswer = () => ({
  type: types.ACCEPT_ANSWER
});

export const setRandomNumberOfStars = randomNumberOfStars => ({
  type: types.SET_RANDOM_NUMBER_OF_STARS,
  randomNumberOfStars
});

export const updateDoneStatus =  () => ({
  type: types.UPDATE_DONE_STATUS
});

export const checkAnswer = () => {
  return (dispatch, getState) => {
    const state = getState().game;
    if (state.selectedNumbers.reduce((acc, n) => acc + n, 0) === state.randomNumberOfStars) {
      dispatch(acceptAnswer());
      dispatch(setRandomNumberOfStars(randomNumber()));
      dispatch(updateDoneStatus());
    }
  };
};

export const removeSelectedNumbers = () => ({
  type: types.REMOVE_SELECTED_NUMBERS
});

export const resetGame = () => ({
  type: types.RESET_GAME
});

export const redraw = () => ({
  type: types.REDRAW
});
