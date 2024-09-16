import { useState, useEffect } from "react";
import { ConditionNode, CompositeExpressionNode } from "../Nodes";
import ExpressionNode from "../ExpressionNode";

import "./style.less";

const createInitialTree = () => {
  const root = new CompositeExpressionNode("AND");
  root.addExpression(
    new ConditionNode("Direction", "String", "Equals", ["Left"])
  );
  root.addExpression(new ConditionNode("Color", "String", "Equals", ["Red"]));
  root.addExpression(new ConditionNode("Color", "String", "Equals", ["Blue"]));
  return root;
};

function RuleBuilder(props) {
  const [root, setRoot] = useState({});

  useEffect(() => {
    const initialState = createInitialTree();
    setRoot(initialState);
  }, []);

  // Function to add a new condition to the specified composite expression node
  const handleAddCondition = (parentNode) => {
    const newCondition = new ConditionNode("Status", "String", "Equals", [
      "Active",
    ]);
    parentNode.addExpression(newCondition);
    refreshRoot();
  };

  // Function to add a new composite expression to the specified composite expression node
  const handleAddCompositeExpression = (parentNode) => {
    const newComposite = new CompositeExpressionNode("AND");
    parentNode.addExpression(newComposite);
    refreshRoot();
  };

  const refreshRoot = () => {
    const updatedRoot = root.clone();
    setRoot(updatedRoot);
  };

  const handleSubmit = () => {
    const serializeExpression = (expression) => {
      if (expression.type === "Condition") {
        return {
          type: "Condition",
          field: expression.field,
          cmpOperator: expression.cmpOperator,
          value: expression.value,
        };
      } else if (expression.type === "CompositeExpression") {
        return {
          type: "CompositeExpression",
          logOperator: expression.logOperator,
          expressions: expression.expressions.map(serializeExpression),
        };
      }
    };

    const jsonPayload = JSON.stringify(serializeExpression(root), null, 2);
    console.log("Submitted JSON:", jsonPayload);
  };

  return (
    <div className="rule-builder">
      <button onClick={handleSubmit}>Submit</button>
      <div className="rules">
        <ExpressionNode
          node={root}
          addCondition={handleAddCondition}
          addCompositeExpression={handleAddCompositeExpression}
          refreshRoot={refreshRoot}
        />
      </div>
    </div>
  );
}

export default RuleBuilder;
