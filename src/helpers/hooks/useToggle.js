import { useState } from "react";

const useToggle = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };
  return { open, toggleOpen, setOpen };
};

export default useToggle;
