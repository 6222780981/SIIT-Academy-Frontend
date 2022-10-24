import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import Navbar from '../../components/navbar/Navbar';
import CreateWeek from './CreateWeek/CreateWeek';
import UploadMaterials from './Upload Materials/UploadMaterials';
import UploadAssignment from './UploadAssignment/UploadAssignment';
import UploadAnnouncement from './UploadAnnouncement/UploadAnnouncement';
import './AddResource.css';

function AddResource(props) {
  const { courseId } = useParams();

  async function uploadFileHandler(file, filepath) {
    /*
    filepath example
    video: week1/video/videoName.mp4
    material: week1/material/materialName.pdf
    assignment: week1/assignment/assignmentName.pdf
    announcement: announcement/announcementName.pdf
    */

    const storage = getStorage();
    const fileRef = ref(storage, `${courseId}/${filepath}`);

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
        <CreateWeek uploadFileHandler={uploadFileHandler}></CreateWeek>
        <UploadMaterials uploadFileHandler={uploadFileHandler}></UploadMaterials>
        <UploadAssignment uploadFileHandler={uploadFileHandler}></UploadAssignment>
        <UploadAnnouncement uploadFileHandler={uploadFileHandler}></UploadAnnouncement>
      </div>
    </div>
  );
}

export default AddResource;
