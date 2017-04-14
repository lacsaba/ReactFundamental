import React from 'react';
import Button from './Button.jsx';
import Stars from './Stars.jsx';
import Numbers from './Numbers.jsx';
import Answer from './Answer.jsx';

export default class Game extends React.Component {
    state = {
        selectedNumbers: [],
        randomNumbersOfStars: randomNumbersOfStars()
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) > -1) return;
        this.setState(prevState => ({selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)}));
    };

    unselectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) == -1) return;
        this.setState(prevState => ({selectedNumbers: prevState.selectedNumbers.filter((number) => clickedNumber !== number)}));
    }

    render() {
        let { randomNumbersOfStars, selectedNumbers} = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars randomNumbersOfStars={randomNumbersOfStars}/>
                    <Button />
                    <Answer selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber}/>
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers}
                    selectNumber={this.selectNumber}/>
            </div>
        );
    }
}
const randomNumbersOfStars = () => {
    return 1 + Math.floor(Math.random() * 9);
}