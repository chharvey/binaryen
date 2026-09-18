import {
	BinaryenObj,
} from "../../-pre.ts";
import {
	PTR,
	i8sToStack,
	preserveStack,
} from "../../-utils.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	type ExpressionRef,
	Operation,
} from "../../constants.ts";
import {
	binaryFn,
	binop,
	bitmask,
	narrow,
	relop,
	simdExtractFn,
	simdReplaceFn,
	simdShiftFn,
	splat,
	testop,
	unop,
} from "./-utils.ts";



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#vector-instructions */
export function i8x16(mod: Module) {
	return {
		abs: unop<ExpressionRef.v128>(mod, Operation.AbsVecI8x16),
		neg: unop<ExpressionRef.v128>(mod, Operation.NegVecI8x16),
		popcnt: unop<ExpressionRef.v128>(mod, Operation.PopcntVecI8x16),

		add: binop<ExpressionRef.v128>(mod, Operation.AddVecI8x16),
		sub: binop<ExpressionRef.v128>(mod, Operation.SubVecI8x16),
		add_sat_s: binop<ExpressionRef.v128>(mod, Operation.AddSatSVecI8x16),
		add_sat_u: binop<ExpressionRef.v128>(mod, Operation.AddSatUVecI8x16),
		sub_sat_s: binop<ExpressionRef.v128>(mod, Operation.SubSatSVecI8x16),
		sub_sat_u: binop<ExpressionRef.v128>(mod, Operation.SubSatUVecI8x16),
		avgr_u: binop<ExpressionRef.v128>(mod, Operation.AvgrUVecI8x16),
		min_s: binop<ExpressionRef.v128>(mod, Operation.MinSVecI8x16),
		min_u: binop<ExpressionRef.v128>(mod, Operation.MinUVecI8x16),
		max_s: binop<ExpressionRef.v128>(mod, Operation.MaxSVecI8x16),
		max_u: binop<ExpressionRef.v128>(mod, Operation.MaxUVecI8x16),

		// TODO: relaxed_laneselect

		all_true: testop<ExpressionRef.v128>(mod, Operation.AllTrueVecI8x16),

		eq: relop<ExpressionRef.v128>(mod, Operation.EqVecI8x16),
		ne: relop<ExpressionRef.v128>(mod, Operation.NeVecI8x16),
		lt_s: relop<ExpressionRef.v128>(mod, Operation.LtSVecI8x16),
		lt_u: relop<ExpressionRef.v128>(mod, Operation.LtUVecI8x16),
		gt_s: relop<ExpressionRef.v128>(mod, Operation.GtSVecI8x16),
		gt_u: relop<ExpressionRef.v128>(mod, Operation.GtUVecI8x16),
		le_s: relop<ExpressionRef.v128>(mod, Operation.LeSVecI8x16),
		le_u: relop<ExpressionRef.v128>(mod, Operation.LeUVecI8x16),
		ge_s: relop<ExpressionRef.v128>(mod, Operation.GeSVecI8x16),
		ge_u: relop<ExpressionRef.v128>(mod, Operation.GeUVecI8x16),

		shl: simdShiftFn(mod, Operation.ShlVecI8x16),
		shr_s: simdShiftFn(mod, Operation.ShrSVecI8x16),
		shr_u: simdShiftFn(mod, Operation.ShrUVecI8x16),

		bitmask: bitmask(mod, Operation.BitmaskVecI8x16),

		swizzle: binaryFn<ExpressionRef.v128, ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.SwizzleVecI8x16),
		// TODO: relaxed_swizzle

		shuffle: (left: ExpressionRef.v128, right: ExpressionRef.v128, mask: readonly number[]): ExpressionRef.v128 => (
			preserveStack(() => BinaryenObj["_BinaryenSIMDShuffle"](mod[PTR], left, right, i8sToStack(mask)) as ExpressionRef.v128)
		),

		narrow_i16x8_s: narrow(mod, Operation.NarrowSVecI16x8ToVecI8x16),
		narrow_i16x8_u: narrow(mod, Operation.NarrowUVecI16x8ToVecI8x16),

		splat: splat<ExpressionRef.i32>(mod, Operation.SplatVecI8x16),
		extract_lane_s: simdExtractFn<ExpressionRef.i32>(mod, Operation.ExtractLaneSVecI8x16),
		extract_lane_u: simdExtractFn<ExpressionRef.i32>(mod, Operation.ExtractLaneUVecI8x16),
		replace_lane: simdReplaceFn<ExpressionRef.i32>(mod, Operation.ReplaceLaneVecI8x16),

		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i8x16 | ExpressionBuilder#i8x16.add_sat_s} instead. */ add_saturate_s(...args) { BinaryenObj.printWarn("`.i8x16.add_saturate_s()` is deprecated; use `.i8x16.add_sat_s()` instead."); return this.add_sat_s(...args); },
		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i8x16 | ExpressionBuilder#i8x16.add_sat_u} instead. */ add_saturate_u(...args) { BinaryenObj.printWarn("`.i8x16.add_saturate_u()` is deprecated; use `.i8x16.add_sat_u()` instead."); return this.add_sat_u(...args); },
		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i8x16 | ExpressionBuilder#i8x16.sub_sat_s} instead. */ sub_saturate_s(...args) { BinaryenObj.printWarn("`.i8x16.sub_saturate_s()` is deprecated; use `.i8x16.sub_sat_s()` instead."); return this.sub_sat_s(...args); },
		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i8x16 | ExpressionBuilder#i8x16.sub_sat_u} instead. */ sub_saturate_u(...args) { BinaryenObj.printWarn("`.i8x16.sub_saturate_u()` is deprecated; use `.i8x16.sub_sat_u()` instead."); return this.sub_sat_u(...args); },
	} as const;
}
