import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Numbers = (props) => {
  const numberClassName = (number) => {
    let classes = 'numbers';
    if (props.selectedNumbers.indexOf(number) > -1) {
      classes += ' selected';
    }
    if (props.usedNumbers.indexOf(number) > -1) {
      classes += ' used';
    }
    if (props.doneStatus) {
      classes += ' numbers-disabled';
    }
    return classes;
  };

  return (
    <div className='text-center'>
      {Numbers.list.map((number) =>
        <button
          key={ number }
          className={ numberClassName(number) }
          onClick={ () => props.selectNumber(number) }
          disabled={ props.doneStatus }
        >
          { number }
        </button>)}
    </div>
  );
};

Numbers.list = _.range(1, 10);
Numbers.propTypes = {
  doneStatus: PropTypes.string,
};
Numbers.defaultProps = {
  doneStatus: null,
};

module.exports = Numbers;
