import { useState } from 'react';

export const ImageUploadRequest = () => {
  const [result, setResult] = useState();

  const uploadImage = async (userId, image) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('image', image);

      console.log(formData.get('image'));
      console.log(formData.get('userId'));

      fetch('http://localhost:8080/api/users/upload/image', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResult(data);
        });

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    uploadImage,
  };
};
