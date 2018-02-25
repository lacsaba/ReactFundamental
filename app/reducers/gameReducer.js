import * as types from '../actions/actionTypes';
import { REDRAW_COUNT } from '../helpers/constants';
import possibleSolutions from '../helpers/combinations';
import randomNumber from '../helpers/random';

export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case types.SELECT_NUMBER: {
      if (state.selectedNumbers && (state.selectedNumbers.indexOf(action.clickedNumber) > -1
      || (state.usedNumbers && state.usedNumbers.indexOf(action.clickedNumber) > -1))) {
        return state;
      }
      if (!state.selectedNumbers) {
        return Object.assign({}, state, { selectedNumbers: [action.selectedNumber] });
      }
      return Object.assign({}, state, { selectedNumbers: [...state.selectedNumbers, action.selectedNumber] });
    }
    case types.UNSELECT_NUMBER: {
      if (state.selectedNumbers.indexOf(action.selectedNumber) === -1) return state;
      return Object.assign({}, state, { selectedNumbers: state.selectedNumbers.filter(item => item !== action.selectedNumber), answerIsCorrect: null });
    }
    case types.ACCEPT_ANSWER: {
      return Object.assign({}, state, { usedNumbers: state.usedNumbers.concat(state.selectedNumbers), selectedNumbers: [], answerIsCorrect: null });
    }
    case types.SET_RANDOM_NUMBER_OF_STARS: {
      return Object.assign({}, state, { randomNumberOfStars: action.randomNumberOfStars });
    }
    case types.REMOVE_SELECTED_NUMBERS: {
      return Object.assign({}, state, { selectedNumbers: [], answerIsCorrect: null });
    }
    case types.RESET_GAME: {
      return {
        usedNumbers: [],
        selectedNumbers: [],
        answerIsCorrect: null,
        redraws: REDRAW_COUNT,
        randomNumbersOfStars: randomNumber(),
        doneStatus: null,
      };
    }
    case types.UPDATE_DONE_STATUS: {
      if (state.redraws === REDRAW_COUNT && state.usedNumbers.length === 9) {
        return Object.assign({}, state, { doneStatus: 'You\'re the winner! Flawless victory!' });
      }
      if (state.usedNumbers.length === 9) {
        return Object.assign({}, state, { doneStatus: 'Done. Nice!' });
      }
      if (state.redraws === 0 && !possibleSolutions(state)) {
        return Object.assign({}, state, { doneStatus: 'Game over! You lose.' });
      }
      return state;
    }
    case types.REDRAW: {
      const doRedraw = () => {
        return Object.assign({}, state, { selectedNumbers: [], answerIsCorrect: null, redraws: state.redraws - 1, randomNumberOfStars: randomNumber() });
      };

      if (state.redraws <= 0) return state;
      if (state.selectedNumbers && state.selectedNumbers.length) {
        if (confirm('Are you sure you want to to redraw the stars? You have numbers selected.')) {
          return doRedraw();
        }
      } else {
        return doRedraw();
      }
      // call updateDoneStatus
      break;
    }
    default:
      return state;
  }
}
