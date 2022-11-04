import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import axios from 'axios';

import Navbar from '../../components/navbar/Navbar';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';
import CourseSideBar from '../../components/courseSideBar/CourseSideBar';
import CourseMaterial from '../../components/courseMaterial/CourseMaterial';
import CourseAssignment from '../../components/courseAssignment/CourseAssignment';
import CourseAnnouncement from '../../components/courseAnnouncement/CourseAnnouncement';
import './Course.css';

import eyeIcon from '../../icons/eye icon.svg';
import calenderIcon from '../../icons/calendar icon.svg';
import bookIcon from '../../icons/book icon.svg';
import assignmentIcon from '../../icons/assignment icon.svg';
import speakerIcon from '../../icons/speaker icon.svg';

const storage = getStorage();

async function getFileUrlHandler(filePath) {
  const fileRef = ref(storage, filePath);

  try {
    return await getDownloadURL(fileRef);
  } catch {
    return 0;
  }
}

function Course() {
  const { courseId } = useParams();

  const weekArr = useSelector((store) => store.week.weekArr);
  const currentWeekId = useSelector((store) => store.week.currentWeekId);

  const [teacherUsername, setTeacherUsername] = useState();
  const [courseName, setCourseName] = useState();

  useEffect(async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course?courseId=${courseId}`);

    const { status, data } = response.data;

    if (status === 'success') {
      const { course_name: courseName, username: teacherUsername } = data.courseArr[0];

      setCourseName(courseName);
      setTeacherUsername(teacherUsername);
    }
  }, [courseId]);

  const weekIndex = weekArr.findIndex((week) => week.week_id === currentWeekId);
  const { week_title: weekTitle, material_id_arr: materialIdArr, week_date: weekDate } = weekArr[weekIndex] || [];

  async function uploadFileHandler(file, filepath) {
    /*
    filepath example
    video: DES424/week1/video/videoName.mp4
    material: DES424/week1/material/materialName.pdf
    assignment: DES424/week1/assignment/assignmentName.pdf
    announcement: DES424/announcement/announcementName.pdf
    */

    if (!file.name && typeof filepath !== 'string') {
      return 0;
    }

    if (!file.name.endsWith('.mp4') && !file.name.endsWith('.pdf')) {
      return 0;
    }

    if (!filepath.startsWith(`${courseId}/week`) && !filepath.startsWith(`${courseId}/announcement`)) {
      console.log('here1');
      return 0;
    }

    const fileRef = ref(storage, filepath);

    try {
      await uploadBytes(fileRef, file);
      return 1;
    } catch (err) {
      console.log(err.message);
      return 0;
    }
  }

  return (
    <div className="course">
      <Navbar></Navbar>
      <div className="course__body">
        <div className="course__content">
          <VideoPlayer
            currentWeekId={currentWeekId}
            weekArr={weekArr}
            courseId={courseId}
            courseName={courseName}
            getFileUrlHandler={getFileUrlHandler}
          ></VideoPlayer>
          <div className="course__content--title">
            <p>
              Week {weekIndex + 1} - {weekTitle}
            </p>
            <div className="week-info">
              <img src={eyeIcon} alt=""></img>
              <p style={{ marginRight: '5px' }}>{materialIdArr ? `${materialIdArr.length} Materials` : ''}</p>
              <img src={calenderIcon} alt=""></img>
              <p>{new Date(weekDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="course__content--teacher">
            <p>{teacherUsername}</p>
            <p className="role">Teacher</p>
          </div>
          <div className="course__content--link-container">
            <NavLink to={`/course/${courseId}/material`} activeClassName="active">
              <img src={bookIcon} alt=""></img> <p>Materials</p>
            </NavLink>
            <NavLink to={`/course/${courseId}/assignment`} activeClassName="active">
              <img src={assignmentIcon} alt=""></img> <p>Assignment</p>
            </NavLink>
            <NavLink to={`/course/${courseId}/announcement`} activeClassName="active">
              <img src={speakerIcon} alt=""></img> <p>Announcement</p>
            </NavLink>
          </div>
          <Switch>
            <Route exact path="/course/:courseId/material">
              <CourseMaterial weekId={currentWeekId} getFileUrlHandler={getFileUrlHandler}></CourseMaterial>
            </Route>
            <Route exact path="/course/:courseId/assignment">
              <CourseAssignment
                weekId={currentWeekId}
                courseId={courseId}
                weekIndex={weekIndex}
                getFileUrlHandler={getFileUrlHandler}
                uploadFileHandler={uploadFileHandler}
              ></CourseAssignment>
            </Route>
            <Route exact path="/course/:courseId/announcement">
              <CourseAnnouncement weekId={currentWeekId} courseId={courseId} getFileUrlHandler={getFileUrlHandler}></CourseAnnouncement>
            </Route>
            <Route path="/course/:courseId/">
              <Redirect to={`/course/${courseId}/material`}></Redirect>
            </Route>
          </Switch>
        </div>
        <CourseSideBar courseId={courseId} getFileUrlHandler={getFileUrlHandler}></CourseSideBar>
      </div>
    </div>
  );
}

export default Course;
