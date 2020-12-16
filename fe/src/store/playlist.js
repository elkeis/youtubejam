import { fetchPlaylist } from '../services/playlist';
import { pushError } from './errors';
const initialState = {
    videos: [],
    showLoading: false,
    error: undefined,
}

/**
 * Actions
 */
const UPDATE_PLAYLIST = 'app/playlist/UPDATE_PLAYLIST';
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
            dispatch(pushError({
                message: e.message,
                // action: () => loadPlaylist()
            }));
        }
    }
}