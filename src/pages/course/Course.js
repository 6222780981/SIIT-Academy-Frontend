import { useParams } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import './Course.css';

function Course() {
  const { courseId } = useParams();

  return (
    <div className="course">
      <Navbar></Navbar>
    </div>
  );
}

export default Course;
