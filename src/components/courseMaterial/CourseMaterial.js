import axios from 'axios';
function CourseMaterial(props) {
  const { weekId, getFileUrlHandler } = props;
  console.log(`${process.env.REACT_APP_BACKEND_URL}/week/material?weekId=${weekId}`)

  axios.get(`${process.env.REACT_APP_BACKEND_URL}/week/material?weekId=${weekId}`)
  .then((response) => {
    console.log(response.data);
    const { status, data, message } = response.data;
    if (status !== 'success') {
      // setMsg(message);
      return;
    }
    // setMsg(`Successfully added assignment(s) to ${courseId}`);
  });

  return (
    <>{weekId}</>
  
  );
}

export default CourseMaterial;
