import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import EditVideo from '../components/edit-video/edit-video';
import classes from '../styles/edit-video.module.css';

const VIDEO = gql`
  query Video($videoId: String!) {
    video(id: $videoId) {
      _id
      title
      category
      tags
    }
  }
`;

const EditVideoPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { loading, error, data } = useQuery(VIDEO, {
    variables: { videoId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    return (
      <div className={classes.videoUpdateSection}>
        <h2>Edit Video</h2>
        <EditVideo video={data.video} />
      </div>
    );
  }
  return <div className={classes.videoUpdateSection}>Edit Video Page</div>;
};

export default EditVideoPage;
