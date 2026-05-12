import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const FILE_NAME = 'challenge07.txt';

const useFilesystem = () => {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const writeFile = async (text: string) => {
    try {
      await Filesystem.writeFile({
        path: FILE_NAME,
        data: text,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      setSaved(true);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setSaved(false);
    }
  };

  const readFile = async () => {
    try {
      const result = await Filesystem.readFile({
        path: FILE_NAME,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      setContent(result.data as string);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setContent(null);
    }
  };

  return { content, error, saved, writeFile, readFile };
};

export default useFilesystem;
