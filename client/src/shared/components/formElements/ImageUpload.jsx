import { useRef, useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../../contexts/auth-context';
import { ImageUploadRequest } from '../../../services/ImageUploadRequest';

export const ImageUpload = () => {
  const auth = useContext(AuthContext);
  const filePickerRef = useRef();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const { uploadImage } = ImageUploadRequest();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    let userId = auth.state.user._id;
    uploadImage(userId, file);

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
    <form className="my-4" encType="multipart/form-data">
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
    </form>
  );
};
