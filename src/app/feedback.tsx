"use client";
import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  LightBulbIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { submitFeedback } from "@/app/actions/submitFeedback";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { usePrevious } from "@/hooks/usePrevious";
import { Loader } from "@/components/loader";
import { ErrorBoundary } from "@/components/errorBoundry";

function SubmitButton() {
  const { pending } = useFormStatus();
  const prevPending = usePrevious(pending);

  let buttonContent: React.ReactNode = "Submit";
  if (prevPending && !pending) {
    buttonContent = (
      <span className="flex items-center">
        <CheckCircleIcon className="h-6 w-6 mr-1" aria-hidden="true" />
        Thanks!
      </span>
    );
  } else if (pending) {
    buttonContent = <Loader />;
  }

  return (
    <button
      type="submit"
      className="inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-primary hover:text-background hover:bg-primary border-[1px] border-primary sm:ml-3 sm:w-auto disabled:cursor-not-allowed disabled:text-background disabled:bg-primary"
      disabled={pending || (prevPending && !pending)}
    >
      {buttonContent}
    </button>
  );
}

export function Feedback() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        aria-label="report"
        className="p-1 rounded-md text-primary focus:outline-none focus:ring-1 focus:ring-primary"
        onClick={() => setOpen(true)}
      >
        <LightBulbIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform  w-full rounded-lg bg-background px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:max-w-sm sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-background text-primary hover:text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-primary"
                    >
                      Submit Feedback
                    </Dialog.Title>
                    <small className="text-secondary">
                      Have and issue? Some feedback? Tell me about it!
                    </small>
                  </div>
                  <ErrorBoundary
                    fallback={
                      <span className="mt-2 text-base font-semibold leading-6 text-primary">
                        Uh-uh this is embarrasing but something went wrong. Rest
                        assured I have been notified and will fix this as soon
                        as possible.
                      </span>
                    }
                  >
                    <form action={submitFeedback}>
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
                            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-primary rounded-md"
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
                            className="resize-none mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-primary rounded-md"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <SubmitButton />
                      </div>
                    </form>
                  </ErrorBoundary>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
