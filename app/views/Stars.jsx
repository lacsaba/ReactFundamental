import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Stars = (props) => {
  const stars = _.range(props.randomNumbersOfStars).map((star) => <i key={ star } className='fa fa-star' />);
  return (
    <div className='col-4 fade-in'>
      {stars}
    </div>
  );
};

Stars.propTypes = {
  randomNumbersOfStars: PropTypes.number.isRequired,
};

module.exports = Stars;
