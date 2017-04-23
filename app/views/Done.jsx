import React from 'react';
import PropTypes from 'prop-types';

const Done = (props) => {
  return (
    <div className='text-center'>
      <h2>{ props.doneStatus }</h2>
      <button onClick={ props.resetGame } className='btn btn-primary'>Play again!</button>
    </div>
  );
};
Done.propTypes = {
  doneStatus: PropTypes.string.isRequired,
  resetGame: PropTypes.func.isRequired,
};

module.exports = Done;
