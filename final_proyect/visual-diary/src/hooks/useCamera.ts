import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const useCamera = () => {
  const takePhoto = async (): Promise<string | null> => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 80,
      });
      return photo.base64String ?? null;
    } catch {
      return null;
    }
  };

  return { takePhoto };
};
