import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) > -1) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) > -1) {
            return 'used';
        }
    };

    return (
        <div className="text-center">
            {Numbers.list.map((number, i) => 
                <span key={i}
                    className={numberClassName(number)}
                    onClick={() => props.selectNumber(number)}>{number}</span>)}
        </div>
    );
};
Numbers.list  = _.range(1, 10);

module.exports = Numbers;