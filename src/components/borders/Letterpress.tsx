import type { ReactNode } from "react";

export function LetterpressBorder({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col grow p-4 sm:p-6">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full text-primary"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 8L163 7L284 9L412 7L578 8L706 6L849 8L992 7L991 179L993 326L991 487L992 653L990 811L992 992L827 991L682 993L518 991L363 992L203 990L8 992L9 824L7 651L9 490L6 329L8 167Z"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M18 21L224 19L407 21L603 18L795 20L979 18L981 229L979 434L982 626L980 818L981 979L784 981L591 979L389 982L196 979L20 981L18 783L21 584L19 381L21 188L18 21"
          strokeWidth="0.65"
          opacity="0.6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M70 9L158 8 M707 8L786 9 M990 394L989 468 M846 990L905 991 M9 694L10 764"
          strokeWidth="0.8"
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative flex flex-col grow min-w-0">{children}</div>
    </div>
  );
}
