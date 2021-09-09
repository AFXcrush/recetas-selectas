import { useState } from "react";

const useClearInput = () => {
  const [searchInput, setSearchInput] = useState("");

  return { searchInput, setSearchInput };
};

export default useClearInput;
