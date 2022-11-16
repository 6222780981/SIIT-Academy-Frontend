import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/navbar/Navbar';
import './StudentWork.css';

function StudentWork(props) {
  const { assignmentId } = useParams();
  const history = useHistory();

  const [submissionArr, setSubmissionArr] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/assignment/all-submission?assignmentId=${assignmentId}`);

    const { status, data } = response.data;

    if (status === 'success') {
      setSubmissionArr(data.submissionArr);
    }
  }, [assignmentId]);

  function backClickHandler() {
    history.goBack();
  }

  return (
    <div className="student-work">
      <Navbar></Navbar>
      <p className="student-work__title">Student Work</p>
      <div className="student-work__submission-container">
        <p className="student-work__submission-container--title">
          {submissionArr.length > 0 ? 'Submitted Work List' : 'No Submitted Work'}
        </p>
        {submissionArr.map((submission, i) => (
          <div key={i} className="student-work__submission-container--submission">
            <p>
              {submission.email.split('@')[0]} {submission.username}
            </p>
            <a href={`${process.env.REACT_APP_CLOUD_STORAGE_URL}/${submission.file_path}`} target="_blank" rel="noopener">
              {submission.file_path.split('/')[4]}
            </a>
          </div>
        ))}
        <button className="student-work__submission-container--back" onClick={backClickHandler}>
          Back to course page
        </button>
      </div>
    </div>
  );
}

export default StudentWork;
