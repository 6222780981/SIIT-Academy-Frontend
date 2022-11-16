import { useState, useEffect } from 'react';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import axios from 'axios';

import plusIcon from '../../../icons/plus icon.svg';

import WeekCard from '../../../components/weekCard/WeekCard';
import './CreateWeek.css';

const storage = getStorage();

function CreateWeek(props) {
  const { uploadFileHandler, setWeekArr, courseId } = props;

  const [localWeekArr, setLocalWeekArr] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/week?course_id=${courseId}`)
        .then((response) => {
          const { status, data } = response.data;

          if (status === 'success') {
            setWeekArr(data.weekArr);
            setLocalWeekArr(data.weekArr);
          } else if (status === 'fail') {
            setWeekArr([]);
            setLocalWeekArr([]);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [count]);

  async function submitHandler(e) {
    e.preventDefault();

    const filteredLocalWeekArr = localWeekArr
      .filter((week) => week.week_title || week.title)
      .map((week) => {
        return { ...week, week_title: week.week_title || week.title };
      });
    setLocalWeekArr(filteredLocalWeekArr);
    async function modifyWeekHandler(week, i) {
      if (week.isNew) {
        if (week.file && !(await uploadFileHandler(week.file, `${courseId}/week${i + 1}/video/${week.file.name}`))) {
          console.log(`error uploading file: ${`${courseId}/week${i + 1}/video/${week.file.name}`}`);
          return;
        }
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/week`, {
            courseId,
            weekTitle: week.week_title.replaceAll("'", '\'\''),
            weekDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            videoFilePath: week.file ? `${courseId}/week${i + 1}/video/${week.file.name}` : '',
          });

          const { status, message } = response.data;

          if (status === 'success') {
            if (week.file) {
              setLocalWeekArr((localWeekArr) => {
                const localWeekArrCopy = structuredClone(localWeekArr);
                localWeekArrCopy[i].video_file_path = week.file.name;
                return localWeekArrCopy;
              });
            }
          } else {
            console.log(message);
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        if (week.file) {
          if (!(await uploadFileHandler(week.file, `${courseId}/week${i + 1}/video/${week.file.name}`))) {
            console.log(`error uploading file: ${`${courseId}/week${i + 1}/video/${week.file.name}`}`);
            return;
          }

          try {
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/week`, {
              weekId: week.week_id,
              videoFilePath: `${courseId}/week${i + 1}/video/${week.file.name}`,
            });

            const { status, message } = response.data;
            if (status === 'success') {
              setLocalWeekArr((localWeekArr) => {
                const localWeekArrCopy = structuredClone(localWeekArr);
                localWeekArrCopy[i].video_file_path = week.file.name;
                return localWeekArrCopy;
              });
            } else {
              console.log(message);
            }
          } catch (err) {
            console.log(err.message);
          }
        }
      }

      setCount((prev) => prev - 1);
    }

    setCount(filteredLocalWeekArr.length);

    for (let i = 0; i < filteredLocalWeekArr.length; i++) {
      const week = filteredLocalWeekArr[i];
      await modifyWeekHandler(week, i);
    }
  }

  async function deleteHandler() {
    if (count !== 0) {
      return;
    }

    const week = localWeekArr[this];

    if (week.week_id) {
      setCount(1);

      try {
        if (week.video_file_path) {
          const fileRef = ref(storage, week.video_file_path);
          await deleteObject(fileRef);
        }
      } catch (err) {
        console.log(err.message);
        setCount(0);
        return;
      }

      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/week`, { data: { courseId, weekId: week.week_id } })
        .then((response) => {
          const { status, message } = response.data;
          if (status !== 'success') {
            console.log(message);

            return;
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setCount(0));
    } else {
      setLocalWeekArr((localWeekArr) => {
        const localWeekArrCopy = structuredClone(localWeekArr);
        localWeekArrCopy.splice(this, 1);
        return localWeekArrCopy;
      });
    }
  }

  function addWeekClickHandler() {
    setLocalWeekArr((prev) => [...prev, { isNew: true }]);
  }

  function changeHandler(order, key, value) {
    setLocalWeekArr((localWeekArr) => {
      const localWeekArrCopy = structuredClone(localWeekArr);
      localWeekArrCopy[order][key] = value;
      return localWeekArrCopy;
    });
  }

  return (
    <div className="create-week">
      <p className="create-week__title">Create Week</p>
      <form onSubmit={submitHandler}>
        {localWeekArr.length > 0 && (
          <div className="create-week__card-container">
            {localWeekArr.map((week, i) => (
              <div key={i}>
                <WeekCard
                  order={i}
                  title={week.week_title}
                  videoFilePath={week.video_file_path}
                  changeHandler={changeHandler}
                  deleteHandler={deleteHandler}
                ></WeekCard>
              </div>
            ))}
          </div>
        )}
        <div className="create-week__btn-container">
          <button type="button" disabled={count !== 0} className="create-week__btn-container--add-week" onClick={addWeekClickHandler}>
            <img src={plusIcon} alt=""></img>
            <p>Add Week</p>
          </button>
          <button type="submit" disabled={count !== 0} className="create-week__btn-container--confirm">
            {count === 0 ? 'Confirm' : 'Loading...'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateWeek;
