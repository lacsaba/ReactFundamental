import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const arrayOfNumbers = _.range(1, 10);

    return (
        <div className="row">
            {arrayOfNumbers.map((number, i) => <span key={i}>{number}</span>)}
        </div>
    );
};

module.exports = Numbers;