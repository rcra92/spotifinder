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
    console.log('----- CHECK TOKEN ACTION -----')
    return {
        type: types.CHECK_TOKEN
    };
}

export function getToken() {
    console.log('----- GET TOKEN ACTION -----')
    return {
        type: types.GET_TOKEN
    };
}

export function tokenOk() {
    console.log('----- GET TOKEN ACTION -----')
    return {
        type: types.TOKEN_OK
    };
}

export function fetchArtist(artist) {
    return {
        type: types.FETCH_ARTIST,
        artist: artist
    }
}
