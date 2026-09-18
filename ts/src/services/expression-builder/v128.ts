import {
	BinaryenObj,
} from "../../-pre.ts";
import {
	PTR,
	i8sToStack,
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
	binop,
	constant,
	loadFn,
	simdLoadFn,
	simdLoadStoreLaneFn,
	storeFn,
	testop,
	unop,
} from "./-utils.ts";



/**
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions
 * @see https://webassembly.github.io/spec/core/syntax/instructions.html#vector-instructions
 */
export function v128(mod: Module) {
	return {
		load: loadFn<ExpressionRef.v128>(mod, Type.v128, 16, false),
		load8x8_s: simdLoadFn(mod, Operation.Load8x8SVec128),
		load8x8_u: simdLoadFn(mod, Operation.Load8x8UVec128),
		load16x4_s: simdLoadFn(mod, Operation.Load16x4SVec128),
		load16x4_u: simdLoadFn(mod, Operation.Load16x4UVec128),
		load32x2_s: simdLoadFn(mod, Operation.Load32x2SVec128),
		load32x2_u: simdLoadFn(mod, Operation.Load32x2UVec128),
		load8_splat: simdLoadFn(mod, Operation.Load8SplatVec128),
		load16_splat: simdLoadFn(mod, Operation.Load16SplatVec128),
		load32_splat: simdLoadFn(mod, Operation.Load32SplatVec128),
		load64_splat: simdLoadFn(mod, Operation.Load64SplatVec128),
		load32_zero: simdLoadFn(mod, Operation.Load32ZeroVec128),
		load64_zero: simdLoadFn(mod, Operation.Load64ZeroVec128),
		load8_lane: simdLoadStoreLaneFn<ExpressionRef.v128>(mod, Operation.Load8LaneVec128),
		load16_lane: simdLoadStoreLaneFn<ExpressionRef.v128>(mod, Operation.Load16LaneVec128),
		load32_lane: simdLoadStoreLaneFn<ExpressionRef.v128>(mod, Operation.Load32LaneVec128),
		load64_lane: simdLoadStoreLaneFn<ExpressionRef.v128>(mod, Operation.Load64LaneVec128),

		store: storeFn<ExpressionRef.v128>(mod, Type.v128, 16),
		store8_lane: simdLoadStoreLaneFn<ExpressionRef.none>(mod, Operation.Store8LaneVec128),
		store16_lane: simdLoadStoreLaneFn<ExpressionRef.none>(mod, Operation.Store16LaneVec128),
		store32_lane: simdLoadStoreLaneFn<ExpressionRef.none>(mod, Operation.Store32LaneVec128),
		store64_lane: simdLoadStoreLaneFn<ExpressionRef.none>(mod, Operation.Store64LaneVec128),

		/** Return a static constant v128. */
		const: (i8s: readonly number[]): ExpressionRef.v128 => (
			constant(mod, "_BinaryenLiteralVec128", i8sToStack(i8s))
		),

		not: unop<ExpressionRef.v128>(mod, Operation.NotVec128),

		and: binop<ExpressionRef.v128>(mod, Operation.AndVec128),
		andnot: binop<ExpressionRef.v128>(mod, Operation.AndNotVec128),
		or: binop<ExpressionRef.v128>(mod, Operation.OrVec128),
		xor: binop<ExpressionRef.v128>(mod, Operation.XorVec128),

		bitselect: (left: ExpressionRef.v128, right: ExpressionRef.v128, cond: ExpressionRef.v128): ExpressionRef.v128 => (
			BinaryenObj["_BinaryenSIMDTernary"](mod[PTR], Operation.BitselectVec128, left, right, cond) as ExpressionRef.v128
		),

		anytrue: testop<ExpressionRef.v128>(mod, Operation.AnyTrueVec128),

		/** @deprecated Use {@link Module#pop} instead. */
		pop() {
			BinaryenObj.printWarn("`.v128.pop()` is deprecated; use `.pop(Type.v128)` instead.");
			return mod.pop(Type.v128);
		},
	} as const;
}
