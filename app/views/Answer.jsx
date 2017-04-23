import React from 'react';
import PropTypes from 'prop-types';

const Answer = (props) => {
  return (
    <div className='text-center col-4'>
      <div>
        { props.selectedNumbers.map((number) =>
          <button
            key={ number }
            className='numbers'
            onClick={ () => props.unselectNumber(number) }
          >
            { number }
          </button>) }
      </div>
    </div>
  );
};

Answer.propTypes = {
  selectedNumbers: PropTypes.array,
};
Answer.defaultProps = {
  selectedNumbers: [],
};

module.exports = Answer;
