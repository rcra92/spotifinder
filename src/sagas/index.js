import { all, call, put, takeEvery, select, fork, take, race, delay, takeLatest } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'
import * as types from '../redux/types';

import unirest from 'unirest'
import dig from 'object-dig'

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

function* fetchApi (artist) {
    const headers = {
                Authorization: `Bearer ${process.env.REACT_APP_SPOT_TOKEN}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }

    return eventChannel(emitter => {
      unirest.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
        .headers(headers)
        .end(response => {
            if (response.status === 200) {
                console.log(response.body.artists.items)
                emitter(response.body.artists.items)
            } else {
                let error = dig(response.body, 'error', 'message')
                console.log(error)
                if (error === 'Invalid access token') {
                    emitter('ERROR')
                }
            }
        })

    
        return () => {
            console.log('FINALIZANDO')
        }
    })
}


export function* getToken() {
    const headers = {
                Authorization: `Basic ${process.env.REACT_BASE_64}`
            }
    return eventChannel(emitter => {
      unirest.post('https://accounts.spotify.com/api/token')
        .send('grant_type=client_credentials')
        .headers(headers)
        .end(response => {
            console.log('>>>>', response)
            emitter(response)
        })
    
        return () => {
            console.log('FINALIZANDO')
        }
    })
}



function* authorize() {
  console.log('>>>>555')
  const teste = yield call(fetchApi)
  yield call(console.log, `----- ${teste} -----`)
  try {
    const response = yield take(teste)
    
    console.log('>>>>666')
    yield call(console.log, response)
    if (response === 'ERROR') {
        const token = yield call(getToken)
        const ok = yield take(token)
        yield call(console.log, ok)
    } else {
        yield call(console.log, 'DEU CERTO!!')
    }
    console.log('>>>>777')
  } catch(error) {
    console.log('>>>>888')
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    console.log('countdown terminated')
  }
}

function* loginFlow() {
  while (true) {
    console.log('>>>>')
    yield fork(authorize)
    const check = yield take('TOKEN_OK')
    console.log('>>>>222')
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    console.log('>>>>333')
    yield call(console.log, 'token')
  }
  console.log('>>>>>>> VAMO LÁ >>>>>>>>')
}

function* spotify (url, params, headers) {
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
    const state = yield select()

    console.log('action', action.artist)
    console.log('state after', state)
    const url = `https://api.spotify.com/v1/artists/${artistIds[action.artist]}/albums?include_groups=album&limit=50`
    const params = 'lala'
    const artist = yield call(spotify, url, params, headers)

    yield call(console.log, `----- ${artist} -----`)
    try {
        const response = yield take(artist)
        
        console.log('>>>>666')
        yield call(console.log, response)
        if (response === 'ERROR') {
            const token = yield call(getToken)
            const ok = yield take(token)
            yield call(console.log, ok)
        } else {
            yield call(console.log, 'DEU CERTO!!', response.items)
            yield put ({type: types.FETCH_ARTIST_SUCCESS, payload: response.items})
        }
        console.log('>>>>777')
    } catch(error) {
        console.log('>>>>888')
        yield put({type: 'LOGIN_ERROR', error})
    } finally {
        console.log('countdown terminated')
    }
}

export default function* rootSaga() {
    yield all([takeEvery(types.CHECK_TOKEN, loginFlow),
        takeEvery(types.FETCH_ARTIST, fetchArtist)])
}
