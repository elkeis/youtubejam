import { connect } from 'react-redux';
import Uploader from '../../components/Uploader';
import './upload.scss';
import {
    uploadFile,
} from '../../store/upload';

function Upload({
    progress = 0,
    isUploading = false,
    onUploadFile = () => null,
}) {
    return (
        <div className="Upload">
            <div>upload page</div>
            
            <Uploader 
                onUploadStart={onUploadFile}
                progress={progress} 
                isUploading={isUploading}
            />

            <div>progress: {progress}</div>
        </div>
    )
}

export default connect(
    state => ({
        progress: state.upload.progress,
        isUploading: state.upload.isUploading,
    }),
    {
        onUploadFile: uploadFile,
    }
)(Upload)