import { useRef, useState, useEffect } from 'react';

import { ImageUploadRequest } from '../../../services/ImageUploadRequest';

export const ImageUpload = () => {
  const filePickerRef = useRef();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  // const {
  //   uploadImage,
  //   isImageUploadPending,
  //   isImageUploadSuccess,
  //   imageUploadError,
  // } = ImageUploadRequest();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    // uploadImage(file);

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:8080/api/users/image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    console.log(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (e) => {
    let pickedFile;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="my-4">
      <input
        id={'image'}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.jpeg,.png,"
        onClick={pickedHandler}
      />

      <div className={`flex flex-col justify-center items-center`}>
        <div className="flex justify-center items-center text-center mb-4 w-52 h-52 border-[1px] border-slate-500">
          {previewUrl && (
            <img
              className="block w-full h-full object-cover"
              src={previewUrl}
              alt="Preview"
            />
          )}
          {!previewUrl && <p>Please pick an image!</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>

      {!isValid && (
        <p className="text-red-500">
          Invalid image upload (1 .jpg, .jpeg or .png image)!
        </p>
      )}
    </div>
  );
};
