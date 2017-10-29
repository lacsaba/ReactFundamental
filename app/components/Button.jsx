import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ answerIsCorrect, selectedNumbers,
  removeSelectedNumbers, redraw, redraws, doneStatus, processAnswer }) => {
  let button;
  switch (answerIsCorrect) {
    case false:
      button = <button className='btn btn-danger' onClick={ removeSelectedNumbers }><i className='fa fa-times' /></button>;
      break;
    default:
      button = <button disabled={ selectedNumbers.length === 0 } className='btn' onClick={ processAnswer }>=?</button>;
      break;
  }
  return (
    <div className='text-center col-2'>
      { button }
      <br /><br />
      <button
        className='btn btn-warning btn-sm'
        onClick={ redraw }
        disabled={ !redraws || doneStatus }
      >
        { redraws } <i className='fa fa-refresh' />
      </button>
    </div>
  );
};

Button.propTypes = {
  answerIsCorrect: PropTypes.bool,
  processAnswer: PropTypes.func.isRequired,
  doneStatus: PropTypes.string,
  redraw: PropTypes.func.isRequired,
  redraws: PropTypes.number.isRequired,
  removeSelectedNumbers: PropTypes.func.isRequired,
  selectedNumbers: PropTypes.array,
};
Button.defaultProps = {
  answerIsCorrect: null,
  doneStatus: null,
  selectedNumbers: [],
};

export default Button;
