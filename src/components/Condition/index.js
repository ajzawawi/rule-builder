import { useState, useEffect } from "react";
import ComparisonOperator from "../ComparisonOperator";
import { StringFilter } from "../Filters";
import "./style.less";

function Condition({ node, refreshRoot }) {
  const [logicalOperators, setLogicalOperators] = useState([]);

  useEffect(() => {
    // If the field changes, reset everything
  }, [node.field]);

  const renderComponent = () => {
    const config = {
      String: () => <StringFilter node={node} refreshRoot={refreshRoot} />,
    };

    return node.fieldType && config[node.fieldType]();
  };

  const removeElement = (v) => {
    node.removeValue(v);
    refreshRoot();
  };

  return (
    <div className="condition">
      <div className="field-label">{node.field}</div>
      <ComparisonOperator {...node} />
      {node.value.map((v, idx) => (
        <div className="field-value">
          {v}
          <div onClick={() => removeElement(v)}>x</div>
        </div>
      ))}
      {renderComponent()}
    </div>
  );
}

export default Condition;
