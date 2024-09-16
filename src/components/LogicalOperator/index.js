import "./style.less";

function LogicalOperator({ active, node, refreshRoot }) {
  const getClassname = (label) => {
    return label === active ? "operator active" : "operator inactive";
  };

  const toggleOperator = (op) => {
    node.setLogicalOperator(op);
    refreshRoot();
  };
  return (
    <div className="logical-operator-toggle">
      <div
        onClick={() => toggleOperator("AND")}
        className={getClassname("AND")}
      >
        AND
      </div>
      <div onClick={() => toggleOperator("OR")} className={getClassname("OR")}>
        OR
      </div>
      <div
        onClick={() => toggleOperator("NOT")}
        className={getClassname("NOT")}
      >
        NOT
      </div>
    </div>
  );
}

export default LogicalOperator;
