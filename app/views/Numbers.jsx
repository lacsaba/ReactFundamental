import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    return (
        <div className="text-center">
            {Numbers.list.map((number, i) => <span key={i} onClick={() => props.selectNumber(number)}>{number}</span>)}
        </div>
    );
};
Numbers.list  = _.range(1, 10);

module.exports = Numbers;