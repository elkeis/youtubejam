const initialState = {
    errorList: [],
}

/**
 * Actions
 */
const PUSH_ERROR = 'app/errors/PUSH_ERROR';
const REMOVE_ERROR = 'app/errors/REMOVE_ERROR';

/**
 * Reducer
 */
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case PUSH_ERROR:
            return {
                ...state,
                errorList: [...state.errorList, action.payload]
            };
        case REMOVE_ERROR:
            return {
                ...state,
                errorList: state.errorList.filter(errObj => errObj !== action.payload)
            };
        default: return state;
    }
}

/**
 * Action Creators
 */

export function pushError(errorObject) {
    return {
        type: PUSH_ERROR,
        payload: errorObject,
    };
}

export function removeError(errorObject) {
    return {
        type: REMOVE_ERROR,
        payload: errorObject,
    };
}


