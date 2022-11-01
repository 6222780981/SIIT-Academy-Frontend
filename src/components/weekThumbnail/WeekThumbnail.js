import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { weekActions } from '../../store/weekSlice';

import './WeekThumbnail.css';

function WeekThumbnail(props) {
  const { week, order, getFileUrlHandler } = props;
  const { week_id: weekId, video_file_path: videoFilePath } = week;

  const dispatch = useDispatch();

  const [thumbnailUrl, setThumbnailUrl] = useState();

  useEffect(async () => {
    if (videoFilePath) {
      setThumbnailUrl(await getFileUrlHandler(videoFilePath));
    }
  }, [videoFilePath]);

  function clickHandler() {
    console.log(weekId);
    dispatch(weekActions.setCurrentWeekId(weekId));
  }

  return (
    <div className="week-thumbnail">
      <video src={thumbnailUrl} muted autoPlay={false} onClick={clickHandler}></video>
      <p>Week {order + 1}</p>
    </div>
  );
}

export default WeekThumbnail;
