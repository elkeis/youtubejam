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
                setIsLoaded(true);
                video.current.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoURL;
        }
    }

    return (
        <div className="Player">
            <div className="video-container" style={{
                background: isLoaded ? 'black' : `url(${thumbnailURL})`,
                backgroundSize: '100%',
            }}>
                <video controls={isLoaded} ref={video} onPlay={play} onClick={play}></video>
            </div>
        </div>
    );
}