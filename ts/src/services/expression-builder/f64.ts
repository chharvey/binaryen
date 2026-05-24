import {
	BinaryenObj,
} from "../../-pre.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	type f32,
	f64 as f64_t,
	type i32,
	type i64,
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
		load: loadFn(mod, f64_t, 8, true),
		store: storeFn(mod, f64_t, 8),

		/** Return a static constant f64. */
		const: (value: number): f64_t => (
			constant(mod, "_BinaryenLiteralFloat64", value)
		),

		const_bits: (value: number | bigint): f64_t => (
			constant(mod, "_BinaryenLiteralFloat64Bits", BigInt(value))
		),

		abs: unop<f64_t>(mod, Operation.AbsFloat64),
		neg: unop<f64_t>(mod, Operation.NegFloat64),
		sqrt: unop<f64_t>(mod, Operation.SqrtFloat64),
		ceil: unop<f64_t>(mod, Operation.CeilFloat64),
		floor: unop<f64_t>(mod, Operation.FloorFloat64),
		trunc: unop<f64_t>(mod, Operation.TruncFloat64),
		nearest: unop<f64_t>(mod, Operation.NearestFloat64),

		add: binop<f64_t>(mod, Operation.AddFloat64),
		sub: binop<f64_t>(mod, Operation.SubFloat64),
		mul: binop<f64_t>(mod, Operation.MulFloat64),
		div: binop<f64_t>(mod, Operation.DivFloat64),
		min: binop<f64_t>(mod, Operation.MinFloat64),
		max: binop<f64_t>(mod, Operation.MaxFloat64),
		copysign: binop<f64_t>(mod, Operation.CopySignFloat64),

		eq: relop<f64_t>(mod, Operation.EqFloat64),
		ne: relop<f64_t>(mod, Operation.NeFloat64),
		lt: relop<f64_t>(mod, Operation.LtFloat64),
		gt: relop<f64_t>(mod, Operation.GtFloat64),
		le: relop<f64_t>(mod, Operation.LeFloat64),
		ge: relop<f64_t>(mod, Operation.GeFloat64),

		convert_i32_s: unaryFn<i32, f64_t>(mod, Operation.ConvertSInt32ToFloat64),
		convert_i32_u: unaryFn<i32, f64_t>(mod, Operation.ConvertUInt32ToFloat64),
		convert_i64_s: unaryFn<i64, f64_t>(mod, Operation.ConvertSInt64ToFloat64),
		convert_i64_u: unaryFn<i64, f64_t>(mod, Operation.ConvertUInt64ToFloat64),
		reinterpret_i64: unaryFn<i64, f64_t>(mod, Operation.ReinterpretInt64),

		promote_f32: unaryFn<f32, f64_t>(mod, Operation.PromoteFloat32),

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
	} as const;
}
