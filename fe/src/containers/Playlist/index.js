import { connect } from 'react-redux';
import { useEffect } from 'react';
import Player from '../../components/Player';
import { loadPlaylist } from '../../store/playlist';
import { Link } from 'react-router-dom';
import './playlist.scss';

function Playlist ({
    videos = [],
    showLoading = false,
    error = undefined, 
    onLoadPlaylist = () => console.log('loading video data'),
}) {

    useEffect(() => {
        onLoadPlaylist();
    }, [onLoadPlaylist])

    return (
        <div className="Playlist">
            {videos.map(video => (
                <div key={video.id} className="video">
                    <Player videoURL={video.videoURL} thumbnailURL={video.thumbnailURL}></Player>
                </div>
            ))}

            { showLoading ? <div>loading...</div> : null }

            <div className="video">
                <Link to="/upload">upload new</Link>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        videos: state.playlist.videos,
        showLoading: state.playlist.showLoading,
        error: state.playlist.error,
    }),
    {
        onLoadPlaylist: loadPlaylist,
    }
)(Playlist);