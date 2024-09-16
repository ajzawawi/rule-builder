import { useState, useEffect, useRef } from "react";
import "./style.less";

function AddButton({ addCondition, addComposite }) {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div onClick={() => setVisible(!visible)}>+</div>
      {visible && (
        <div className={`dropdown ${visible ? "open" : ""}`}>
          <div className="item" onClick={addCondition}>
            + Add Condition
          </div>
          <div className="item" onClick={addComposite}>
            + Add Composite Expression
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
