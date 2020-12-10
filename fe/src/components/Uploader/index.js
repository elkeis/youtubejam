import './uploader.scss';
import { useRef } from 'react';

export default function Uploader({
    onUploadStart = file => console.log(`uploading file: ${file}`),
    progress = 0,
    isFileUploaded = false,
}) {

    const fileInputRef = useRef(null);

    const uploadFileHandler = e => {
        e.preventDefault();
        const file = fileInputRef.current.files[0];
        onUploadStart(file);
    }

    const chooseFileHandler = e => {
        e.preventDefault();
        fileInputRef.current.click();
    }

    return (
        <div className="Uploader stack">
            <input type="file" name="video" ref={fileInputRef} multiple="multiple"></input>

            <button onClick={chooseFileHandler}>Choose File</button>
            <button onClick={uploadFileHandler}>Upload</button>

            <progress value={progress} max={1}></progress>
        </div>
    )
}