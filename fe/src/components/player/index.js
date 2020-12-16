import {
    useRef,
    useState,
} from 'react';

import './player.scss';

import Hls from 'hls.js';

/**
 * Video player with integrated HLS support,
 * @param {} param0 
 */
export default function Player ({
    videoURL,
    thumbnailURL,
}) {

    const video = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const play = (e) => {
        if (isLoaded) {
            video.current.play();
            return;
        };

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoURL);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                console.log('MANIFEST PARSED');
                video.current.play();
                setIsLoaded(true);
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoURL;
            setIsLoaded(true);
        }
    }

    return (
        <div className="Player">
            <div className={[
                'play-controls-container', 
                isLoaded ? 'hidden' : ''
            ].join(' ')}>
                <div className="play-button" onClick={play}></div>
            </div>
            <div className="video-container">
                <video 
                    poster={thumbnailURL}
                    controls={isLoaded} 
                    ref={video}
                ></video>
            </div>
        </div>
    );
}