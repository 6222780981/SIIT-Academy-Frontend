import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './VideoPlayer.css';

function VideoPlayer(props) {
  const { currentWeekId, weekArr, getFileUrlHandler, courseId, courseName } = props;

  const userId = useSelector((store) => store.user.userId);

  const [videoUrl, setVideoUrl] = useState();
  const [doneInitial, setDoneInitial] = useState(false);

  const videoRef = useRef();

  useEffect(async () => {
    if (weekArr && weekArr.length && currentWeekId) {
      setVideoUrl(await getFileUrlHandler(weekArr.find((week) => week.week_id === currentWeekId).video_file_path));
    }
  }, [weekArr, currentWeekId]);

  useEffect(() => {
    if (videoUrl) {
      setDoneInitial(true);
    }
  }, [videoUrl]);

  useEffect(async () => {
    if (!userId || !currentWeekId || !videoUrl) {
      return;
    }

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/video-progress?userId=${userId}&weekId=${currentWeekId}`);
    const { status, data } = response.data;

    if (status === 'success') {
      const { progress_second: progressSecond } = data;
      videoRef.current.currentTime = progressSecond;
    }
  }, [userId, currentWeekId, videoUrl]);

  let timeout;

  function progressChangeHandler(e) {
    const currentTime = Math.round(e.target.currentTime);

    if (!doneInitial) {
      return;
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/week/video-progress`, { userId, weekId: currentWeekId, videoProgress: currentTime })
        .catch((err) => console.log(err.message));
    }, 500);
  }

  return (
    <div className="video-player">
      <p className="video-player__title">
        <span>{courseId}</span> {courseName}
      </p>
      <video
        src={currentWeekId && videoUrl}
        controls
        onProgress={progressChangeHandler}
        onPause={progressChangeHandler}
        ref={videoRef}
      ></video>
      {(!videoUrl || !currentWeekId) && <p className="video-player__overlay">The video hasn’t been uploaded</p>}
    </div>
  );
}

export default VideoPlayer;
