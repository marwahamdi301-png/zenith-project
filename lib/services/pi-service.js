export const piService = {
  appId: process.env.NEXT_PUBLIC_PI_APP_ID,
  init: () => {
    console.log("Zenith Empire SDK Initialized: " + process.env.NEXT_PUBLIC_PI_APP_ID);
  }
};
