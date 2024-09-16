import React from "react";
import Condition from "../Condition";
import LogicalOperator from "../LogicalOperator";
import AddButton from "../AddButton";
import { ConditionNode } from "../Nodes";
import "./style.less";

function ExpressionNode({
  node,
  addCondition,
  addCompositeExpression,
  refreshRoot,
}) {
  if (node && node.type === "Condition") {
    return <Condition node={node} refreshRoot={refreshRoot} />;
  }

  if (node && node.type === "CompositeExpression") {
    return (
      <div>
        <div className="expression-controls">
          <LogicalOperator
            active={node.logOperator}
            node={node}
            refreshRoot={refreshRoot}
          />
          <AddButton
            addCondition={() => addCondition(node)}
            addComposite={() => addCompositeExpression(node)}
          />
          {/* <button onClick={() => addCondition(node)}>Add Condition</button>
          <button onClick={() => addCompositeExpression(node)}>
            Add Composite Expression
          </button> */}
        </div>
        <div className="expression">
          {node.expressions.map((childNode, idx) => (
            <React.Fragment>
              <ExpressionNode
                key={idx}
                node={childNode}
                addCondition={addCondition}
                addCompositeExpression={addCompositeExpression}
                refreshRoot={refreshRoot}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default ExpressionNode;
