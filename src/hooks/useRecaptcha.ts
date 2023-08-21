import * as React from "react";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function useRecaptcha() {
  const [executeRecaptcha, setExecuteRecaptcha] = React.useState<
    () => PromiseLike<string>
  >(() => Promise.resolve(""));

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      console.log("grecaptcha not ready", {
        window,
        grecaptcha: window.grecaptcha,
      });
      return;
    }
    window.grecaptcha.ready(function () {
      setExecuteRecaptcha((): PromiseLike<string> => {
        return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "submit",
        });
      });
    });
  }, []);

  return executeRecaptcha;
}
