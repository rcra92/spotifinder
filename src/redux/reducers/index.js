import * as types from '../types';
import _ from 'lodash'

const initialState = {
    toDoList: [],
    artist: null,
    albums: [],
    releaseYears: [],
    selectedYears: {
        hasPrevious: null,
        hasNext: null,
        current: 0
    }
};

function buildBody (albums) {
    console.log('albums', albums)

    let response = []
    let tmp = 0
    let perYear = 1
    let key = 1
    let releaseYears = []
    albums.map((album, index) => {
        const release = parseInt(album.release_date.substring(0, 4))
        if (release === tmp) {
            key = key + 1
            if (perYear < key) perYear = key
            let previous = index - 1
            let auxIndex = response.findIndex(obj => obj.name === tmp)
            console.log('operation', index, response[auxIndex])
            response[auxIndex][`album${key}`] = album.total_tracks
            response[auxIndex][`title${key}`] = album.name
        } else {
            key = 1
            releaseYears.push(release)
            response.push({ name: release, [`album${key}`]: album.total_tracks,
            [`title${key}`]: album.name })
        }
        tmp = release
    })
    // for (let i = 0; i<2019; i = i+1) {
    //     tmp.push({ name: i, uv: 400, pv: 1000, amt: 3000 }) 
    // }
    console.log('>>>>', response)
    return { response, albumsPerYear: perYear, releaseYears: releaseYears }
}

function shiftPosition (action, state, current) {
    console.log('>>>>>>>', action, state, current)
    let index = state.releaseYears.findIndex(arr => arr === current)
    let hasNext = state.selectedYears.hasNext
    let hasPrevious = state.selectedYears.hasPrevious
    if (action === 'increment') {
        hasPrevious = state.releaseYears[index]
        index = index - 1
        if (index > 0) {
            hasNext = state.releaseYears[index + 1]
        } else {
            hasNext = null
        }
    } else {
        hasNext = state.releaseYears[index]
        index = index + 1
        if (index < (state.releaseYears.length - 1)) {
            hasPrevious = state.releaseYears[index + 1]
        } else {
            hasPrevious = null
        }
    }

    // if (index === 0) {
    //     hasNext = state.releaseYears[index - 1]

    // } else if (index < (state.releaseYears.length - 1)) {
    //     hasPrevious = state.releaseYears[index + 1]
    //     hasNext = state.releaseYears[index - 1]
    // }

    console.log('---- index', index, state.releaseYears[index])
    return {current: state.releaseYears[index], hasPrevious: hasPrevious, hasNext: hasNext }
}

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
        case types.FETCH_ARTIST_SUCCESS:
            const body = buildBody(action.payload)
            return { 
                ...state,
                albums: _.reverse(body.response),
                albumsPerYear: body.albumsPerYear,
                releaseYears: body.releaseYears,
                selectedYears: {
                    ...{current: body.releaseYears[0]},
                    ...{hasPrevious: true},
                    hasNext: false
                }
            }
        case types.INCREMENT_YEAR:
            return { ...state, selectedYears: shiftPosition('increment', state, action.currentYear)}
        case types.DECREMENT_YEAR:
            return { ...state, selectedYears: shiftPosition('decrement', state, action.currentYear)}
        default:
        console.log('----- REDUCER -----', action)
            return state;
    }
}