import axios from 'axios';

const initialState = {
    progress: 0,
    isUploading: false,
}

/**
 * Actions
 */
const SET_PROGRESS = 'app/upload/SET_PROGRESS';
const SET_IS_UPLOADING = 'app/upload/SET_IS_UPLOADING';

/**
 * Reducer
 */
export default function reducer ( state = initialState, action = {} ) {
    switch (action.type) {
        case SET_PROGRESS: 
            return {
                ...state,
                progress: action.payload,
            }
        case SET_IS_UPLOADING: 
            return {
                ...state,
                isUploading: action.payload,
            }
        default: return state;
    }
}

/**
 * Action creators
 */
export function setProgress(progressPercentage) {
    return {
        type: SET_PROGRESS,
        payload: progressPercentage,
    };
}

export function setIsUploading(isUploading) {
    return {
        type: SET_IS_UPLOADING,
        payload: isUploading,
    };
}

/**
 * Thunks
 */
export function uploadFile(file) {
    return async dispatch => {
        //testing 
        const formData = new FormData();
        formData.append('video', file);
        await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (p) => dispatch(setProgress(p.loaded/p.total)),
        });
        console.log('uploading finished');
    }
}

