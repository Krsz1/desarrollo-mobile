import { Camera, CameraResultType, Photo } from '@capacitor/camera';

export const useCamera = () => {
  const takePhoto = async (): Promise<Photo | null> => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
      });
      return image;
    } catch {
      return null;
    }
  };

  return { takePhoto };
};