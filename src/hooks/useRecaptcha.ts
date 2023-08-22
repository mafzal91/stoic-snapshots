import * as React from "react";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const executeRecaptcha = React.useCallback(() => {
    if (!isLoaded) return Promise.reject("Recaptcha not loaded");
    return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
      action: "submit",
    });
  }, [isLoaded]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      console.log("grecaptcha not ready", {
        window,
        grecaptcha: window.grecaptcha,
      });
      return;
    }
    window.grecaptcha.ready(function () {
      setIsLoaded(true);
    });
  }, []);

  return executeRecaptcha;
}
