import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { weekActions } from '../../store/weekSlice';

import WeekThumbnail from '../weekThumbnail/WeekThumbnail';
import './CourseSideBar.css';

function CourseSideBar(props) {
  const { courseId, getFileUrlHandler } = props;

  const dispatch = useDispatch();
  const weekArr = useSelector((store) => store.week.weekArr);

  useEffect(() => {
    dispatch(weekActions.resetStates());

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/week?course_id=${courseId}`)
      .then((response) => {
        const { status, data } = response.data;

        if (status === 'success') {
          const weekArr = data.weekArr;
          dispatch(weekActions.setWeekArr(weekArr));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch, courseId]);

  return (
    <div className="course-sidebar">
      <p className="course-sidebar__title">{weekArr.length > 0 ? 'Week' : 'No Week Found'}</p>
      {weekArr.map((week, i) => (
        <div key={i}>
          <WeekThumbnail week={week} order={i} getFileUrlHandler={getFileUrlHandler}></WeekThumbnail>
        </div>
      ))}
    </div>
  );
}

export default CourseSideBar;
