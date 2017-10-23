import { setRandomNumberOfStars } from './gameActions';
import randomNumber from '../helpers/random';

export const getRandomNumberOfStars = () => dispatch => {
  dispatch(setRandomNumberOfStars(randomNumber()));
};
