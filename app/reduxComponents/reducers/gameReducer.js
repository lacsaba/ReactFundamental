import * as types from '../actions/actionTypes';

export default function gameReducer(state = [], action) {
    switch(action.type) {
        case types.SELECT_NUMBER:
            return [...state, Object.assign({}, action.num)];
        default:
            return state;
    }
}