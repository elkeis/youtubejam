import {
    useRef,
    useState,
} from 'react';

import './player.scss';

import Hls from 'hls.js';

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
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoURL;
        }

        video.current.play();
    }

    return (
        <div className="Player">
            <div className="video-container">
                <video ref={video} controls style={{
                    backgroundImage: `url(${thumbnailURL})`,
                    backgroundSize: '100%',
                }} onPlay={play} onClick={play}></video>
            </div>
        </div>
    );
}