import { 
    useState,
    useRef,
} from 'react';

import Hls from 'hls.js';

export function useHLSVideoPlayer(videoURL) {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const playHandler = (e) => {
        if (isLoaded) {
            videoRef.current.play();
            return;
        };

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoURL);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                videoRef.current.play();
                setIsLoaded(true);
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = videoURL;
            videoRef.current.play();
            setIsLoaded(true);
        }
    }

    return [videoRef, isLoaded, playHandler];
}