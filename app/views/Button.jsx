import React from 'react';

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success"><i className="fa fa-check"></i></button>
            break;
        case false:
            button = <button className="btn btn-danger" onClick={props.removeSelectedNumbers}><i className="fa fa-times"></i></button>
            break;
        default:
            button = <button disabled={props.selectedNumbers.length === 0} className="btn" onClick={props.checkAnswer}>=?</button>
            break;
    }
    return (
        <div className="text-center col-2">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm" 
                onClick={props.redraw}
                disabled={!props.redraws || props.doneStatus}>
                {props.redraws} <i className="fa fa-refresh"></i></button>
        </div>
    );
}

module.exports = Button;