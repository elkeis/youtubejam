import { useState } from 'react';
import './uploader.scss';

export default function Uploader({
    onUploadStart = file => console.log(`uploading file: ${file}`),
    uploadingProgress = 0,
    processingProgress = 0,
    disabled = false,
}) {

    const [file, setFile] = useState(null);

    function onChangeInput(e) {
        setFile(e.target.files[0]);
    }

    function uploadFileHandler(e) {
        onUploadStart(file);
    }

    return (
        <div className="Uploader">
            <div className="file-chooser">
                <div className="controls">
                    <label
                        data-testid="choose-file-link" 
                        className="file-input-label" 
                        htmlFor="file-input">
                        { file ? file.name : 'choose file' }
                    </label>
                    <input 
                        data-testid="file-input"
                        id="file-input" 
                        type="file" 
                        name="video" 
                        accept="video/mp4, video/mpeg" 
                        disabled={disabled}
                        onChange={onChangeInput}>
                    </input>
                    <button 
                        data-testid="upload-button"
                        onClick={uploadFileHandler} 
                        disabled={disabled ? disabled : !file}>
                        Upload
                    </button>
                </div>
            </div>

            <div className="progress">
                <div>uploading</div>
                <progress value={uploadingProgress} max={1}></progress>
            </div>

            <div className="progress">
                <div>processing</div>
                <progress value={processingProgress} max={1}></progress>
            </div>
        </div>
    )
}