import { useRef } from "react";

export const useScrollToElement = <T extends HTMLElement>(): [
  React.RefObject<T>,
  () => void,
] => {
  const ref = useRef<T>(null);

  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return [ref, scrollToElement];
};
