import * as types from '../types'

export function addToDo(title) {
    return {
        type: types.ADD_TODO,
        toDoItem: {
            _id: (new Date().getTime()).toString(),
            title
        }
    };
}

export function checkToken() {
    return {
        type: types.CHECK_TOKEN
    };
}

export function getToken() {
    return {
        type: types.GET_TOKEN
    };
}
