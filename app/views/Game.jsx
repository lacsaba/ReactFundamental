// feature requests:
// - a számokat meg lehessen adni billentyűzettel is
// - legyen timeout
// - játék végén is újra generálja a csillagokat
// - confirm kérdés frissítés esetén, ha van válasz
import React from 'react';
import Button from './Button.jsx';
import Stars from './Stars.jsx';
import Numbers from './Numbers.jsx';
import Answer from './Answer.jsx';
import Done from './Done.jsx';

export default class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    state = {
        selectedNumbers: [],
        usedNumbers: [],
        randomNumbersOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) > -1) return;
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null
        }));
    };

    unselectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) == -1) return;
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter((number) => clickedNumber !== number),
            answerIsCorrect: null
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) == prevState.randomNumbersOfStars 
        }), this.acceptAnswer);
    };

    acceptAnswer = () => {
        this.state.answerIsCorrect && setTimeout(() => { 
            this.setState(prevState => ({
                usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                selectedNumbers: [],
                randomNumbersOfStars: Game.randomNumber(),
                answerIsCorrect: null
            }), this.updateDoneStatus);
    }, 500)};

    redraw = () => {
        if (this.state.redraws <= 0) return;
        this.setState(prevState => ({
            selectedNumbers: [],
            randomNumbersOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    };

    removeSelectedNumbers = () => {
        this.setState({ 
            selectedNumbers: [],
            answerIsCorrect: null
        });
    };

    resetGame = () => {
        this.setState({
            usedNumbers: [],
            selectedNumbers: [],
            answerIsCorrect: null,
            redraws: 5,
            randomNumbersOfStars: Game.randomNumber(),
            doneStatus: null
        });
    }

    possibleSolutions = ({randomNumbersOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1);

        return possibleCombinationSum(possibleNumbers, randomNumbersOfStars);    
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game over! You lose.'};
            }
        });
    }

    render() {
        let { 
            randomNumbersOfStars, 
            selectedNumbers,
            usedNumbers,
            answerIsCorrect,
            redraws,
            doneStatus
        } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3> <small>Solve the equation</small>
                <hr />
                <div className="row">
                    <div className="col-1"></div>
                    <Stars randomNumbersOfStars={randomNumbersOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                        answerIsCorrect= {answerIsCorrect}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redraws={redraws}
                        removeSelectedNumbers={this.removeSelectedNumbers}
                        doneStatus={doneStatus}/>
                    <Answer selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber}/>
                    <div className="col-1"></div>
                </div>
                <br />
                <Numbers selectedNumbers={selectedNumbers}
                    usedNumbers={usedNumbers}
                    selectNumber={this.selectNumber}/>
                {doneStatus 
                    ? <Done doneStatus={doneStatus} resetGame={this.resetGame}/>
                    : ''
                }
                
            </div>
        );
    }
}

const possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};