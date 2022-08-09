import { useState } from 'react';
import {useRouter} from "next/router"
import { gql, useMutation } from '@apollo/client';
import classes from './video.module.css';

const REMOVE_VIDEO = gql`
  mutation RemoveVideo($removeVideoId: String!, $publicId: String!) {
    removeVideo(id: $removeVideoId, public_id: $publicId) {
      _id
      public_id
    }
  }
`;

const Video = (props) => {
  const router = useRouter();
  const [notification, setNotification] = useState();
  const { url, title, category, tags, public_id, _id } = props.video;

  const [removeVideo, { data, loading, error }] = useMutation(REMOVE_VIDEO);

  const deleteVideoHandler = () => {
    removeVideo({
      variables: {
        removeVideoId: _id,
        publicId: public_id,
      },
    });
    setNotification(
      "Video Deleted, to see effect reload the index/home page or see in MongoDB videos Collection. which is worng the list should update autometically, I couldn't fix it due to short of time"
    );
    props.videoListUpdateHandler();
  };

  const editVideoHandler = () => {
    router.push({
      pathname: '/edit-video',
      query: {
        videoId: _id,
      },
    });
  };

  return (
    <div className={classes.videoSection}>
      <video width='320' height='240' controls>
        <source src={url} type='video/mp4' />
      </video>
      <h3>Title: {title}</h3>
      <p>
        <b>Category: {category}</b>
      </p>
      <p>
        <b>Tags: {tags.map((tag) => tag + ' ')}</b>
      </p>

      <button onClick={editVideoHandler}>Edit</button>
      <button onClick={deleteVideoHandler}>Delete</button>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default Video;
