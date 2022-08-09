import { useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import classes from './video-upload-form.module.css';

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      message
      error
      success
      secure_url
      public_id
    }
  }
`;

const CREATE_VIDEO = gql`
  mutation CreateVideo($createVideoInput: CreateVideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      _id
      title
      category
      tags
      url
      secure_url
      public_id
    }
  }
`;

let fileUploadResult;

const VideoUploadForm = () => {
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef();
  const categoryInputRef = useRef();
  const tagsInputRef = useRef();

  const [uploadFile] = useMutation(
    UPLOAD_FILE
    // I am leaving it here for future refarences
    //{onCompleted: (data) => console.log(data),}
  );

  const [createVideo] = useMutation(CREATE_VIDEO);

  // form 'graphql-upload' module documentation
  const fileChangeHandler = async ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      fileUploadResult = await uploadFile({ variables: { file } });
    }
  };

  /* -------- working code leave it here for future reference ----------
  const fileChangeHandler = async (event) => {
    const file = event.target.files[0]
    if (!file) return;
    const result = await uploadFile({ variables: { file } });
    console.log(result);
  }
--------------------------------------------------------------------- */
  const videoUploadFormSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredTags = tagsInputRef.current.value;

    const url = fileUploadResult.data.uploadFile.url;
    const secure_url = fileUploadResult.data.uploadFile.secure_url;
    const public_id = fileUploadResult.data.uploadFile.public_id;

    if (url) {
      const createVideoInputData = {
        title: enteredTitle,
        category: enteredCategory,
        tags: enteredTags.split(' '),
        url,
        secure_url,
        public_id,
      };

      setIsLoading(true);

      createVideo({
        variables: {
          createVideoInput: {
            ...createVideoInputData,
          },
        },
      });

      setIsLoading(false);

      setNotification(
        'Vedio Uploaded Successfuly and Data inserted to the database'
      );
      titleInputRef.current.value = '';
      categoryInputRef.current.value = 'dog';
      tagsInputRef.current.value = '';
    } else {
      setNotification(
        "Video data not inserted to the database as url not found or video format doesn't match"
      );
      return console.log(
        "Video data not inserted to the database as uri not found or video format doesn't match"
      );
    }
  };

  return (
    <div className={classes.videoUploadSection}>
      <form id='videoUploadForm' onSubmit={videoUploadFormSubmitHandler}>
        <div>
          <label htmlFor='title'>
            <b>Choose a Video File (*.mp4)</b>
          </label>
        </div>
        <div>
          <input type='file' required onChange={fileChangeHandler} />
        </div>
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
            ref={titleInputRef}
            required
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
            ref={categoryInputRef}
            required
          >
            <option value='dog' >Dog</option>
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
            ref={tagsInputRef}
          />
          <p>write tags with space between</p>
        </div>
        <button type='submit'>Upload</button>
      </form>
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {notification && (
        <div>
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
