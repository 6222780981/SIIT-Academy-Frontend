import './CreateWeek.css';

function CreateWeek(props) {
  const { uploadFileHandler } = props;

  async function submitHandler(e) {
    e.preventDefault();

    const file = e.target[0].files[0];
    const fileName = file.name;

    if (await uploadFileHandler(file, `week1/video/${fileName}`)) {
      console.log('success');
    } else {
      console.log('error');
    }
  }

  return (
    <div className="create-week">
      <form onSubmit={submitHandler}>
        <input type="file"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateWeek;
