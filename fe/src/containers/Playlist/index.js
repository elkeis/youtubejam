import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Player } from '../../components/Player';
import { loadPlaylist } from '../../store/playlist';
import './playlist.scss';

function Playlist ({
    videos = [],
    onLoadPlaylist = () => console.log('loading video data')
}) {

    useEffect(() => {
        onLoadPlaylist();
    }, [onLoadPlaylist])

    return (
        <div className="Playlist">
            playlist
            {videos.map(v => (
                <div key={v.id}>
                    {JSON.stringify(v)}
                    <Player videoURL={v.videoURL}></Player>
                </div>
            ))}
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