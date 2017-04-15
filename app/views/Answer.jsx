import React from 'react';

const Answer = (props) => {

    return (
        <div className="text-center col-3">
            <div>
                {props.selectedNumbers.map((number, i) => <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>)}
            </div>
        </div>
    );
};

module.exports = Answer;