import { connect } from 'react-redux';
import Uploader from '../../components/uploader';
import Player from '../../components/player';
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
        <div className="player-container">
            <Player
                videoURL={uploadingResult.videoURL}
                thumbnailURL={uploadingResult.thumbnailURL}
            />
        </div> : null 
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

    const uploadMore = ( uploadingResult ?
        <button onClick={onClear}>upload more</button> : null
    )

    return (
        <div className="Upload">
            <Link to="/" onClick={onClear}>back</Link>
            <div className="controls">
                {player}
                {uploader}
                {uploadMore}
            </div>
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