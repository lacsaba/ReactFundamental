import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    const stars = _.range(props.randomNumbersOfStars).map((star, i) => <i key={i} className="fa fa-star"></i>);
    return (
        <div className="col-4 fade-in">
            {stars}
        </div>
    );
};

module.exports = Stars;