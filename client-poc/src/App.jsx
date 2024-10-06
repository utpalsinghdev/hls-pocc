/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // If native HLS is supported (like Safari), directly set the video source
      video.src = videoUrl;
    } else if (Hls.isSupported()) {
      // If native HLS is not supported, use hls.js as a fallback
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    }
  }, [videoUrl]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};



function App() {

  return (
    <>
      <div className="App">
        <h1>HLS Streaming via REST API</h1>
        <VideoPlayer videoUrl="http://localhost:5000/api/videos/FILM_19_Untaboo_Home.m3u8" />
      </div>
    </>
  )
}

export default App
