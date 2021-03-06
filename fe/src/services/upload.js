import axios from 'axios';

import {
    UPLOAD_URL,
    PROCESSING_URL
} from './constants';

const TRACKER_TIMEOUT = 1000;
const PROGRESS_DONE = 100;

/**
 * Upload file using FormData via multipart/form-data POST request.
 * Track progress via onProgress callback
 * @param {*} file 
 * @param {*} onProgress 
 */
export async function upload(
    file, 
    onProgress = (progress) => progress,
) {
    const formData = new FormData();
    formData.append('test', 'aaa');
    formData.append('video', file);

    const {
        id,
        progress,
    } = (await axios.post(UPLOAD_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (p) => onProgress(p.loaded/p.total),
    })).data;
    
    return {
        id,
        progress
    }
}

/**
 * Fetches processingStatus every n seconds till done; 
 * Call progress callback after every fetch.
 * Return promise which is resolved with finished processing object.
 * @param {*} processingId 
 * @param {*} progressCallback 
 */
export async function trackProcessing(processingId, progressCallback, timeout = TRACKER_TIMEOUT) {
    try {
        let progress = 0;
        let processing;
        while (progress < 1) {
            processing = (
                await axios.get(`${PROCESSING_URL}/${processingId}`)
            ).data;
    
            if (processing.error) {
                throw new Error(processing.error.message);
            } else {
                progress = processing.progress / PROGRESS_DONE
                progressCallback(progress);
    
                if (progress < 1) {
                    await new Promise(resolve => setTimeout(resolve, timeout));
                } 
            }
        }
        return {
            ...processing,
            progress,
        };
    } catch (e) {
        throw e;
    }
}