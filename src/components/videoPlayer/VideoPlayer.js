import { useState, useEffect } from 'react';

import './VideoPlayer.css';

function VideoPlayer(props) {
  const { currentWeekId, weekArr, getFileUrlHandler } = props;

  const [videoUrl, setVideoUrl] = useState();

  useEffect(async () => {
    if (weekArr && weekArr.length && currentWeekId) {
      setVideoUrl(await getFileUrlHandler(weekArr.find((week) => week.week_id === currentWeekId).video_file_path));
    }
  }, [weekArr, currentWeekId]);

  return <video src={videoUrl} controls className="video-player"></video>;
}

export default VideoPlayer;
