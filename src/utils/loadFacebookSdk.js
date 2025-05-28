export const loadFacebookSdk = () => {
    return new Promise((resolve) => {
      if (window.FB) {
        resolve(window.FB);
        return;
      }
  
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: false,
          version: "v18.0", // Always use latest stable version
        });
        resolve(window.FB);
      };
  
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  };
  
