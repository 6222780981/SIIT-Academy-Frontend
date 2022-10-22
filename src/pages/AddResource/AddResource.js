import { useParams } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import CreateWeek from './CreateWeek/CreateWeek';
import UploadMaterials from './Upload Materials/UploadMaterials';
import UploadAssignment from './UploadAssignment/UploadAssignment';
import UploadAnnouncement from './UploadAnnouncement/UploadAnnouncement';
import './AddResource.css';

function AddResource() {
  const { courseId } = useParams();

  return (
    <div className="add-resource">
      <Navbar></Navbar>
      <p className="add-resource__title">Add Resources</p>
      <div className="add-resource__container">
        <CreateWeek></CreateWeek>
        <UploadMaterials></UploadMaterials>
        <UploadAssignment></UploadAssignment>
        <UploadAnnouncement></UploadAnnouncement>
      </div>
    </div>
  );
}

export default AddResource;
