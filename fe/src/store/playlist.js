import { fetchPlaylist } from '../services/playlist';
const initialState = {
    videos: []
}

/**
 * Actions
 */
const UPDATE_PLAYLIST = 'app/playlist/UPDATE_PLAYLIST';

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

/**
 * Thunks
 */
export function loadPlaylist() {
    return async dispatch => {
        const playlist  = await fetchPlaylist();
        dispatch(updatePlaylist(playlist));
    }
}