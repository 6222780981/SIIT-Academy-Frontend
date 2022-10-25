import deleteIcon from '../../icons/delete icon.svg';

import './WeekCard.css';

function WeekCard(props) {
  const { order, title, videoFilePath, changeHandler, deleteHandler } = props;

  function titleChangeHandler(e) {
    changeHandler(order, 'title', e.target.value);
  }

  function fileChangeHandler(e) {
    changeHandler(order, 'file', e.target.files[0]);
  }

  return (
    <div className="week-card">
      <p className="week-card__order">Week {order + 1}</p>
      <p className="week-card__title-label">Title</p>
      {title ? (
        <p className="week-card__title">{title}</p>
      ) : (
        <input type="text" className="week-card__title-input" onChange={titleChangeHandler}></input>
      )}
      {videoFilePath ? (
        <p className="week-card__file-path">{videoFilePath.split('/')[videoFilePath.split('/').length - 1]}</p>
      ) : (
        <div className="week-card__video-input">
          <label htmlFor="upload-vdo" className="week-card__video-input--label">
            Upload Video
          </label>
          <input
            type="file"
            id="upload-vdo"
            className="week-card__video-input--file-input"
            onChange={fileChangeHandler}
            accept="video/mp4,video/x-m4v,video/*"
          ></input>
        </div>
      )}
      <img src={deleteIcon} alt="" className="week-card__delete-btn" onClick={deleteHandler.bind(order)}></img>
    </div>
  );
}

export default WeekCard;
