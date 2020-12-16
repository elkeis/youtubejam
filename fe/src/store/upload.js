import {
    upload,
    trackProcessing,
} from '../services/upload';

import {
    pushError
} from './errors';

const initialState = {
    uploadingProgress: 0,
    processingProgress: 0,
    uploadingResult: undefined,
    error: undefined,
}

/**
 * Actions
 */
const SET_UPLOADING_PROGRESS = 'app/upload/SET_UPLOADING_PROGRESS';
const SET_PROCESSING_PROGRESS = 'app/upload/SET_PROCESSING_PROGRESS';
const SET_UPLOADING_RESULT = 'app/upload/SET_UPLOADING_RESULT';
const CLEAR_DATA = 'app/upload/CLEAR_DATA';

/**
 * Reducer
 */
export default function reducer ( state = initialState, action = {} ) {
    switch (action.type) {
        case SET_UPLOADING_PROGRESS: 
            return {
                ...state,
                uploadingProgress: action.payload,
            };
        case SET_PROCESSING_PROGRESS: 
            return {
                ...state,
                processingProgress: action.payload,
            };
        case SET_UPLOADING_RESULT: 
            return {
                ...state,
                uploadingResult: action.payload,
            };
        case CLEAR_DATA:
            return initialState;
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

export function setUploadingResult(uploadingResult) {
    return {
        type: SET_UPLOADING_RESULT,
        payload: uploadingResult,
    }
}

export function clearData() {
    return { type: CLEAR_DATA }
}

/**
 * Thunks
 */
export function uploadFile(file) {
    return async dispatch => {
        try {
            const processing = await upload(file, (progress) => {
                dispatch(setUploadingProgress(progress))
            });

            const finishedProcessing = await trackProcessing(processing.id, progress => {
                if (processing.error) {
                    dispatch(pushError(processing.error));
                    dispatch(clearData());
                } else {
                    dispatch(setProcessingProgress(progress));
                }
            });
            
            dispatch(setUploadingResult(finishedProcessing.video));

        } catch (e) {
            dispatch(pushError({
                message: e.message
            }));
            dispatch(clearData());
        }
    }
}

