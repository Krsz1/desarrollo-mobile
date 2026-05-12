import { useState } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

const useCamera = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
      setPhoto(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const openGallery = async () => {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });
      setPhoto(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { photo, error, takePhoto, openGallery };
};

export default useCamera;
