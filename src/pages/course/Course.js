import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import Navbar from '../../components/navbar/Navbar';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';
import CourseSideBar from '../../components/courseSideBar/CourseSideBar';
import './Course.css';

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

  return (
    <div className="course">
      <Navbar></Navbar>
      <div className="course__body">
        <div className="course__content">
          <VideoPlayer currentWeekId={currentWeekId} weekArr={weekArr} getFileUrlHandler={getFileUrlHandler}></VideoPlayer>
        </div>
        <CourseSideBar courseId={courseId} getFileUrlHandler={getFileUrlHandler}></CourseSideBar>
      </div>
    </div>
  );
}

export default Course;
