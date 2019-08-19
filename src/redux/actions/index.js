import * as types from '../types'

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

export function tokenOk() {
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

export function incrementYear(current) {
    return {
        type: types.INCREMENT_YEAR,
        currentYear: current
    }
}

export function decrementYear(current) {
    return {
        type: types.DECREMENT_YEAR,
        currentYear: current
    }
}

export function fetchAlbumInfo () {
    return {
        type: types.FETCH_ALBUM_INFO
    }
}
