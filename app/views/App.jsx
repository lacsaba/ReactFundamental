import React from 'react';
import Game from './Game.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Play game</h2>
                <Game />
            </div>
        );
    }
}