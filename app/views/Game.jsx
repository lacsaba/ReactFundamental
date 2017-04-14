import React from 'react';
import Button from './Button.jsx';
import Stars from './Stars.jsx';
import Numbers from './Numbers.jsx';

export default class Game extends React.Component {
    state = {
        selectedNumbers: [],
        randomNumbersOfStars: randomNumbersOfStars()
    };
    render() {
        let { randomNumbersOfStars, selectedNumbers} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <Stars randomNumbersOfStars={randomNumbersOfStars}/>
                    <Button />
                </div>
                <div>
                    <Numbers selectedNumbers={selectedNumbers}/>
                </div>
            </div>
        );
    }
}
const randomNumbersOfStars = () => {
    return 1 + Math.floor(Math.random() * 9);
}