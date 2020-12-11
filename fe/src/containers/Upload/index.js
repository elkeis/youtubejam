import { connect } from 'react-redux';
import Uploader from '../../components/Uploader';
import './upload.scss';
import {
    uploadFile,
} from '../../store/upload';
import { Link } from 'react-router-dom';

function Upload({
    progress = 0,
    isUploading = false,
    onUploadFile = () => null,
}) {
    return (
        <div className="Upload">
            <Uploader 
                onUploadStart={onUploadFile}
                uploadingProgress={progress} 
                processingProgress={0}
                isUploading={isUploading}
            />

            <Link to="/">back</Link>
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