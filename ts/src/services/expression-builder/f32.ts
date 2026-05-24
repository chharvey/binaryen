import {
	BinaryenObj,
} from "../../-pre.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	f32 as f32_t,
	type f64,
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
export function f32(mod: Module) {
	return {
		load: loadFn<f32_t>(mod, f32_t, 4, true),
		store: storeFn<f32_t>(mod, f32_t, 4),

		/** Return a static constant f32. */
		const: (value: number): f32_t => (
			constant(mod, "_BinaryenLiteralFloat32", value)
		),

		const_bits: (value: number): f32_t => (
			constant(mod, "_BinaryenLiteralFloat32Bits", value)
		),

		abs: unop<f32_t>(mod, Operation.AbsFloat32),
		neg: unop<f32_t>(mod, Operation.NegFloat32),
		sqrt: unop<f32_t>(mod, Operation.SqrtFloat32),
		ceil: unop<f32_t>(mod, Operation.CeilFloat32),
		floor: unop<f32_t>(mod, Operation.FloorFloat32),
		trunc: unop<f32_t>(mod, Operation.TruncFloat32),
		nearest: unop<f32_t>(mod, Operation.NearestFloat32),

		add: binop<f32_t>(mod, Operation.AddFloat32),
		sub: binop<f32_t>(mod, Operation.SubFloat32),
		mul: binop<f32_t>(mod, Operation.MulFloat32),
		div: binop<f32_t>(mod, Operation.DivFloat32),
		min: binop<f32_t>(mod, Operation.MinFloat32),
		max: binop<f32_t>(mod, Operation.MaxFloat32),
		copysign: binop<f32_t>(mod, Operation.CopySignFloat32),

		eq: relop<f32_t>(mod, Operation.EqFloat32),
		ne: relop<f32_t>(mod, Operation.NeFloat32),
		lt: relop<f32_t>(mod, Operation.LtFloat32),
		gt: relop<f32_t>(mod, Operation.GtFloat32),
		le: relop<f32_t>(mod, Operation.LeFloat32),
		ge: relop<f32_t>(mod, Operation.GeFloat32),

		convert_i32_s: unaryFn<i32, f32_t>(mod, Operation.ConvertSInt32ToFloat32),
		convert_i32_u: unaryFn<i32, f32_t>(mod, Operation.ConvertUInt32ToFloat32),
		convert_i64_s: unaryFn<i64, f32_t>(mod, Operation.ConvertSInt64ToFloat32),
		convert_i64_u: unaryFn<i64, f32_t>(mod, Operation.ConvertUInt64ToFloat32),
		reinterpret_i32: unaryFn<i32, f32_t>(mod, Operation.ReinterpretInt32),

		demote_f64: unaryFn<f64, f32_t>(mod, Operation.DemoteFloat64),

		/** @deprecated */
		convert_s: {
			// @ts-expect-error
			/** @deprecated Use `.convert_i32_s()` instead. */ i32: (...args) => { BinaryenObj.printWarn("`.convert_s.i32()` is deprecated; use `.convert_i32_s()` instead."); return f32(mod).convert_i32_s(...args); },
			// @ts-expect-error
			/** @deprecated Use `.convert_i64_s()` instead. */ i64: (...args) => { BinaryenObj.printWarn("`.convert_s.i64()` is deprecated; use `.convert_i64_s()` instead."); return f32(mod).convert_i64_s(...args); },
		},
		/** @deprecated */
		convert_u: {
			// @ts-expect-error
			/** @deprecated Use `.convert_i32_u()` instead. */ i32: (...args) => { BinaryenObj.printWarn("`.convert_u.i32()` is deprecated; use `.convert_i32_u()` instead."); return f32(mod).convert_i32_u(...args); },
			// @ts-expect-error
			/** @deprecated Use `.convert_i64_u()` instead. */ i64: (...args) => { BinaryenObj.printWarn("`.convert_u.i64()` is deprecated; use `.convert_i64_u()` instead."); return f32(mod).convert_i64_u(...args); },
		},
		// @ts-expect-error
		/** @deprecated Use `.reinterpret_i32()` instead. */ reinterpret(...args) { BinaryenObj.printWarn("`.reinterpret()` is deprecated; use `.reinterpret_i32()` instead."); return this.reinterpret_i32(...args); },
		// @ts-expect-error
		/** @deprecated Use `.demote_f64()` instead. */ demote(...args) { BinaryenObj.printWarn("`.demote()` is deprecated; use `.demote_f64()` instead."); return this.demote_f64(...args); },
	} as const;
}
