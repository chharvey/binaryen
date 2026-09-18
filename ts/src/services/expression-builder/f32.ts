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
export function f32(mod: Module) {
	return {
		load: loadFn<ExpressionRef.f32>(mod, Type.f32, 4, true),
		store: storeFn<ExpressionRef.f32>(mod, Type.f32, 4),

		/** Return a static constant f32. */
		const: (value: number): ExpressionRef.f32 => (
			constant(mod, "_BinaryenLiteralFloat32", value)
		),

		const_bits: (value: number): ExpressionRef.f32 => (
			constant(mod, "_BinaryenLiteralFloat32Bits", value)
		),

		abs: unop<ExpressionRef.f32>(mod, Operation.AbsFloat32),
		neg: unop<ExpressionRef.f32>(mod, Operation.NegFloat32),
		sqrt: unop<ExpressionRef.f32>(mod, Operation.SqrtFloat32),
		ceil: unop<ExpressionRef.f32>(mod, Operation.CeilFloat32),
		floor: unop<ExpressionRef.f32>(mod, Operation.FloorFloat32),
		trunc: unop<ExpressionRef.f32>(mod, Operation.TruncFloat32),
		nearest: unop<ExpressionRef.f32>(mod, Operation.NearestFloat32),

		add: binop<ExpressionRef.f32>(mod, Operation.AddFloat32),
		sub: binop<ExpressionRef.f32>(mod, Operation.SubFloat32),
		mul: binop<ExpressionRef.f32>(mod, Operation.MulFloat32),
		div: binop<ExpressionRef.f32>(mod, Operation.DivFloat32),
		min: binop<ExpressionRef.f32>(mod, Operation.MinFloat32),
		max: binop<ExpressionRef.f32>(mod, Operation.MaxFloat32),
		copysign: binop<ExpressionRef.f32>(mod, Operation.CopySignFloat32),

		eq: relop<ExpressionRef.f32>(mod, Operation.EqFloat32),
		ne: relop<ExpressionRef.f32>(mod, Operation.NeFloat32),
		lt: relop<ExpressionRef.f32>(mod, Operation.LtFloat32),
		gt: relop<ExpressionRef.f32>(mod, Operation.GtFloat32),
		le: relop<ExpressionRef.f32>(mod, Operation.LeFloat32),
		ge: relop<ExpressionRef.f32>(mod, Operation.GeFloat32),

		convert_i32_s: unaryFn<ExpressionRef.i32, ExpressionRef.f32>(mod, Operation.ConvertSInt32ToFloat32),
		convert_i32_u: unaryFn<ExpressionRef.i32, ExpressionRef.f32>(mod, Operation.ConvertUInt32ToFloat32),
		convert_i64_s: unaryFn<ExpressionRef.i64, ExpressionRef.f32>(mod, Operation.ConvertSInt64ToFloat32),
		convert_i64_u: unaryFn<ExpressionRef.i64, ExpressionRef.f32>(mod, Operation.ConvertUInt64ToFloat32),
		reinterpret_i32: unaryFn<ExpressionRef.i32, ExpressionRef.f32>(mod, Operation.ReinterpretInt32),

		demote_f64: unaryFn<ExpressionRef.f64, ExpressionRef.f32>(mod, Operation.DemoteFloat64),

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

		/** @deprecated Use {@link Module#pop} instead. */
		pop() {
			BinaryenObj.printWarn("`.f32.pop()` is deprecated; use `.pop(Type.f32)` instead.");
			return mod.pop(Type.f32);
		},
	} as const;
}
