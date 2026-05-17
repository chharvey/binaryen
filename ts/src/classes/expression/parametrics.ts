import {
	BinaryenObj,
} from "../../-pre.ts";
import {
	ExpressionId,
	type ExpressionRef,
} from "../../constants.ts";
import {
	Expression,
} from "./Expression.ts";



export class Drop extends Expression {
	constructor(expr: ExpressionRef) {
		super(ExpressionId.Drop, expr);
	}

	get value(): ExpressionRef { return BinaryenObj["_BinaryenDropGetValue"](this._ptr) as ExpressionRef; }
	set value(valueExpr: ExpressionRef) { BinaryenObj["_BinaryenDropSetValue"](this._ptr, valueExpr); }
}



export class Select extends Expression {
	constructor(expr: ExpressionRef) {
		super(ExpressionId.Select, expr);
	}

	get condition(): ExpressionRef { return BinaryenObj["_BinaryenSelectGetCondition"](this._ptr) as ExpressionRef; }
	set condition(condExpr: ExpressionRef) { BinaryenObj["_BinaryenSelectSetCondition"](this._ptr, condExpr); }

	get ifTrue(): ExpressionRef { return BinaryenObj["_BinaryenSelectGetIfTrue"](this._ptr) as ExpressionRef; }
	set ifTrue(ifTrueExpr: ExpressionRef) { BinaryenObj["_BinaryenSelectSetIfTrue"](this._ptr, ifTrueExpr); }

	get ifFalse(): ExpressionRef { return BinaryenObj["_BinaryenSelectGetIfFalse"](this._ptr) as ExpressionRef; }
	set ifFalse(ifFalseExpr: ExpressionRef) { BinaryenObj["_BinaryenSelectSetIfFalse"](this._ptr, ifFalseExpr); }
}
