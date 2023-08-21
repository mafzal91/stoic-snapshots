export function Loader() {
  return (
    <div className={"flex"}>
      <div
        className={`m-0 text-sm sm:text-md text-secondary animate-bounce`}
        style={{ animationDelay: ".1s" }}
      >
        •
      </div>
      <div
        className={`m-0 text-sm sm:text-md text-secondary animate-bounce`}
        style={{ animationDelay: ".2s" }}
      >
        •
      </div>
      <div
        className={`m-0 text-sm sm:text-md text-secondary animate-bounce`}
        style={{ animationDelay: ".3s" }}
      >
        •
      </div>
    </div>
  );
}
