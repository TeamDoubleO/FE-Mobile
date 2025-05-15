export default {
  expo: {
    name: 'key-we-app',
    slug: 'key-we-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logoIcon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/images/logoIcon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/logoIcon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/logoIcon.png',
    },
    extra: {
      //BASE_URL: 'http://keywe.site', // EKS 사용시
      BASE_URL: 'http://192.168.0.225:8081', // 도커 사용시 - 본인 pc IPv4 주소로 수정하세용
    },
  },
};
