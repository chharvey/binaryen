import {
	BinaryenObj,
} from "../../-pre.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	type ExpressionRef,
	Operation,
} from "../../constants.ts";
import {
	binop,
	bitmask,
	narrow,
	relop,
	simdExtractFn,
	simdReplaceFn,
	simdShiftFn,
	splat,
	testop,
	unaryFn,
	unop,
} from "./-utils.ts";



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#vector-instructions */
export function i16x8(mod: Module) {
	return {
		abs: unop<ExpressionRef.v128>(mod, Operation.AbsVecI16x8),
		neg: unop<ExpressionRef.v128>(mod, Operation.NegVecI16x8),

		add: binop<ExpressionRef.v128>(mod, Operation.AddVecI16x8),
		sub: binop<ExpressionRef.v128>(mod, Operation.SubVecI16x8),
		add_sat_s: binop<ExpressionRef.v128>(mod, Operation.AddSatSVecI16x8),
		add_sat_u: binop<ExpressionRef.v128>(mod, Operation.AddSatUVecI16x8),
		sub_sat_s: binop<ExpressionRef.v128>(mod, Operation.SubSatSVecI16x8),
		sub_sat_u: binop<ExpressionRef.v128>(mod, Operation.SubSatUVecI16x8),
		mul: binop<ExpressionRef.v128>(mod, Operation.MulVecI16x8),
		avgr_u: binop<ExpressionRef.v128>(mod, Operation.AvgrUVecI16x8),
		q15mulr_sat_s: binop<ExpressionRef.v128>(mod, Operation.Q15MulrSatSVecI16x8),
		// TODO: relaxed_q15mulr_s
		min_s: binop<ExpressionRef.v128>(mod, Operation.MinSVecI16x8),
		min_u: binop<ExpressionRef.v128>(mod, Operation.MinUVecI16x8),
		max_s: binop<ExpressionRef.v128>(mod, Operation.MaxSVecI16x8),
		max_u: binop<ExpressionRef.v128>(mod, Operation.MaxUVecI16x8),

		// TODO: relaxed_laneselect

		all_true: testop<ExpressionRef.v128>(mod, Operation.AllTrueVecI16x8),

		eq: relop<ExpressionRef.v128>(mod, Operation.EqVecI16x8),
		ne: relop<ExpressionRef.v128>(mod, Operation.NeVecI16x8),
		lt_s: relop<ExpressionRef.v128>(mod, Operation.LtSVecI16x8),
		lt_u: relop<ExpressionRef.v128>(mod, Operation.LtUVecI16x8),
		gt_s: relop<ExpressionRef.v128>(mod, Operation.GtSVecI16x8),
		gt_u: relop<ExpressionRef.v128>(mod, Operation.GtUVecI16x8),
		le_s: relop<ExpressionRef.v128>(mod, Operation.LeSVecI16x8),
		le_u: relop<ExpressionRef.v128>(mod, Operation.LeUVecI16x8),
		ge_s: relop<ExpressionRef.v128>(mod, Operation.GeSVecI16x8),
		ge_u: relop<ExpressionRef.v128>(mod, Operation.GeUVecI16x8),

		shl: simdShiftFn(mod, Operation.ShlVecI16x8),
		shr_s: simdShiftFn(mod, Operation.ShrSVecI16x8),
		shr_u: simdShiftFn(mod, Operation.ShrUVecI16x8),

		bitmask: bitmask(mod, Operation.BitmaskVecI16x8),

		extadd_pairwise_i8x16_s: unop<ExpressionRef.v128>(mod, Operation.ExtAddPairwiseSVecI8x16ToI16x8),
		extadd_pairwise_i8x16_u: unop<ExpressionRef.v128>(mod, Operation.ExtAddPairwiseUVecI8x16ToI16x8),

		// NOTE: operation names correspond to “this” object, not instruction names
		extmul_low_i8x16_s: binop<ExpressionRef.v128>(mod, Operation.ExtMulLowSVecI16x8),
		extmul_low_i8x16_u: binop<ExpressionRef.v128>(mod, Operation.ExtMulLowUVecI16x8),
		extmul_high_i8x16_s: binop<ExpressionRef.v128>(mod, Operation.ExtMulHighSVecI16x8),
		extmul_high_i8x16_u: binop<ExpressionRef.v128>(mod, Operation.ExtMulHighUVecI16x8),

		// TODO: relaxed_dot_i8x16_i7x16_s

		narrow_i32x4_s: narrow(mod, Operation.NarrowSVecI32x4ToVecI16x8),
		narrow_i32x4_u: narrow(mod, Operation.NarrowUVecI32x4ToVecI16x8),

		extend_low_i8x16_s: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendLowSVecI8x16ToVecI16x8),
		extend_low_i8x16_u: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendLowUVecI8x16ToVecI16x8),
		extend_high_i8x16_s: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendHighSVecI8x16ToVecI16x8),
		extend_high_i8x16_u: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendHighUVecI8x16ToVecI16x8),

		splat: splat<ExpressionRef.i32>(mod, Operation.SplatVecI16x8),
		extract_lane_s: simdExtractFn<ExpressionRef.i32>(mod, Operation.ExtractLaneSVecI16x8),
		extract_lane_u: simdExtractFn<ExpressionRef.i32>(mod, Operation.ExtractLaneUVecI16x8),
		replace_lane: simdReplaceFn<ExpressionRef.i32>(mod, Operation.ReplaceLaneVecI16x8),

		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i16x8 | ExpressionBuilder#i16x8.add_sat_s} instead. */ add_saturate_s(...args) { BinaryenObj.printWarn("`.i16x8.add_saturate_s()` is deprecated; use `.i16x8.add_sat_s()` instead."); return this.add_sat_s(...args); },
		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i16x8 | ExpressionBuilder#i16x8.add_sat_u} instead. */ add_saturate_u(...args) { BinaryenObj.printWarn("`.i16x8.add_saturate_u()` is deprecated; use `.i16x8.add_sat_u()` instead."); return this.add_sat_u(...args); },
		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i16x8 | ExpressionBuilder#i16x8.sub_sat_s} instead. */ sub_saturate_s(...args) { BinaryenObj.printWarn("`.i16x8.sub_saturate_s()` is deprecated; use `.i16x8.sub_sat_s()` instead."); return this.sub_sat_s(...args); },
		// @ts-expect-error
		/** @deprecated Use {@link ExpressionBuilder#i16x8 | ExpressionBuilder#i16x8.sub_sat_u} instead. */ sub_saturate_u(...args) { BinaryenObj.printWarn("`.i16x8.sub_saturate_u()` is deprecated; use `.i16x8.sub_sat_u()` instead."); return this.sub_sat_u(...args); },
	} as const;
}
