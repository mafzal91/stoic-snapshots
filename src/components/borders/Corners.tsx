import clsx from "clsx";

const borderWidth = 2;
const cornerDimension = 5;

function Corner({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        "absolute leading-[.8rem] text-primary text-center border-primary",
        `border-${borderWidth}`,
        `w-${cornerDimension}`,
        `h-${cornerDimension}`,
        className,
      )}
    >
      •
    </div>
  );
}

export function CornersBorder({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col grow p-2 border-${borderWidth} border-primary rounded-md`}
    >
      <div
        className={`relative flex flex-col grow h-full border-${borderWidth} border-primary rounded-md`}
      >
        {children}
        <Corner
          className={`left-[-2px] top-[-2px] rounded-br-md rounded-tl-md`}
        />
        <Corner
          className={`right-[-2px] top-[-2px] rounded-bl-md rounded-tr-md`}
        />
        <Corner
          className={`left-[-2px] bottom-[-2px] rounded-tr-md rounded-bl-md`}
        />
        <Corner
          className={`right-[-2px] bottom-[-2px] rounded-tl-md rounded-br-md`}
        />
      </div>
    </div>
  );
}
