import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Numbers = ({ selectedNumbers, usedNumbers, doneStatus, selectNumber }) => {
  const numberClassName = (number) => {
    let classes = 'numbers';
    if (selectedNumbers && selectedNumbers.indexOf(number) > -1) {
      classes += ' selected';
    }
    if (selectedNumbers && usedNumbers.indexOf(number) > -1) {
      classes += ' used';
    }
    if (doneStatus) {
      classes += ' numbers-disabled';
    }
    return classes;
  };

  return (
    <div className='text-center'>
      {Numbers.list.map((number) =>
        (<button
          key={ number }
          className={ numberClassName(number) }
          onClick={ () => selectNumber(number) }
          disabled={ doneStatus }
        >
          { number }
        </button>))}
    </div>
  );
};

Numbers.list = _.range(1, 10);
Numbers.propTypes = {
  doneStatus: PropTypes.string,
  selectedNumbers: PropTypes.arrayOf(PropTypes.number),
  usedNumbers: PropTypes.arrayOf(PropTypes.number),
  selectNumber: PropTypes.func.isRequired,
};
Numbers.defaultProps = {
  doneStatus: null,
  selectedNumbers: [],
  usedNumbers: [],
};

export default Numbers;
