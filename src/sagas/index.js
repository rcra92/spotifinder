import { all, call, put, takeEvery, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import * as types from '../redux/types';

import unirest from 'unirest'

const artistIds = {
	'ironMaiden': '6mdiAmATAx73kdxrNrnlao',
    'raimundos': '3CfJckVRuukdJSvK3r89yJ',
    'metallica': '2ye2Wgw4gimLv2eAKyk1NB',
    'charlieBrown': '1on7ZQ2pvgeQF4vmIA09x5',
    'kingsOfLeon': "2qk9voo8llSGYcZ6xrBzKx"
}

const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_SPOT_TOKEN}`
}

function* spotify (url, headers) {
    return eventChannel(emitter => {
      unirest.get(url)
        .headers(headers)
        .end(response => {
            emitter(response.body)
        })
    
        return () => {
            console.log('FINALIZANDO')
        }
    })
}

function* fetchArtist(action) {

    const url = `https://api.spotify.com/v1/artists/${artistIds[action.artist]}/albums?include_groups=album&limit=50`
    const artist = yield call(spotify, url, headers)

    try {
        const response = yield take(artist)
        
        if (response !== 'ERROR') {
            yield put ({type: types.FETCH_ARTIST_SUCCESS, payload: response.items})
        }
    } catch(error) {
        yield put({type: 'ERROR', error})
    } finally {
        return
    }
}

function* fetchAlbum(action) {
    const url = `https://api.spotify.com/v1/albums/0h63qX1zO0DAJLacVY3I7x/tracks?limit=50`
    const album = yield call(spotify, url, headers)

    try {
        const response = yield take(album)
        if (response !== 'ERROR') {
            yield put ({type: types.FETCH_ALBUM_SUCCESS, payload: response.items})
        }
    } catch(error) {
        yield put({type: 'ERROR', error})
    } finally {
        return
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(types.FETCH_ARTIST, fetchArtist),
        takeEvery(types.FETCH_ALBUM_INFO, fetchAlbum)
    ])
}
