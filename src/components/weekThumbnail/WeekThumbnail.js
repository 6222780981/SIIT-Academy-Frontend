import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { weekActions } from '../../store/weekSlice';

import './WeekThumbnail.css';

function WeekThumbnail(props) {
  const { week, order, getFileUrlHandler } = props;
  const { week_id: weekId, video_file_path: videoFilePath } = week;

  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);
  const currentWeekId = useSelector((store) => store.week.currentWeekId);

  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [progress, setProgress] = useState();

  const videoRef = useRef();

  useEffect(async () => {
    if (videoFilePath) {
      setThumbnailUrl(await getFileUrlHandler(videoFilePath));
    }
  }, [videoFilePath]);

  useEffect(async () => {
    if (!userId || !weekId || !thumbnailUrl || !currentWeekId) {
      return;
    }

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/video-progress?userId=${userId}&weekId=${weekId}`);
    const { status, data } = response.data;

    if (status === 'success') {
      const { progress_second: progressSecond } = data;
      setProgress((progressSecond / videoRef.current.duration) * 100);
    }
  }, [userId, weekId, thumbnailUrl, currentWeekId]);

  function clickHandler() {
    dispatch(weekActions.setCurrentWeekId(weekId));
  }

  return (
    <div className="week-thumbnail">
      <video src={thumbnailUrl} preload="metadata" onClick={clickHandler} ref={videoRef}></video>
      <p>Week {order + 1}</p>
      {progress > 0 && (
        <div className="week-thumbnail__progress-container">
          <div className="week-thumbnail__progress">
            <div className="week-thumbnail__progress--background"></div>
            <div className="week-thumbnail__progress--current" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeekThumbnail;
