import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../reduxComponents/actions/gameActions';
import _ from 'lodash';

import Button from './Button.jsx';
import Stars from './Stars.jsx';
import Numbers from './Numbers.jsx';
import Answer from './Answer.jsx';
import Done from './Done.jsx';

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);

    this.state = {
      selectedNumbers: [],
      usedNumbers: [],
      randomNumbersOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      redraws: Game.redrawCount,
      doneStatus: null
    };
  }

  static randomNumber = () => {
    // ez nem úgy néz ki, mint ami működik, meg egyébként sincs itt jó helyen.
    document.getElementsByClassName('fade').className = 'col-4 fade';
    setTimeout(() => {
      document.getElementsByClassName('fade').className += 'in';
    }, 2000);
    return 1 + Math.floor(Math.random() * 9);
  }
  static redrawCount = 5;

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) > -1
      || this.state.usedNumbers.indexOf(clickedNumber) > -1) return;
    this.props.actions.selectNumber(clickedNumber);
    // this.setState(prevState => ({
    //   selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
    //   answerIsCorrect: null,
    // }));
  };

  unselectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) === -1) return;
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter((number) => clickedNumber !== number),
      answerIsCorrect: null,
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect:
      prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) === prevState.randomNumbersOfStars,
    }), this.acceptAnswer);
  };

  acceptAnswer = () => {
    this.state.answerIsCorrect && setTimeout(() => {
      this.setState(prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
      }), this.updateDoneStatus);
    }, 500);
  };

  redraw = () => {
    if (this.state.redraws <= 0) return;

    const self = this;
    function doRedraw() {
      self.setState(prevState => ({
        selectedNumbers: [],
        answerIsCorrect: null,
        redraws: prevState.redraws - 1,
      }), self.updateDoneStatus);
    }
    if (this.state.selectedNumbers.length) {
      if (confirm('Are you sure you want to to redraw the stars? You have numbers selected.')) {
        doRedraw();
      }
    } else {
      doRedraw();
    }
  };

  removeSelectedNumbers = () => {
    this.setState({
      selectedNumbers: [],
      answerIsCorrect: null,
    });
  };

  resetGame = () => {
    this.setState({
      usedNumbers: [],
      selectedNumbers: [],
      answerIsCorrect: null,
      redraws: Game.redrawCount,
      randomNumbersOfStars: Game.randomNumber(),
      doneStatus: null,
    });
  }

  possibleSolutions = ({ randomNumbersOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1);

    return possibleCombinationSum(possibleNumbers, randomNumbersOfStars);
  };
  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.redraws === Game.redrawCount && prevState.usedNumbers.length === 9) {
        return { doneStatus: 'You\'re the winner! Flawless victory!' };
      }
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done. Nice!' };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game over! You lose.' };
      }
      return { randomNumbersOfStars: Game.randomNumber() };
    });
  }

  render() {
    const {
      randomNumbersOfStars,
      selectedNumbers,
      usedNumbers,
      answerIsCorrect,
      redraws,
      doneStatus,
    } = this.state;
    return (
      <div className='container'>
        <h3>Play Nine</h3> <small>Solve the equation</small>
        <hr />
        <div className='row'>
          <div className='col-1' />
          <Stars randomNumbersOfStars={randomNumbersOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            answerIsCorrect={answerIsCorrect}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
            removeSelectedNumbers={this.removeSelectedNumbers}
            doneStatus={doneStatus}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
          <div className='col-1' />
        </div>
        <br />
        <Numbers
          selectedNumbers={selectedNumbers}
          usedNumbers={usedNumbers}
          selectNumber={this.selectNumber}
          doneStatus={doneStatus}
        />
        {doneStatus
          ? <Done doneStatus={doneStatus} resetGame={this.resetGame} />
          : ''
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedNumbers: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

function possibleCombinationSum(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  const listSize = arr.length;
  const combinationsCount = (1 << listSize);
  for (let i = 1; i < combinationsCount; i++) {
    let combinationSum = 0;
    for (let j = 0; j < listSize; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
}
