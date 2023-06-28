import clsx from "clsx";

function Corner({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        "absolute leading-[.6rem] w-4 h-4 text-primary text-center border-2 border-primary",
        className
      )}
    >
      •
    </div>
  );
}

export function Border({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-grow p-2 border-2 border-primary rounded-md">
      <div className="relative flex flex-col flex-grow h-full border-2 border-primary rounded-md">
        {children}
        <Corner className="left-[-2px] top-[-2px] rounded-br-md rounded-tl-md" />
        <Corner className="right-[-2px] top-[-2px] rounded-bl-md rounded-tr-md" />
        <Corner className="left-[-2px] bottom-[-2px] rounded-tr-md rounded-bl-md" />
        <Corner className="right-[-2px] bottom-[-2px] rounded-tl-md rounded-br-md" />
      </div>
    </div>
  );
}
