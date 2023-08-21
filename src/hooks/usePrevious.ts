import * as React from "react";

export function usePrevious(prop: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = prop;
  });
  return ref.current;
}
