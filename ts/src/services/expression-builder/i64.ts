import {
	BinaryenObj,
} from "../../-pre.ts";
import {
	PTR,
} from "../../-utils.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	type ExpressionRef,
	Operation,
	Type,
} from "../../constants.ts";
import {
	atomicLoadFn,
	atomicRmwOps,
	atomicStoreFn,
	binop,
	constant,
	loadFn,
	relop,
	storeFn,
	testop,
	unaryFn,
	unop,
} from "./-utils.ts";



function atomic(mod: Module) {
	return {
		load: atomicLoadFn(mod, Type.i64, 8),
		load8_u: atomicLoadFn(mod, Type.i64, 1),
		load16_u: atomicLoadFn(mod, Type.i64, 2),
		load32_u: atomicLoadFn(mod, Type.i64, 4),

		store: atomicStoreFn(mod, Type.i64, 8),
		store8: atomicStoreFn(mod, Type.i64, 1),
		store16: atomicStoreFn(mod, Type.i64, 2),
		store32: atomicStoreFn(mod, Type.i64, 4),

		rmw: atomicRmwOps(mod, Type.i64, 8),
		rmw8_u: atomicRmwOps(mod, Type.i64, 1),
		rmw16_u: atomicRmwOps(mod, Type.i64, 2),
		rmw32_u: atomicRmwOps(mod, Type.i64, 4),
	} as const;
}



/**
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#numeric-instructions
 */
