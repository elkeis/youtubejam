import { fetchPlaylist } from '../services/playlist';
const initialState = {
    videos: [],
    showLoading: false,
    error: undefined,
}

/**
 * Actions
 */
const UPDATE_PLAYLIST = 'app/playlist/UPDATE_PLAYLIST';
const SET_ERROR = 'app/playlist/SET_ERROR';
const SET_LOADING = 'app/playlist/SHOW_LOADING';

/**
 * Reducer
 */
export default function reducer (state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_PLAYLIST: 
            return {
                ...state,
                videos: [...action.payload]
            }
        case SET_LOADING:
            return {
                ...state,
                showLoading: action.payload,
            }
        case SET_ERROR: 
            return {
                ...state,
                error: action.payload,
            }
        default: return state;
    }
}

/**
 * Action Creators 
 */
export function updatePlaylist(playlist) {
    return {
        type: UPDATE_PLAYLIST,
        payload: playlist
    }
}

export function setError(errorObject) {
    return {
        type: SET_ERROR,
        payload: errorObject,
    }
}

export function setLoading(showLoading) {
    return {
        type: SET_LOADING,
        payload: showLoading,
    }
}

/**
 * Thunks
 */
export function loadPlaylist() {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const playlist  = await fetchPlaylist();
            dispatch(setLoading(false));
            dispatch(updatePlaylist(playlist));
        } catch (e) { 
            dispatch(setLoading(false));
            dispatch(setError({
                message: e.message
            }));
        }
    }
}