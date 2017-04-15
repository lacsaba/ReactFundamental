import React from 'react';

const Done = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button onClick={props.resetGame} className="btn btn-primary">Play again!</button>
        </div>
    );
};

module.exports = Done;