import { useState } from "react";

function StringFilter({ node, refreshRoot }) {
  const [value, setValue] = useState("");
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const updateNode = () => {
    if (value) {
      node.setValue(value.split(","));
      refreshRoot();
      setValue("");
    }
  };

  return (
    <div>
      <input onChange={handleInput} onBlur={updateNode} value={value} />
    </div>
  );
}

export default StringFilter;
