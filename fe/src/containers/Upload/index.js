import { connect } from 'react-redux';
import Uploader from '../../components/Uploader';
import Player from '../../components/Player';
import './upload.scss';
import {
    uploadFile,
    clearData,
} from '../../store/upload';
import { Link } from 'react-router-dom';

function Upload({
    uploadingProgress = 0,
    processingProgress = 0,
    uploadingResult = undefined,
    onUploadFile = () => null,
    onClear = () => null,
}) {

    const player = ( uploadingResult ? 
        <Player
            videoURL={uploadingResult.videoURL}
            thumbnailURL={uploadingResult.thumbnailURL}
        /> : null
    );

    const uploader = ( uploadingResult ? 
        null :
        <Uploader 
            onUploadStart={onUploadFile}
            uploadingProgress={uploadingProgress} 
            processingProgress={processingProgress}
            disabled={uploadingProgress || processingProgress}
        />
    );

    return (
        <div className="Upload">
            {player}
            {uploader}
            <Link to="/" onClick={onClear}>back</Link>
        </div>
    )
}

export default connect(
    state => ({
        uploadingProgress: state.upload.uploadingProgress,
        processingProgress: state.upload.processingProgress,
        isUploading: state.upload.isUploading,
        uploadingResult: state.upload.uploadingResult,
    }),
    {
        onUploadFile: uploadFile,
        onClear: clearData,
    }
)(Upload)