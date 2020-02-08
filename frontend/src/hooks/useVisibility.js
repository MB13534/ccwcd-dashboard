import { useState } from "react";

const useVisibility = (defaultVisibility = false) => {
  const [visibility, setVisibility] = useState(defaultVisibility);

  const handleVisibility = () => {
    setVisibility(state => !state);
  };

  return [visibility, handleVisibility];
};

export default useVisibility;
