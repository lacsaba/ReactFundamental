import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ selectedNumbers, unselectNumber }) => {
  return (
    <div className='text-center col-4'>
      <div>
        { selectedNumbers.map((number) =>
          (<button
            key={ number }
            className='numbers'
            onClick={ () => unselectNumber(number) }
          >
            { number }
          </button>)) }
      </div>
    </div>
  );
};

Answer.propTypes = {
  selectedNumbers: PropTypes.array,
  unselectNumber: PropTypes.func.isRequired,
};
Answer.defaultProps = {
  selectedNumbers: [],
};

export default Answer;
