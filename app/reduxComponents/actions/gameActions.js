import * as types from './actionTypes';

export function selectNumber(num) {
    return {
        type: types.SELECT_NUMBER,
        num
    };
}