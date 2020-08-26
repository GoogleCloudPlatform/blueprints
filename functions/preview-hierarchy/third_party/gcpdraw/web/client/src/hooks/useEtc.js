import { useEffect } from "react";

const useEtc = (callback) => {
  const handleKeydown = e => {
    if (e.keyCode === 27) {  // Esc key
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

export default useEtc;
