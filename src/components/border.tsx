import clsx from "clsx";
import { BorderStyle } from "@/app/common";

const SCALE = 1;
const cornerPosition = -2 * SCALE;
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

function CornersBorder({ children }: { children: React.ReactNode }) {
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

function BracketCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 25 25"
      className={clsx("absolute w-6 h-6 text-primary z-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 24L14.9286 24L14.9286 6.77466L6.89005 6.77466" />
        <path d="M24 0L24 14.9286L6.77472 14.9286L6.77472 6.89005" />
      </g>
    </svg>
  );
}

function BracketsBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        <BracketCorner className="top-1 left-1" />
        <BracketCorner className="top-1 right-1 rotate-90" />
        <BracketCorner className="bottom-1 right-1 rotate-180" />
        <BracketCorner className="bottom-1 left-1 -rotate-90" />

        <div className="absolute top-[4px] left-7 right-7 h-px bg-primary" />
        <div className="absolute bottom-[4px] left-7 right-7 h-px bg-primary" />
        <div className="absolute left-[4px] top-7 bottom-7 w-px bg-primary" />
        <div className="absolute right-[4px] top-7 bottom-7 w-px bg-primary" />

        <div className="flex flex-col grow p-8">{children}</div>
      </div>
    </div>
  );
}

function DiamondCorner({
  className,
  filled = false,
}: {
  className: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 33 33"
      className={clsx("absolute w-8 h-8 text-primary z-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <path d="M1 33V22.6C13.0861 22.6 22.8839 12.9293 22.8839 1H33" />
        <path
          d="M7.36328 2.14941C8.54299 4.36813 10.3586 6.18327 12.5771 7.36328C10.3587 8.5431 8.5431 10.3587 7.36328 12.5771C6.18327 10.3586 4.36813 8.54299 2.14941 7.36328C4.36823 6.18338 6.18338 4.36823 7.36328 2.14941Z"
          fill={filled ? "currentColor" : "none"}
        />
      </g>
    </svg>
  );
}

function DiamondsBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        <DiamondCorner filled className="top-1 left-1" />
        <DiamondCorner className="top-1 right-1 rotate-90" />
        <DiamondCorner filled className="bottom-1 right-1 rotate-180" />
        <DiamondCorner className="bottom-1 left-1 -rotate-90" />

        <div className="absolute top-[4px] left-9 right-9 h-px bg-primary" />
        <div className="absolute bottom-[4px] left-9 right-9 h-px bg-primary" />
        <div className="absolute left-[4px] top-9 bottom-9 w-px bg-primary" />
        <div className="absolute right-[4px] top-9 bottom-9 w-px bg-primary" />

        <div className="flex flex-col grow p-8">{children}</div>
      </div>
    </div>
  );
}

function SparkleCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 13 14"
      className={clsx("absolute w-3 h-3.5 text-primary z-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M2.23735 6.15625L2.50669 7.31791C2.5865 7.66214 2.61866 8.01821 2.60316 8.37198C2.60205 8.39754 2.62358 8.41838 2.6491 8.41669C2.94382 8.39716 3.24052 8.43587 3.5273 8.53283L4.48924 8.85811L3.5273 9.18337C3.24899 9.27748 2.96129 9.31671 2.67517 9.30109C2.64647 9.29952 2.62401 9.32604 2.63059 9.35402C2.77359 9.9624 2.79523 10.7057 2.64465 11.3053L2.24671 12.8901L1.84877 11.3053C1.6982 10.7057 1.7199 9.96218 1.86289 9.3538C1.86947 9.32579 1.84694 9.29925 1.81822 9.30087C1.53072 9.3171 1.24159 9.27793 0.961947 9.18337L0 8.85811L0.961947 8.53283C1.24407 8.43744 1.53582 8.39841 1.82584 8.41578C1.85125 8.4173 1.8726 8.39651 1.87149 8.37107C1.85608 8.0176 1.88826 7.66183 1.96799 7.31791L2.23735 6.15625Z" />
        <path d="M5.64258 2.76459L6.80424 2.49525C7.14847 2.41544 7.50453 2.38328 7.85831 2.39878C7.88387 2.3999 7.90471 2.37837 7.90302 2.35285C7.88348 2.05813 7.9222 1.76142 8.01916 1.47465L8.34444 0.512695L8.66969 1.47465C8.76381 1.75296 8.80304 2.04065 8.78742 2.32677C8.78585 2.35547 8.81237 2.37793 8.84034 2.37136C9.44873 2.22835 10.192 2.20671 10.7916 2.35729L12.3764 2.75523L10.7916 3.15318C10.192 3.30374 9.44851 3.28205 8.84012 3.13906C8.81211 3.13248 8.78558 3.155 8.7872 3.18372C8.80343 3.47122 8.76426 3.76035 8.66969 4.04L8.34444 5.00194L8.01916 4.04C7.92376 3.75788 7.88474 3.46612 7.90211 3.17611C7.90363 3.15069 7.88284 3.12935 7.8574 3.13045C7.50393 3.14586 7.14816 3.11369 6.80424 3.03396L5.64258 2.76459Z" />
        <path d="M3.19733 2.45851C3.37327 2.29629 3.48343 2.06389 3.48343 1.80574C3.48343 1.31545 3.08595 0.917969 2.59566 0.917969C2.10537 0.917969 1.70789 1.31545 1.70789 1.80574C1.70789 2.06389 1.81804 2.29629 1.99399 2.45851C1.97624 2.47483 1.95921 2.49192 1.94289 2.50961C1.78071 2.33372 1.54827 2.22351 1.29011 2.22351C0.799821 2.22351 0.402344 2.62099 0.402344 3.11128C0.402344 3.60158 0.799821 3.99905 1.29011 3.99905C1.54827 3.99905 1.78071 3.88885 1.94289 3.71296C1.95921 3.73065 1.97624 3.74774 1.99399 3.76406C1.81804 3.92628 1.70789 4.15868 1.70789 4.41683C1.70789 4.90712 2.10537 5.3046 2.59566 5.3046C3.08595 5.3046 3.48343 4.90712 3.48343 4.41683C3.48343 4.15868 3.37327 3.92628 3.19733 3.76406C3.21508 3.74774 3.23211 3.73065 3.24843 3.71296C3.4106 3.88885 3.64305 3.99905 3.9012 3.99905C4.3915 3.99905 4.78897 3.60158 4.78897 3.11128C4.78897 2.62099 4.3915 2.22351 3.9012 2.22351C3.64305 2.22351 3.4106 2.33372 3.24843 2.50961C3.23211 2.49192 3.21508 2.47483 3.19733 2.45851Z" />
      </g>
    </svg>
  );
}

function SparklesBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        <SparkleCorner className="top-2 left-2" />
        <SparkleCorner className="top-2 right-2 rotate-90" />
        <SparkleCorner className="bottom-2 right-2 rotate-180" />
        <SparkleCorner className="bottom-2 left-2 -rotate-90" />

        <div className="absolute top-[14px] left-7 right-7 h-px bg-primary opacity-30" />
        <div className="absolute bottom-[14px] left-7 right-7 h-px bg-primary opacity-30" />
        <div className="absolute left-[14px] top-7 bottom-7 w-px bg-primary opacity-30" />
        <div className="absolute right-[14px] top-7 bottom-7 w-px bg-primary opacity-30" />

        <div className="flex flex-col grow p-8">{children}</div>
      </div>
    </div>
  );
}

function NoBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow p-2 rounded-md">
      <div className="relative flex flex-col grow h-full rounded-md">
        {children}
      </div>
    </div>
  );
}

export function Border({
  borderStyle,
  children,
}: {
  borderStyle: BorderStyle;
  children: React.ReactNode;
}) {
  switch (borderStyle) {
    case BorderStyle.Corners:
      return <CornersBorder>{children}</CornersBorder>;
    case BorderStyle.Brackets:
      return <BracketsBorder>{children}</BracketsBorder>;
    case BorderStyle.Diamonds:
      return <DiamondsBorder>{children}</DiamondsBorder>;
    case BorderStyle.Sparkles:
      return <SparklesBorder>{children}</SparklesBorder>;
    case BorderStyle.None:
    default:
      return <NoBorder>{children}</NoBorder>;
  }
}
