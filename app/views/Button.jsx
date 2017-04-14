import React from 'react';

const Button = (props) => {
    return (
        <div className="col-2">
            <button className="btn">=</button>
            <br /><br />
            <button className="btn btn-warning btn-sm"><i className="fa fa-refresh"></i></button>
        </div>
    );
}

module.exports = Button;