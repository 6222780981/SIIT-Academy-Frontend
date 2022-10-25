import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import Navbar from '../../components/navbar/Navbar';
import CreateWeek from './CreateWeek/CreateWeek';
import UploadMaterials from './Upload Materials/UploadMaterials';
import UploadAssignment from './UploadAssignment/UploadAssignment';
import UploadAnnouncement from './UploadAnnouncement/UploadAnnouncement';
import './AddResource.css';

const storage = getStorage();

function AddResource(props) {
  const { courseId } = useParams();

  const [weekArr, setWeekArr] = useState([]);

  useEffect(() => {
    console.log(weekArr);
  }, [weekArr]);

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
      return 0;
    }

    const fileRef = ref(storage, filepath);

    try {
      await uploadBytes(fileRef, file);
      return 1;
    } catch {
      return 0;
    }
  }

  return (
    <div className="add-resource">
      <Navbar></Navbar>
      <p className="add-resource__title">Add Resources</p>
      <div className="add-resource__container">
        <CreateWeek uploadFileHandler={uploadFileHandler} setWeekArr={setWeekArr} courseId={courseId}></CreateWeek>
        <UploadMaterials uploadFileHandler={uploadFileHandler} weekArr={weekArr} courseId={courseId}></UploadMaterials>
        <UploadAssignment uploadFileHandler={uploadFileHandler} weekArr={weekArr} courseId={courseId}></UploadAssignment>
        <UploadAnnouncement uploadFileHandler={uploadFileHandler} weekArr={weekArr} courseId={courseId}></UploadAnnouncement>
      </div>
    </div>
  );
}

export default AddResource;
