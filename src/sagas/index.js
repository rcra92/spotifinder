import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../redux/types';

import unirest from 'unirest'
import dig from 'object-dig'

const artistIds = {
	'IronMaiden': '6mdiAmATAx73kdxrNrnlao',

}

export function* checkToken() {
	let headers = {
    			Authorization: `Bearer asd`,
    			Accept: 'application/json',
    			'Content-Type': 'application/json'
    		}

    const action = () => unirest.get('https://api.spotify.com/v1/search?q=raimundos&type=artist')
    	.headers(headers)
    	.end(response => {
    		if (response.status === 200) {
    			console.log(response.body.artists.items)
    			return true
    		} else {
    			let error = dig(response.body, 'error', 'message')
    			console.log(error)
    			if (error === 'Invalid access token') {
    				// yield getToken()
    				return false
    			}
    		}
    	})

    // fetch(req).then(e => {
    // 	e.json()
    // }).then(data => {
    // 	console.log(data)
    // }).catch(error => {
    // 	console.log(error)
    // })
    

    // console.log('>>>>', spot)
    // const response = yield call(fetch, req);
    // const data = yield response.json()
    // yield put({ type: RENDER_TODO_LIST, toDoList: data });
}

export function* getToken() {
	const headers = {
    			Authorization: `Bearer asd`,
    			Accept: 'application/json',
    			'Content-Type': 'application/json'
    		}
	unirest.post('https://accounts.spotify.com/api/token')
		.send('grant_type=client_credentials')
		.headers({Authorization: `Basic ${process.env.REACT_BASE_64}`})
		.end(response => {
			console.log('>>>>', response)
		})
	// yield localStorage.setItem('token', );
}

export function* loadArtists() {
    // yield takeEvery(types.CHECK_TOKEN, checkToken);
    const check = yield* checkToken()
    console.log('.....', check)

    const get = yield* getToken()
    console.log('.....', get)
}

export default function* rootSaga() {
    yield all([loadArtists()]);
}
