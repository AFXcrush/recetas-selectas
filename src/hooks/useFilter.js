import { useState } from "react";

const useFilter = () => {
  const [filter, setFilter] = useState([]);
  return { filter, setFilter };
};

export default useFilter;
