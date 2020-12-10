import {
    useRef,
    useEffect,
} from 'react';

import Hls from 'hls.js';

export function Player ({
    videoURL,
    thumbnailURL,
}) {

    const video = useRef(null);

    useEffect(() => {
        
    }, [videoURL]);

    const play = () => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoURL);
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                console.log('MANIFEST PARSED');
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoURL;
        }
        video.current.play();
    }

    const pause = () => {
        video.current.pause();
    }
    
    return (
        <div className="Player">
            <div>
                <video ref={video} style={{}} controls style={{
                    backgroundImage: `url(${thumbnailURL})`,
                    backgroundSize: '100%',
                    height: '360px',
                    width: '640px',
                }}></video>
            </div>
            <button onClick={play}>play</button>
            <button onClick={pause}>pause</button>
        </div>
    );
}