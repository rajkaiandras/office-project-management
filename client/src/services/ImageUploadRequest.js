import { useHttpClient } from '../hooks/useHttpClient';

export const ImageUploadRequest = () => {
  const {
    sendRequest,
    isPending: isImageUploadPending,
    isSuccess: isImageUploadSuccess,
    error: imageUploadError,
  } = useHttpClient();

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      console.log(formData.get('image'));

      const result = await sendRequest(
        'http://localhost:8080/api/users/image',
        'POST',
        { 'Content-Type': 'multipart/form-data' },
        formData
      );

      return result;
    } catch (err) {
      console.log(imageUploadError);
    }
  };

  return {
    uploadImage,
    isImageUploadPending,
    isImageUploadSuccess,
    imageUploadError,
  };
};
