import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Stars = ({ randomNumberOfStars }) => {
  const stars = _.range(randomNumberOfStars).map((star) => <i key={ star } className='fa fa-star' />);
  return (
    <div className='col-4 fade-in'>
      {stars}
    </div>
  );
};

Stars.propTypes = {
  randomNumberOfStars: PropTypes.number.isRequired,
};

export default Stars;
