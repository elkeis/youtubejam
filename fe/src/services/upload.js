import axios from 'axios';

const UPLOAD_URL = '/upload';
const PROCESSING_URL = '/processing';

export async function upload(
    file, 
    onProgress = (progress) => progress,
) {
    const formData = new FormData();
    formData.append('video', file);

    const {
        processingId,
        progress,
    } = (await axios.post(UPLOAD_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (p) => onProgress(p.loaded/p.total),
    })).data;
    
    return {
        processingId,
        progress
    }
}

/**
 * fetch processingStatus every n seconds till done; 
 * Call progressCallback with percentage. 
 * Resolves with processing object which is finished.
 * @param {*} processingId 
 * @param {*} progressCallback 
 */
export async function trackProcessing(processingId, progressCallback, timeout = 1000) {
    try {
        let progress = 0;
        let processing;
        while (progress < 1) {
            processing = (
                await axios.get(`${PROCESSING_URL}?processingId=${processingId}`)
            ).data;
    
            if (processing.error) {
                throw new Error(processing.error.message);
            } else {
                progress = processing.progress / 100
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
        console.error(e);
        throw e;
    }
}