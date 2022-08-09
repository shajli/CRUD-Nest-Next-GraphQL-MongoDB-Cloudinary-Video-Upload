import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

import classes from './edit-video.module.css';

const EDIT_VIDEO = gql`
  mutation UpdateVideo($updateVideoInput: UpdateVideoInput!) {
    updateVideo(updateVideoInput: $updateVideoInput) {
      title
      category
      tags
    }
  }
`;

const EditVideo = (props) => {
  const { video } = props;
  const initialVideoData = {
    title: video.title,
    category: video.category,
    tags: video.tags.join(' '),
  };

  const [videoData, setVideoData] = useState(initialVideoData);
  const [notification, setNotification] = useState();
  const [editVideo] = useMutation(EDIT_VIDEO);

  const editVideoFormHandler = (event) => {
    event.preventDefault();
    editVideo({
      variables: {
        updateVideoInput: {
          id: video._id,
          ...videoData,
        },
      },
    });
    setNotification(
      'Video Information Updated, see MongoDB videos Collection for updated data for reload the index/home page'
    );
  };

  return (
    <div>
      <form onSubmit={editVideoFormHandler}>
        <div>
          <label htmlFor='title'>
            <b>Title</b>
          </label>
        </div>
        <div>
          <input
            type='text'
            placeholder='Enter Title'
            name='title'
            value={videoData.title}
            onChange={(event) =>
              setVideoData({
                ...videoData,
                title: event.target.value,
              })
            }
          />
        </div>

        <div>
          <label htmlFor='category'>
            <b>Category</b>
          </label>
        </div>
        <div>
          <select
            name='category'
            id='category'
            form='videoUploadForm'
            value={videoData.category}
            onChange={(event) =>
              setVideoData({
                ...videoData,
                category: event.target.value,
              })
            }
          >
            <option value='dog'>Dog</option>
            <option value='cat'>Cat</option>
            <option value='bird'>Bird</option>
            <option value='cow'>Cow</option>
          </select>
        </div>
        <div>
          <label htmlFor='tags'>
            <b>Tags</b>
          </label>
        </div>
        <div>
          <input
            type='text'
            placeholder='Enter Tags'
            name='tags'
            value={videoData.tags}
            onChange={(event) =>
              setVideoData({
                ...videoData,
                tags: event.target.value,
              })
            }
          />
          <p>write tags with space between</p>
        </div>
        <button type='submit'>Update</button>
      </form>
      <div>{notification && <p>{notification}</p>}</div>
    </div>
  );
};

export default EditVideo;
