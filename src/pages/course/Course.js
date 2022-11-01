import { useParams } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import Navbar from '../../components/navbar/Navbar';
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

  return (
    <div className="course">
      <Navbar></Navbar>
      <CourseSideBar courseId={courseId} getFileUrlHandler={getFileUrlHandler}></CourseSideBar>
    </div>
  );
}

export default Course;
