import {
	BinaryenObj,
} from "../../-pre.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	type ExpressionRef,
	Operation,
	Type,
} from "../../constants.ts";
import {
	binop,
	constant,
	loadFn,
	relop,
	storeFn,
	unaryFn,
	unop,
} from "./-utils.ts";



/**
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#numeric-instructions
 */
export function f64(mod: Module) {
	return {
		load: loadFn<ExpressionRef.f64>(mod, Type.f64, 8, true),
		store: storeFn<ExpressionRef.f64>(mod, Type.f64, 8),

		/** Return a static constant f64. */
		const: (value: number): ExpressionRef.f64 => (
			constant(mod, "_BinaryenLiteralFloat64", value)
		),

		const_bits: (value: number | bigint): ExpressionRef.f64 => (
			constant(mod, "_BinaryenLiteralFloat64Bits", BigInt(value))
		),

		abs: unop<ExpressionRef.f64>(mod, Operation.AbsFloat64),
		neg: unop<ExpressionRef.f64>(mod, Operation.NegFloat64),
		sqrt: unop<ExpressionRef.f64>(mod, Operation.SqrtFloat64),
		ceil: unop<ExpressionRef.f64>(mod, Operation.CeilFloat64),
		floor: unop<ExpressionRef.f64>(mod, Operation.FloorFloat64),
		trunc: unop<ExpressionRef.f64>(mod, Operation.TruncFloat64),
		nearest: unop<ExpressionRef.f64>(mod, Operation.NearestFloat64),

		add: binop<ExpressionRef.f64>(mod, Operation.AddFloat64),
		sub: binop<ExpressionRef.f64>(mod, Operation.SubFloat64),
		mul: binop<ExpressionRef.f64>(mod, Operation.MulFloat64),
		div: binop<ExpressionRef.f64>(mod, Operation.DivFloat64),
		min: binop<ExpressionRef.f64>(mod, Operation.MinFloat64),
		max: binop<ExpressionRef.f64>(mod, Operation.MaxFloat64),
		copysign: binop<ExpressionRef.f64>(mod, Operation.CopySignFloat64),

		eq: relop<ExpressionRef.f64>(mod, Operation.EqFloat64),
		ne: relop<ExpressionRef.f64>(mod, Operation.NeFloat64),
		lt: relop<ExpressionRef.f64>(mod, Operation.LtFloat64),
		gt: relop<ExpressionRef.f64>(mod, Operation.GtFloat64),
		le: relop<ExpressionRef.f64>(mod, Operation.LeFloat64),
		ge: relop<ExpressionRef.f64>(mod, Operation.GeFloat64),

		convert_i32_s: unaryFn<ExpressionRef.i32, ExpressionRef.f64>(mod, Operation.ConvertSInt32ToFloat64),
		convert_i32_u: unaryFn<ExpressionRef.i32, ExpressionRef.f64>(mod, Operation.ConvertUInt32ToFloat64),
		convert_i64_s: unaryFn<ExpressionRef.i64, ExpressionRef.f64>(mod, Operation.ConvertSInt64ToFloat64),
		convert_i64_u: unaryFn<ExpressionRef.i64, ExpressionRef.f64>(mod, Operation.ConvertUInt64ToFloat64),
		reinterpret_i64: unaryFn<ExpressionRef.i64, ExpressionRef.f64>(mod, Operation.ReinterpretInt64),

		promote_f32: unaryFn<ExpressionRef.f32, ExpressionRef.f64>(mod, Operation.PromoteFloat32),

		/** @deprecated */
		convert_s: {
			// @ts-expect-error
			/** @deprecated Use `.convert_i32_s()` instead. */ i32: (...args) => { BinaryenObj.printWarn("`.convert_s.i32()` is deprecated; use `.convert_i32_s()` instead."); return f64(mod).convert_i32_s(...args); },
			// @ts-expect-error
			/** @deprecated Use `.convert_i64_s()` instead. */ i64: (...args) => { BinaryenObj.printWarn("`.convert_s.i64()` is deprecated; use `.convert_i64_s()` instead."); return f64(mod).convert_i64_s(...args); },
		},
		/** @deprecated */
		convert_u: {
			// @ts-expect-error
			/** @deprecated Use `.convert_i32_u()` instead. */ i32: (...args) => { BinaryenObj.printWarn("`.convert_u.i32()` is deprecated; use `.convert_i32_u()` instead."); return f64(mod).convert_i32_u(...args); },
			// @ts-expect-error
			/** @deprecated Use `.convert_i64_u()` instead. */ i64: (...args) => { BinaryenObj.printWarn("`.convert_u.i64()` is deprecated; use `.convert_i64_u()` instead."); return f64(mod).convert_i64_u(...args); },
		},
		// @ts-expect-error
		/** @deprecated Use `.reinterpret_i64()` instead. */ reinterpret(...args) { BinaryenObj.printWarn("`.reinterpret()` is deprecated; use `.reinterpret_i64()` instead."); return this.reinterpret_i64(...args); },
		// @ts-expect-error
		/** @deprecated Use `.promote_f32()` instead. */ promote(...args) { BinaryenObj.printWarn("`.promote()` is deprecated; use `.promote_f32()` instead."); return this.promote_f32(...args); },

		/** @deprecated Use {@link Module#pop} instead. */
		pop() {
			BinaryenObj.printWarn("`.f64.pop()` is deprecated; use `.pop(Type.f64)` instead.");
			return mod.pop(Type.f64);
		},
	} as const;
}
