"use client";
import * as React from "react";
import { LightBulbIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { submitFeedback } from "@/app/actions/submitFeedback";

import { usePrevious } from "@/hooks/usePrevious";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { Loader } from "@/components/loader";
import { Modal } from "@/components/modal";
import { ErrorBoundary } from "@/components/errorBoundry";

function SubmitButton({ isPending }: { isPending: boolean }) {
  const prevPending = usePrevious(isPending) as boolean;

  let buttonContent: React.ReactNode = "Submit";
  if (prevPending && !isPending) {
    buttonContent = (
      <span className="flex items-center">
        <CheckCircleIcon className="h-6 w-6 mr-1" aria-hidden="true" />
        Thanks!
      </span>
    );
  } else if (isPending) {
    buttonContent = <Loader />;
  }
  return (
    <button
      type="submit"
      className="inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-primary hover:text-background hover:bg-primary border border-primary sm:ml-3 sm:w-auto disabled:cursor-not-allowed disabled:text-background disabled:bg-primary"
      disabled={isPending || (prevPending && !isPending)}
    >
      {buttonContent}
    </button>
  );
}

function FeedbackForm() {
  let [isPending, startTransition] = React.useTransition();
  const executeRecaptcha = useRecaptcha();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const token = await executeRecaptcha();
    formData.append("token", token);

    startTransition(() => {
      submitFeedback(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary"
          >
            Email:
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-xs sm:text-sm border-primary rounded-md"
            placeholder="Your Email"
          />
        </div>
        <br />
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-primary"
          >
            Message:
          </label>
          <textarea
            required
            maxLength={1000}
            name="message"
            id="message"
            rows={10}
            className="resize-none mt-1 focus:ring-primary focus:border-primary block w-full shadow-xs sm:text-sm border-primary rounded-md"
            placeholder="Your Email"
          />
        </div>

        <input name="url" type="hidden" value={window.location.href} readOnly />
      </div>
      <span className="text-xs leading-3 text-secondary">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-primary"
          target="_blank"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          className="text-primary"
          target="_blank"
        >
          Terms of Service
        </a>{" "}
        apply.
      </span>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <SubmitButton isPending={isPending} />
      </div>
    </form>
  );
}

export function Feedback() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        aria-label="report"
        className="p-1 rounded-md text-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
        onClick={() => setOpen(true)}
      >
        <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Submit Feedback"
        description="Have an issue? Some feedback? Tell me about it!"
      >
        <ErrorBoundary
          fallback={
            <span className="mt-2 text-base font-semibold leading-6 text-primary">
              Uh-uh this is embarrasing but something went wrong. Rest assured I
              have been notified and will fix this as soon as possible.
            </span>
          }
        >
          <FeedbackForm />
        </ErrorBoundary>
      </Modal>
    </>
  );
}
