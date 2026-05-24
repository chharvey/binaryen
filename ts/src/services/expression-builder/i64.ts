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
	type f32,
	type f64,
	type i32,
	i64 as i64_t,
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
		load: atomicLoadFn(mod, i64_t, 8),
		load8_u: atomicLoadFn(mod, i64_t, 1),
		load16_u: atomicLoadFn(mod, i64_t, 2),
		load32_u: atomicLoadFn(mod, i64_t, 4),

		store: atomicStoreFn(mod, i64_t, 8),
		store8: atomicStoreFn(mod, i64_t, 1),
		store16: atomicStoreFn(mod, i64_t, 2),
		store32: atomicStoreFn(mod, i64_t, 4),

		rmw: atomicRmwOps(mod, i64_t, 8),
		rmw8_u: atomicRmwOps(mod, i64_t, 1),
		rmw16_u: atomicRmwOps(mod, i64_t, 2),
		rmw32_u: atomicRmwOps(mod, i64_t, 4),
	} as const;
}



/**
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#numeric-instructions
 */
export function i64(mod: Module) {
	return {
		load: loadFn<i64_t>(mod, i64_t, 8, true),
		load8_s: loadFn<i64_t>(mod, i64_t, 1, true),
		load8_u: loadFn<i64_t>(mod, i64_t, 1, false),
		load16_s: loadFn<i64_t>(mod, i64_t, 2, true),
		load16_u: loadFn<i64_t>(mod, i64_t, 2, false),
		load32_s: loadFn<i64_t>(mod, i64_t, 4, true),
		load32_u: loadFn<i64_t>(mod, i64_t, 4, false),

		store: storeFn<i64_t>(mod, i64_t, 8),
		store8: storeFn<i64_t>(mod, i64_t, 1),
		store16: storeFn<i64_t>(mod, i64_t, 2),
		store32: storeFn<i64_t>(mod, i64_t, 4),

		/** Return a static constant i64. */
		const: (value: number | bigint): i64_t => (
			constant(mod, "_BinaryenLiteralInt64", BigInt(value))
		),

		clz: unop<i64_t>(mod, Operation.ClzInt64),
		ctz: unop<i64_t>(mod, Operation.CtzInt64),
		popcnt: unop<i64_t>(mod, Operation.PopcntInt64),
		extend8_s: unop<i64_t>(mod, Operation.ExtendS8Int64),
		extend16_s: unop<i64_t>(mod, Operation.ExtendS16Int64),
		extend32_s: unop<i64_t>(mod, Operation.ExtendS32Int64),

		add: binop<i64_t>(mod, Operation.AddInt64),
		sub: binop<i64_t>(mod, Operation.SubInt64),
		mul: binop<i64_t>(mod, Operation.MulInt64),
		div_s: binop<i64_t>(mod, Operation.DivSInt64),
		div_u: binop<i64_t>(mod, Operation.DivUInt64),
		rem_s: binop<i64_t>(mod, Operation.RemSInt64),
		rem_u: binop<i64_t>(mod, Operation.RemUInt64),

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

		and: binop<i64_t>(mod, Operation.AndInt64),
		or: binop<i64_t>(mod, Operation.OrInt64),
		xor: binop<i64_t>(mod, Operation.XorInt64),
		shl: binop<i64_t>(mod, Operation.ShlInt64),
		shr_s: binop<i64_t>(mod, Operation.ShrSInt64),
		shr_u: binop<i64_t>(mod, Operation.ShrUInt64),
		rotl: binop<i64_t>(mod, Operation.RotLInt64),
		rotr: binop<i64_t>(mod, Operation.RotRInt64),

		eqz: testop<i64_t>(mod, Operation.EqZInt64),

		eq: relop<i64_t>(mod, Operation.EqInt64),
		ne: relop<i64_t>(mod, Operation.NeInt64),
		lt_s: relop<i64_t>(mod, Operation.LtSInt64),
		lt_u: relop<i64_t>(mod, Operation.LtUInt64),
		gt_s: relop<i64_t>(mod, Operation.GtSInt64),
		gt_u: relop<i64_t>(mod, Operation.GtUInt64),
		le_s: relop<i64_t>(mod, Operation.LeSInt64),
		le_u: relop<i64_t>(mod, Operation.LeUInt64),
		ge_s: relop<i64_t>(mod, Operation.GeSInt64),
		ge_u: relop<i64_t>(mod, Operation.GeUInt64),

		extend_i32_s: unaryFn<i32, i64_t>(mod, Operation.ExtendSInt32),
		extend_i32_u: unaryFn<i32, i64_t>(mod, Operation.ExtendUInt32),

		trunc_f32_s: unaryFn<f32, i64_t>(mod, Operation.TruncSFloat32ToInt64),
		trunc_f32_u: unaryFn<f32, i64_t>(mod, Operation.TruncUFloat32ToInt64),
		trunc_f64_s: unaryFn<f64, i64_t>(mod, Operation.TruncSFloat64ToInt64),
		trunc_f64_u: unaryFn<f64, i64_t>(mod, Operation.TruncUFloat64ToInt64),
		trunc_sat_f32_s: unaryFn<f32, i64_t>(mod, Operation.TruncSatSFloat32ToInt64),
		trunc_sat_f32_u: unaryFn<f32, i64_t>(mod, Operation.TruncSatUFloat32ToInt64),
		trunc_sat_f64_s: unaryFn<f64, i64_t>(mod, Operation.TruncSatSFloat64ToInt64),
		trunc_sat_f64_u: unaryFn<f64, i64_t>(mod, Operation.TruncSatUFloat64ToInt64),
		reinterpret_f64: unaryFn<f64, i64_t>(mod, Operation.ReinterpretFloat64),

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
	} as const;
}
