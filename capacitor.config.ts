import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mekadevelopments.lt',
  appName: 'Meka LT',
  webDir: 'www',
  bundledWebRuntime: true,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchAutoHide: true,
      splashImmersive: false,
      splashFullScreen: false,
      launchShowDuration: 1000,
      backgroundColor: '#222428',
      spinnerColor: "#E7B63A",
      androidScaleType: 'CENTER_CROP',
      androidSplashResourceName: 'splash',
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
  android: {
    allowMixedContent: true
  },
  server: {
    cleartext: true,
    url: 'http://192.168.0.227:8103',
  },
};

export default config;
