import { useEffect } from "react";
import {shortcutKeyPrefix} from '../helpers/shortcutKey';

const useCommandS = (callback) => {
  const keyPrefix = shortcutKeyPrefix();
  const handleKeydown = e => {
    let charCode = String.fromCharCode(e.which).toLowerCase();
    if (e[keyPrefix.keyEvent] && charCode === 's') {
      e.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
};

export default useCommandS;
