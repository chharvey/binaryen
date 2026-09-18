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
		load: atomicLoadFn(mod, Type.i32, 4),
		load8_u: atomicLoadFn(mod, Type.i32, 1),
		load16_u: atomicLoadFn(mod, Type.i32, 2),

		store: atomicStoreFn(mod, Type.i32, 4),
		store8: atomicStoreFn(mod, Type.i32, 1),
		store16: atomicStoreFn(mod, Type.i32, 2),

		rmw: atomicRmwOps(mod, Type.i32, 4),
		rmw8_u: atomicRmwOps(mod, Type.i32, 1),
		rmw16_u: atomicRmwOps(mod, Type.i32, 2),
	} as const;
}



/**
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#numeric-instructions
 */
export function i32(mod: Module) {
	return {
		load: loadFn<ExpressionRef.i32>(mod, Type.i32, 4, true),
		load8_s: loadFn<ExpressionRef.i32>(mod, Type.i32, 1, true),
		load8_u: loadFn<ExpressionRef.i32>(mod, Type.i32, 1, false),
		load16_s: loadFn<ExpressionRef.i32>(mod, Type.i32, 2, true),
		load16_u: loadFn<ExpressionRef.i32>(mod, Type.i32, 2, false),

		store: storeFn<ExpressionRef.i32>(mod, Type.i32, 4),
		store8: storeFn<ExpressionRef.i32>(mod, Type.i32, 1),
		store16: storeFn<ExpressionRef.i32>(mod, Type.i32, 2),

		/** Return a static constant i32. */
		const: (value: number): ExpressionRef.i32 => (
			constant(mod, "_BinaryenLiteralInt32", value)
		),

		clz: unop<ExpressionRef.i32>(mod, Operation.ClzInt32),
		ctz: unop<ExpressionRef.i32>(mod, Operation.CtzInt32),
		popcnt: unop<ExpressionRef.i32>(mod, Operation.PopcntInt32),
		extend8_s: unop<ExpressionRef.i32>(mod, Operation.ExtendS8Int32),
		extend16_s: unop<ExpressionRef.i32>(mod, Operation.ExtendS16Int32),

		add: binop<ExpressionRef.i32>(mod, Operation.AddInt32),
		sub: binop<ExpressionRef.i32>(mod, Operation.SubInt32),
		mul: binop<ExpressionRef.i32>(mod, Operation.MulInt32),
		div_s: binop<ExpressionRef.i32>(mod, Operation.DivSInt32),
		div_u: binop<ExpressionRef.i32>(mod, Operation.DivUInt32),
		rem_s: binop<ExpressionRef.i32>(mod, Operation.RemSInt32),
		rem_u: binop<ExpressionRef.i32>(mod, Operation.RemUInt32),

		and: binop<ExpressionRef.i32>(mod, Operation.AndInt32),
		or: binop<ExpressionRef.i32>(mod, Operation.OrInt32),
		xor: binop<ExpressionRef.i32>(mod, Operation.XorInt32),
		shl: binop<ExpressionRef.i32>(mod, Operation.ShlInt32),
		shr_s: binop<ExpressionRef.i32>(mod, Operation.ShrSInt32),
		shr_u: binop<ExpressionRef.i32>(mod, Operation.ShrUInt32),
		rotl: binop<ExpressionRef.i32>(mod, Operation.RotLInt32),
		rotr: binop<ExpressionRef.i32>(mod, Operation.RotRInt32),

		eqz: testop<ExpressionRef.i32>(mod, Operation.EqZInt32),

		eq: relop<ExpressionRef.i32>(mod, Operation.EqInt32),
		ne: relop<ExpressionRef.i32>(mod, Operation.NeInt32),
		lt_s: relop<ExpressionRef.i32>(mod, Operation.LtSInt32),
		lt_u: relop<ExpressionRef.i32>(mod, Operation.LtUInt32),
		gt_s: relop<ExpressionRef.i32>(mod, Operation.GtSInt32),
		gt_u: relop<ExpressionRef.i32>(mod, Operation.GtUInt32),
		le_s: relop<ExpressionRef.i32>(mod, Operation.LeSInt32),
		le_u: relop<ExpressionRef.i32>(mod, Operation.LeUInt32),
		ge_s: relop<ExpressionRef.i32>(mod, Operation.GeSInt32),
		ge_u: relop<ExpressionRef.i32>(mod, Operation.GeUInt32),

		wrap_i64: unaryFn<ExpressionRef.i64, ExpressionRef.i32>(mod, Operation.WrapInt64),

		trunc_f32_s: unaryFn<ExpressionRef.f32, ExpressionRef.i32>(mod, Operation.TruncSFloat32ToInt32),
		trunc_f32_u: unaryFn<ExpressionRef.f32, ExpressionRef.i32>(mod, Operation.TruncUFloat32ToInt32),
		trunc_f64_s: unaryFn<ExpressionRef.f64, ExpressionRef.i32>(mod, Operation.TruncSFloat64ToInt32),
		trunc_f64_u: unaryFn<ExpressionRef.f64, ExpressionRef.i32>(mod, Operation.TruncUFloat64ToInt32),
		trunc_sat_f32_s: unaryFn<ExpressionRef.f32, ExpressionRef.i32>(mod, Operation.TruncSatSFloat32ToInt32),
		trunc_sat_f32_u: unaryFn<ExpressionRef.f32, ExpressionRef.i32>(mod, Operation.TruncSatUFloat32ToInt32),
		trunc_sat_f64_s: unaryFn<ExpressionRef.f64, ExpressionRef.i32>(mod, Operation.TruncSatSFloat64ToInt32),
		trunc_sat_f64_u: unaryFn<ExpressionRef.f64, ExpressionRef.i32>(mod, Operation.TruncSatUFloat64ToInt32),
		reinterpret_f32: unaryFn<ExpressionRef.f32, ExpressionRef.i32>(mod, Operation.ReinterpretFloat32),

		/** @experimental */
		atomic: atomic(mod),

		// @ts-expect-error
		/** @deprecated Use `.wrap_i64()` instead. */ wrap(...args) { BinaryenObj.printWarn("`.wrap()` is deprecated; use `.wrap_i64()` instead."); return this.wrap_i64(...args); },
		/** @deprecated */
		trunc_s: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_f32_s()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_s.f32()` is deprecated; use `.trunc_f32_s()` instead."); return i32(mod).trunc_f32_s(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_f64_s()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_s.f64()` is deprecated; use `.trunc_f64_s()` instead."); return i32(mod).trunc_f64_s(...args); },
		},
		/** @deprecated */
		trunc_u: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_f32_u()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_u.f32()` is deprecated; use `.trunc_f32_u()` instead."); return i32(mod).trunc_f32_u(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_f64_u()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_u.f64()` is deprecated; use `.trunc_f64_u()` instead."); return i32(mod).trunc_f64_u(...args); },
		},
		/** @deprecated */
		trunc_s_sat: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f32_s()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_s_sat.f32()` is deprecated; use `.trunc_sat_f32_s()` instead."); return i32(mod).trunc_sat_f32_s(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f64_s()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_s_sat.f64()` is deprecated; use `.trunc_sat_f64_s()` instead."); return i32(mod).trunc_sat_f64_s(...args); },
		},
		/** @deprecated */
		trunc_u_sat: {
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f32_u()` instead. */ f32: (...args) => { BinaryenObj.printWarn("`.trunc_u_sat.f32()` is deprecated; use `.trunc_sat_f32_u()` instead."); return i32(mod).trunc_sat_f32_u(...args); },
			// @ts-expect-error
			/** @deprecated Use `.trunc_sat_f64_u()` instead. */ f64: (...args) => { BinaryenObj.printWarn("`.trunc_u_sat.f64()` is deprecated; use `.trunc_sat_f64_u()` instead."); return i32(mod).trunc_sat_f64_u(...args); },
		},
		// @ts-expect-error
		/** @deprecated Use `.reinterpret_f32()` instead. */ reinterpret(...args) { BinaryenObj.printWarn("`.reinterpret()` is deprecated; use `.reinterpret_f32()` instead."); return this.reinterpret_f32(...args); },

		/** @deprecated Use {@link Module#pop} instead. */
		pop() {
			BinaryenObj.printWarn("`.i32.pop()` is deprecated; use `.pop(Type.i32)` instead.");
			return mod.pop(Type.i32);
		},
	} as const;
}
