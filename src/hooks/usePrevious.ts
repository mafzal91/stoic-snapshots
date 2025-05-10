import * as React from "react";

export function usePrevious<T>(prop: T) {
  const ref = React.useRef<T>(prop);
  React.useEffect(() => {
    ref.current = prop;
  });
  return ref.current;
}
