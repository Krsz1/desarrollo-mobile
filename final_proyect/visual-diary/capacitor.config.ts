import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lunara.app',
  appName: 'Lunara',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
