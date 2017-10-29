import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '../actions/gameActions';
import { REDRAW_COUNT } from '../helpers/constants';

import Button from '../components/Button.jsx';
import Stars from '../components/Stars.jsx';
import Numbers from '../components/Numbers.jsx';
import Answer from '../components/Answer.jsx';
import Done from '../components/Done.jsx';

const Game = ({ randomNumberOfStars, selectedNumbers, usedNumbers,
  answerIsCorrect, redraws, doneStatus, actions }) => (
    <div className='container'>
      <h3>Play Nine</h3> <small>Solve the equation</small>
      <h2>Answer is correct: { answerIsCorrect }</h2>
      <hr />
      <div className='row'>
        <div className='col-1' />
        <Stars randomNumberOfStars={ randomNumberOfStars } />
        <Button
          selectedNumbers={ selectedNumbers }
          answerIsCorrect={ answerIsCorrect }
          processAnswer={ actions.processAnswer }
          redraw={ actions.redraw }
          redraws={ redraws }
          removeSelectedNumbers={ actions.removeSelectedNumbers }
          doneStatus={ doneStatus }
        />
        <Answer
          selectedNumbers={ selectedNumbers }
          unselectNumber={ actions.unselectNumber }
        />
        <div className='col-1' />
      </div>
      <br />
      <Numbers
        selectedNumbers={ selectedNumbers }
        usedNumbers={ usedNumbers }
        selectNumber={ actions.selectNumber }
        doneStatus={ doneStatus }
      />
      {doneStatus
        ? <Done doneStatus={ doneStatus } resetGame={ actions.resetGame } />
        : ''
      }
    </div>
);

Game.propTypes = {
  randomNumberOfStars: PropTypes.number.isRequired,
  selectedNumbers: PropTypes.array,
  usedNumbers: PropTypes.array,
  answerIsCorrect: PropTypes.bool,
  redraws: PropTypes.number,
  doneStatus: PropTypes.string,
  actions: PropTypes.object.isRequired,
};

Game.defaultProps = {
  redraws: REDRAW_COUNT,
  selectedNumbers: [],
  usedNumbers: [],
  answerIsCorrect: null,
  doneStatus: null,
};

function mapStateToProps(state) {
  return {
    selectedNumbers: state.game.selectedNumbers,
    answerIsCorrect: state.game.answerIsCorrect,
    usedNumbers: state.game.usedNumbers,
    randomNumberOfStars: state.game.randomNumberOfStars,
    redraws: state.game.redraws,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

