"use client";

import { useEffect, RefObject } from "react";

interface OutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

const useOutsideClick = ({ ref, callback }: OutsideClickProps): void => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
