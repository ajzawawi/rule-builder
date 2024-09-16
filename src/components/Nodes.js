class Expression {
  constructor(type) {
    this.type = type;
  }
}

class ConditionNode extends Expression {
  constructor(field, fieldType, cmpOperator, value) {
    super("Condition");
    this.field = field;
    this.cmpOperator = cmpOperator;
    this.value = value;
    this.fieldType = fieldType;
  }

  setComparisonOperator(cmpOp) {
    this.cmpOperator = cmpOp;
  }

  setValue(value) {
    if (value) {
      const updated = [...this.value, ...value];
      this.value = updated;
    }
  }

  removeValue(value) {
    const filtered = this.value.filter((item) => item != value);
    this.value = filtered;
  }

  clone() {
    return new ConditionNode(this.field, this.fieldType, this.cmpOperator, [
      ...this.value,
    ]);
  }
}

class CompositeExpressionNode extends Expression {
  constructor(logOperator) {
    super("CompositeExpression");
    this.logOperator = logOperator;
    this.expressions = [];
  }

  setLogicalOperator(op) {
    this.logOperator = op;
  }

  addExpression(expression) {
    this.expressions.push(expression);
  }

  clone() {
    const cloneNode = new CompositeExpressionNode(this.logOperator);
    cloneNode.expressions = this.expressions.map((expr) => expr.clone());
    return cloneNode;
  }
}

export { ConditionNode, CompositeExpressionNode };
