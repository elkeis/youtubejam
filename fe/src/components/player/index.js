import {
    useHLSVideoPlayer
} from './hooks';

import './player.scss';

/**
 * Video player with integrated HLS support,
 */
export default function Player ({
    videoURL,
    thumbnailURL,
}) {
    const [videoRef, isLoaded, playHandler] = useHLSVideoPlayer(videoURL);

    return (
        <div className="Player">
            <div className={[
                'play-controls-container', 
                isLoaded ? 'hidden' : ''
            ].join(' ')}>
                <div className="play-button" onClick={playHandler}></div>
            </div>
            <div className="video-container">
                <video 
                    poster={thumbnailURL}
                    controls={isLoaded} 
                    ref={videoRef}
                ></video>
            </div>
        </div>
    );
}