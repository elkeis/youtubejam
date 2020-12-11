import { connect } from 'react-redux';
import Uploader from '../../components/Uploader';
import './upload.scss';
import {
    uploadFile,
} from '../../store/upload';
import { Link } from 'react-router-dom';

function Upload({
    uploadingProgress = 0,
    processingProgress = 0,
    onUploadFile = () => null,
}) {
    return (
        <div className="Upload">
            <Uploader 
                onUploadStart={onUploadFile}
                uploadingProgress={uploadingProgress} 
                processingProgress={processingProgress}
            />

            <Link to="/">back</Link>
        </div>
    )
}

export default connect(
    state => ({
        uploadingProgress: state.upload.uploadingProgress,
        processingProgress: state.upload.processingProgress,
        isUploading: state.upload.isUploading,
    }),
    {
        onUploadFile: uploadFile,
    }
)(Upload)