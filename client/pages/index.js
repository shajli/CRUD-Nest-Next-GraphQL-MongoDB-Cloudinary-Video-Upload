import { Fragment, useState } from 'react';
import Head from 'next/head';
import VideoUploadForm from '../components/home-page/video-upload-form';
import classes from '../styles/home-page.module.css';
import Videos from '../components/home-page/videos';

const HomePage = () => {
  const [IsVideoUploadFormOpen, setIsVideoUploadFormOpen] = useState(false);

  const videoUploadFromOpenHandler = () => {
    setIsVideoUploadFormOpen(!IsVideoUploadFormOpen);
  };

  return (
    <Fragment>
      <Head>
        <title>Talent Pro Assignment 2</title>
        <meta
          name='description'
          content='Assignment Project 2 for Talent Pro'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className={classes.container}>
          <div className={classes.center}>
            <button
              className={classes.btnPostAVideo}
              onClick={videoUploadFromOpenHandler}
            >
              Post a Video
            </button>
          </div>
          {IsVideoUploadFormOpen && <VideoUploadForm />}
          <Videos />
        </div>
      </main>
    </Fragment>
  );
};

export default HomePage;

// I left following code to show you, we can
// fetch the data this way also

// export async function getStaticProps() {

//   const { data } = await apolloClient.query({
//     query: gql`
//       query {
//         users {
//           _id
//           firstName
//           lastName
//           email
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       users: data.users,
//     },
//   };
// }
