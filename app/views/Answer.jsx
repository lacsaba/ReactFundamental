import React from 'react';

const Answer = (props) => {

    return (
        <div className="text-center col-4">
            <div>
                {props.selectedNumbers.map((number, i) => <button key={i}
                    className="numbers" 
                    onClick={() => props.unselectNumber(number)}>{number}</button>)}
            </div>
        </div>
    );
};

module.exports = Answer;