import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import Video from './video';

import classes from './videos.module.css';

const ALL_VIDEOS = gql`
  query {
    videos {
      _id
      title
      category
      tags
      url
      public_id
    }
  }
`;

const Videos = () => {
  const [videoListIsUpdated, setVideoListIsUpdated] = useState(false);

  const { loading, error, data } = useQuery(ALL_VIDEOS);

  const videoListUpdateHandler = () => {
    setVideoListIsUpdated(!videoListIsUpdated);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className={classes.videosSection}>
      <h3>List of Uploaded Videos</h3>
      <ol>
        {data?.videos?.map((video) => (
          <li key={video._id}>
            <Video
              video={video}
              videoListUpdateHandler={videoListUpdateHandler}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Videos;
