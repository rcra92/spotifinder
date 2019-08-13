import * as types from '../types';

export const ADD_TODO = 'ADD_TODO';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';
export const RENDER_TODO_LIST = 'RENDER_TODO_LIST';

const initialState = {
    toDoList: []
};

export default function toDoApp(state = initialState, action) {
    switch (action.type) {
        case types.RENDER_TODO_LIST:
            return {
                ...state,
                toDoList: action.toDoList
            };
        case types.ADD_TODO:
            let newToDoList = [
                ...state.toDoList,
                {
                    ...action.toDoItem
                }
            ];
            return {
                ...state,
                toDoList: newToDoList
            };
        default:
            return state;
    }
}