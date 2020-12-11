import axios from 'axios';

const initialState = {
    uploadingProgress: 0,
    processingProgress: 0,
}

/**
 * Actions
 */
const SET_UPLOADING_PROGRESS = 'app/upload/SET_UPLOADING_PROGRESS';
const SET_PROCESSING_PROGRESS = 'app/upload/SET_PROCESSING_PROGRESS';

/**
 * Reducer
 */
export default function reducer ( state = initialState, action = {} ) {
    switch (action.type) {
        case SET_UPLOADING_PROGRESS: 
            return {
                ...state,
                uploadingProgress: action.payload,
            }
        case SET_PROCESSING_PROGRESS: 
            return {
                ...state,
                processingProgress: action.payload,
            }
        default: return state;
    }
}

/**
 * Action creators
 */
export function setUploadingProgress(progressPercentage) {
    return {
        type: SET_UPLOADING_PROGRESS,
        payload: progressPercentage,
    };
}

export function setProcessingProgress(progressPercentage) {
    return {
        type: SET_PROCESSING_PROGRESS,
        payload: progressPercentage,
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
        const processingData = (await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (p) => dispatch(setUploadingProgress(p.loaded/p.total)),
        })).data;
        debugger;
        console.log(processingData);
        console.log('uploading finished');

        let isProcessed = false;
        while (!isProcessed) {
            const processing = (await axios.get(`/processing?processingId=${processingData.processingId}`)).data;
            const progress = processing.progress / 100;
            isProcessed = progress === 1;
            dispatch(setProcessingProgress(progress));
            await new Promise(resolve =>
                setTimeout(resolve, 2000)
            );
        }
    }
}

