import * as types from '../types';

const initialState = {
    toDoList: []
};

export default function spotiFinder(state = initialState, action) {
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