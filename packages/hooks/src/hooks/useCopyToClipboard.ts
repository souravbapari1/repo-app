import { useRef } from "react";

export const useCopyToClipboard = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = () => {
    if (ref.current) {
      ref.current.select();
      document.execCommand("copy");
    }
  };

  return [ref, copyToClipboard] as const;
};
