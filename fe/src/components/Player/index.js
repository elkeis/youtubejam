import {
    useRef,
    useEffect,
} from 'react';

import Hls from 'hls.js';

export function Player ({
    videoURL,
}) {

    const video = useRef(null);

    useEffect(() => {
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
    }, [videoURL]);

    const play = () => {
        video.current.play();
    }

    const pause = () => {
        video.current.pause();
    }
    
    return (
        <div className="Player" style={{}}>
            <div>
                <video ref={video} style={{}} controls></video>
            </div>
            <button onClick={play}>play</button>
            <button onClick={pause}>pause</button>
        </div>
    );
}