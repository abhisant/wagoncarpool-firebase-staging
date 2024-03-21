import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wagon.starter',
  appName: 'Wagon',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: "http://localhost:8100",
    cleartext: true,
    allowNavigation: ["*"]
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      androidClientId: "379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com",
      clientId: "379793457253-d1fbgh24tr1l3upvgausqd3sdstilp48.apps.googleusercontent.com",
      serverClientId: "379793457253-quhbedbbmb57amflg3asqkgtunted6kd.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
