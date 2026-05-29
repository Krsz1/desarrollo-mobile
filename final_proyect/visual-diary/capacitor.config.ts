import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.visualdiary.app',
  appName: 'VisualDiary',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
