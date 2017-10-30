import * as types from '../actions/actionTypes';
import { REDRAW_COUNT } from '../helpers/constants';
import possibleSolutions from '../helpers/combinations';
import randomNumber from '../helpers/random';

export const doneStatus = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_DONE_STATUS: {
      if (state.redraws === REDRAW_COUNT && state.usedNumbers.length === 9) {
        return 'You\'re the winner! Flawless victory!';
      }
      if (state.usedNumbers.length === 9) {
        return 'Done. Nice!';
      }
      if (state.redraws === 0 && !possibleSolutions(state)) {
        return 'Game over! You lose.';
      }
      return '';
    }
    default:
      return '';
  }
};

export const game = (state = {}, action) => {
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
    case types.PROCESS_ANSWER: {
      if (state.selectedNumbers.reduce((acc, n) => acc + n, 0) === state.randomNumberOfStars) {
        const newState = Object.assign({}, state, {
          usedNumbers: [...state.usedNumbers, ...state.selectedNumbers],
          selectedNumbers: [],
          randomNumberOfStars: randomNumber(),
          answerIsCorrect: true,
        });

        return Object.assign({}, newState, { doneStatus: doneStatus(newState, { type: types.UPDATE_DONE_STATUS }) });
      }
      return Object.assign({}, state, { answerIsCorrect: false });
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
    // case types.UPDATE_DONE_STATUS: {
    //   if (state.redraws === REDRAW_COUNT && state.usedNumbers.length === 9) {
    //     return Object.assign({}, state, { doneStatus: 'You\'re the winner! Flawless victory!' });
    //   }
    //   if (state.usedNumbers.length === 9) {
    //     return Object.assign({}, state, { doneStatus: 'Done. Nice!' });
    //   }
    //   if (state.redraws === 0 && !possibleSolutions(state)) {
    //     return Object.assign({}, state, { doneStatus: 'Game over! You lose.' });
    //   }
    //   return state;
    // }
    case types.REDRAW: {
      const doRedraw = () => {
        const newState = Object.assign({}, state, {
          selectedNumbers: [],
          answerIsCorrect: null,
          redraws: state.redraws - 1,
          randomNumberOfStars: randomNumber(),
        });

        return Object.assign({}, newState,
          { doneStatus: doneStatus(newState, { type: types.UPDATE_DONE_STATUS }) });
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
      return state;
    }
    default:
      return state;
  }
};