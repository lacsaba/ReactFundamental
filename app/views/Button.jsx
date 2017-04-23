import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = <button className='btn btn-success'><i className='fa fa-check' /></button>;
      break;
    case false:
      button = <button className='btn btn-danger' onClick={ props.removeSelectedNumbers }><i className='fa fa-times' /></button>;
      break;
    default:
      button = <button disabled={ props.selectedNumbers.length === 0 } className='btn' onClick={ props.checkAnswer }>=?</button>;
      break;
  }
  return (
    <div className='text-center col-2'>
      { button }
      <br /><br />
      <button
        className='btn btn-warning btn-sm'
        onClick={ props.redraw }
        disabled={ !props.redraws || props.doneStatus }
      >
        { props.redraws } <i className='fa fa-refresh' />
      </button>
    </div>
  );
};

Button.propTypes = {
  answerIsCorrect: PropTypes.bool,
  checkAnswer: PropTypes.func.isRequired,
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

module.exports = Button;
