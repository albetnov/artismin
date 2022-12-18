import { useEffect } from "react";

export default function useCustomBg(bg?: string) {
  useEffect(() => {
    document.body.style.backgroundColor = bg ?? "rgb(39 39 42)";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [bg]);
}
