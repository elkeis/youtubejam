import './uploader.scss';
import { useRef, useState } from 'react';

export default function Uploader({
    onUploadStart = file => console.log(`uploading file: ${file}`),
    uploadingProgress = 0,
    processingProgress = 0,
    disabled = false,
}) {

    const fileInputRef = useRef(null);

    const [file, setFile] = useState(getFile());

    function getFile() {
        return fileInputRef?.current?.files[0]; 
    }

    function uploadFileHandler(e) {
        e.preventDefault();
        const file = fileInputRef.current.files[0];
        onUploadStart(file);
    }

    function chooseFileHandler(e) {
        e.preventDefault();
        fileInputRef.current.click();
    }

    return (
        <div className="Uploader">
            <div className="file-chooser">
                <div className="file-name">file: {file?.name}</div>
                <div className="controls">
                    <input type="file" name="video" ref={fileInputRef} multiple="multiple" onChange={() => setFile(getFile())}></input>
                    <button onClick={chooseFileHandler} disabled={disabled}>Choose File</button>
                    <button onClick={uploadFileHandler} disabled={!file}>Upload</button>
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