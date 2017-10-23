import React from 'react';
import PropTypes from 'prop-types';

const Done = ({ doneStatus, resetGame }) => {
  return (
    <div className='text-center'>
      <h2>{ doneStatus }</h2>
      <button onClick={ resetGame } className='btn btn-primary'>Play again!</button>
    </div>
  );
};
Done.propTypes = {
  doneStatus: PropTypes.string,
  resetGame: PropTypes.func.isRequired,
};

Done.defaultProps = {
  doneStatus: null,
};

export default Done;
