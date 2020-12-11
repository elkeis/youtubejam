import { connect } from 'react-redux';
import { useEffect } from 'react';
import Player from '../../components/Player';
import { loadPlaylist } from '../../store/playlist';
import { Link } from 'react-router-dom';
import './playlist.scss';

function Playlist ({
    videos = [],
    onLoadPlaylist = () => console.log('loading video data'),
    onUploadNew = () => console.log('upload new button clicked'),
}) {

    useEffect(() => {
        onLoadPlaylist();
    }, [onLoadPlaylist])

    return (
        <div className="Playlist">
            {videos.map(v => (
                <div key={v.id} className="video">
                    <Player videoURL={v.videoURL} thumbnailURL={v.thumbnailURL}></Player>
                </div>
            ))}

            <div className="video">
                <Link to="/upload">upload new</Link>
                {/* <button onClick={onUploadNew}> upload new </button>   */}
            </div>
        </div>
    )
}

export default connect(
    state => ({
        videos: state.playlist.videos,
    }),
    {
        onLoadPlaylist: loadPlaylist,
    }
)(Playlist);