export function i64(mod: Module) {
	return {
		load: loadFn<ExpressionRef.i64>(mod, Type.i64, 8, true),
		load8_s: loadFn<ExpressionRef.i64>(mod, Type.i64, 1, true),
		load8_u: loadFn<ExpressionRef.i64>(mod, Type.i64, 1, false),
		load16_s: loadFn<ExpressionRef.i64>(mod, Type.i64, 2, true),
		load16_u: loadFn<ExpressionRef.i64>(mod, Type.i64, 2, false),
		load32_s: loadFn<ExpressionRef.i64>(mod, Type.i64, 4, true),
		load32_u: loadFn<ExpressionRef.i64>(mod, Type.i64, 4, false),

		store: storeFn<ExpressionRef.i64>(mod, Type.i64, 8),
		store8: storeFn<ExpressionRef.i64>(mod, Type.i64, 1),
		store16: storeFn<ExpressionRef.i64>(mod, Type.i64, 2),
		store32: storeFn<ExpressionRef.i64>(mod, Type.i64, 4),

		/** Return a static constant i64. */
		const: (value: number | bigint): ExpressionRef.i64 => (
			constant(mod, "_BinaryenLiteralInt64", BigInt(value))
		),

		clz: unop<ExpressionRef.i64>(mod, Operation.ClzInt64),
		ctz: unop<ExpressionRef.i64>(mod, Operation.CtzInt64),
		popcnt: unop<ExpressionRef.i64>(mod, Operation.PopcntInt64),
		extend8_s: unop<ExpressionRef.i64>(mod, Operation.ExtendS8Int64),
		extend16_s: unop<ExpressionRef.i64>(mod, Operation.ExtendS16Int64),
		extend32_s: unop<ExpressionRef.i64>(mod, Operation.ExtendS32Int64),

		add: binop<ExpressionRef.i64>(mod, Operation.AddInt64),
		sub: binop<ExpressionRef.i64>(mod, Operation.SubInt64),
		mul: binop<ExpressionRef.i64>(mod, Operation.MulInt64),
		div_s: binop<ExpressionRef.i64>(mod, Operation.DivSInt64),
		div_u: binop<ExpressionRef.i64>(mod, Operation.DivUInt64),
		rem_s: binop<ExpressionRef.i64>(mod, Operation.RemSInt64),
		rem_u: binop<ExpressionRef.i64>(mod, Operation.RemUInt64),

		add128: (leftLow: ExpressionRef, leftHigh: ExpressionRef, rightLow: ExpressionRef, rightHigh: ExpressionRef): ExpressionRef => (
			BinaryenObj["_BinaryenWideIntAddSub"](mod[PTR], Operation.AddInt128, leftLow, leftHigh, rightLow, rightHigh) as ExpressionRef
		),

		sub128: (leftLow: ExpressionRef, leftHigh: ExpressionRef, rightLow: ExpressionRef, rightHigh: ExpressionRef): ExpressionRef => (
			BinaryenObj["_BinaryenWideIntAddSub"](mod[PTR], Operation.SubInt128, leftLow, leftHigh, rightLow, rightHigh) as ExpressionRef
		),

		mul_wide_s: (left: ExpressionRef, right: ExpressionRef): ExpressionRef => (
			BinaryenObj["_BinaryenWideIntMul"](mod[PTR], Operation.MulWideSInt64, left, right) as ExpressionRef
		),

		mul_wide_u: (left: ExpressionRef, right: ExpressionRef): ExpressionRef => (
			BinaryenObj["_BinaryenWideIntMul"](mod[PTR], Operation.MulWideUInt64, left, right) as ExpressionRef
		),

		and: binop<ExpressionRef.i64>(mod, Operation.AndInt64),
		or: binop<ExpressionRef.i64>(mod, Operation.OrInt64),
		xor: binop<ExpressionRef.i64>(mod, Operation.XorInt64),
		shl: binop<ExpressionRef.i64>(mod, Operation.ShlInt64),
		shr_s: binop<ExpressionRef.i64>(mod, Operation.ShrSInt64),
		shr_u: binop<ExpressionRef.i64>(mod, Operation.ShrUInt64),
		rotl: binop<ExpressionRef.i64>(mod, Operation.RotLInt64),
		rotr: binop<ExpressionRef.i64>(mod, Operation.RotRInt64),

		eqz: testop<ExpressionRef.i64>(mod, Operation.EqZInt64),

		eq: relop<ExpressionRef.i64>(mod, Operation.EqInt64),
		ne: relop<ExpressionRef.i64>(mod, Operation.NeInt64),
		lt_s: relop<ExpressionRef.i64>(mod, Operation.LtSInt64),
		lt_u: relop<ExpressionRef.i64>(mod, Operation.LtUInt64),
		gt_s: relop<ExpressionRef.i64>(mod, Operation.GtSInt64),
		gt_u: relop<ExpressionRef.i64>(mod, Operation.GtUInt64),
		le_s: relop<ExpressionRef.i64>(mod, Operation.LeSInt64),
		le_u: relop<ExpressionRef.i64>(mod, Operation.LeUInt64),
		ge_s: relop<ExpressionRef.i64>(mod, Operation.GeSInt64),
		ge_u: relop<ExpressionRef.i64>(mod, Operation.GeUInt64),

		extend_i32_s: unaryFn<ExpressionRef.i32, ExpressionRef.i64>(mod, Operation.ExtendSInt32),
		extend_i32_u: unaryFn<ExpressionRef.i32, ExpressionRef.i64>(mod, Operation.ExtendUInt32),

		trunc_f32_s: unaryFn<ExpressionRef.f32, ExpressionRef.i64>(mod, Operation.TruncSFloat32ToInt64),
		trunc_f32_u: unaryFn<ExpressionRef.f32, ExpressionRef.i64>(mod, Operation.TruncUFloat32ToInt64),
		trunc_f64_s: unaryFn<ExpressionRef.f64, ExpressionRef.i64>(mod, Operation.TruncSFloat64ToInt64),
		trunc_f64_u: unaryFn<ExpressionRef.f64, ExpressionRef.i64>(mod, Operation.TruncUFloat64ToInt64),
		trunc_sat_f32_s: unaryFn<ExpressionRef.f32, ExpressionRef.i64>(mod, Operation.TruncSatSFloat32ToInt64),
		trunc_sat_f32_u: unaryFn<ExpressionRef.f32, ExpressionRef.i64>(mod, Operation.TruncSatUFloat32ToInt64),
		trunc_sat_f64_s: unaryFn<ExpressionRef.f64, ExpressionRef.i64>(mod, Operation.TruncSatSFloat64ToInt64),
		trunc_sat_f64_u: unaryFn<ExpressionRef.f64, ExpressionRef.i64>(mod, Operation.TruncSatUFloat64ToInt64),
		reinterpret_f64: unaryFn<ExpressionRef.f64, ExpressionRef.i64>(mod, Operation.ReinterpretFloat64),

		/** @experimental */
		atomic: atomic(mod),

		// @ts-expect-error
		/** @deprecated Use `.extend_i32_s()` instead. */ extend_s(...args) { BinaryenObj.printWarn("`.extend_s()` is deprecated; use `.extend_i32_s()` instead."); return this.extend_i32_s(...args); },
		// @ts-expect-error
		/** @deprecated Use `.extend_i32_u()` instead. */ extend_u(...args) { BinaryenObj.printWarn("`.extend_u()` is deprecated; use `.extend_i32_u()` instead."); return this.extend_i32_u(...args); },
		/** @deprecated */
		trunc_s: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_f32_s()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_s.f32()` is deprecated; use `.trunc_f32_s()` instead."); return i64(mod).trunc_f32_s(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_f64_s()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_s.f64()` is deprecated; use `.trunc_f64_s()` instead."); return i64(mod).trunc_f64_s(...args); },
		},
		/** @deprecated */
		trunc_u: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_f32_u()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_u.f32()` is deprecated; use `.trunc_f32_u()` instead."); return i64(mod).trunc_f32_u(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_f64_u()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_u.f64()` is deprecated; use `.trunc_f64_u()` instead."); return i64(mod).trunc_f64_u(...args); },
		},
		/** @deprecated */
		trunc_s_sat: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f32_s()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_s_sat.f32()` is deprecated; use `.trunc_sat_f32_s()` instead."); return i64(mod).trunc_sat_f32_s(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f64_s()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_s_sat.f64()` is deprecated; use `.trunc_sat_f64_s()` instead."); return i64(mod).trunc_sat_f64_s(...args); },
		},
		/** @deprecated */
		trunc_u_sat: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f32_u()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_u_sat.f32()` is deprecated; use `.trunc_sat_f32_u()` instead."); return i64(mod).trunc_sat_f32_u(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f64_u()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_u_sat.f64()` is deprecated; use `.trunc_sat_f64_u()` instead."); return i64(mod).trunc_sat_f64_u(...args); },
		},
		// @ts-expect-error
		/** @deprecated Use `.reinterpret_f64()` instead. */ reinterpret(...args) { BinaryenObj.printWarn("`.reinterpret()` is deprecated; use `.reinterpret_f64()` instead."); return this.reinterpret_f64(...args); },

		/** @deprecated Use {@link Module#pop} instead. */
		pop() {
			BinaryenObj.printWarn("`.i64.pop()` is deprecated; use `.pop(Type.i64)` instead.");
			return mod.pop(Type.i64);
		},
	} as const;
}
