import { useState, useEffect, useRef } from "react";

const useScrollHeader = () => {
  const [scroll, setScroll] = useState(false);
  const tempScroll = useRef();

  const backgroundScroll = () => {
    if (window.scrollY >= 60) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const scrolled = () => {
    window.addEventListener("scroll", backgroundScroll);
  };

  tempScroll.current = scrolled;

  useEffect(() => {
    tempScroll.current();
  }, []);

  return { scroll };
};

export default useScrollHeader;
