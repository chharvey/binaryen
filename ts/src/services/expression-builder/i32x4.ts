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
export function i32x4(mod: Module) {
	return {
		abs: unop<ExpressionRef.v128>(mod, Operation.AbsVecI32x4),
		neg: unop<ExpressionRef.v128>(mod, Operation.NegVecI32x4),

		add: binop<ExpressionRef.v128>(mod, Operation.AddVecI32x4),
		sub: binop<ExpressionRef.v128>(mod, Operation.SubVecI32x4),
		mul: binop<ExpressionRef.v128>(mod, Operation.MulVecI32x4),
		min_s: binop<ExpressionRef.v128>(mod, Operation.MinSVecI32x4),
		min_u: binop<ExpressionRef.v128>(mod, Operation.MinUVecI32x4),
		max_s: binop<ExpressionRef.v128>(mod, Operation.MaxSVecI32x4),
		max_u: binop<ExpressionRef.v128>(mod, Operation.MaxUVecI32x4),

		// TODO: relaxed_laneselect

		all_true: testop<ExpressionRef.v128>(mod, Operation.AllTrueVecI32x4),

		eq: relop<ExpressionRef.v128>(mod, Operation.EqVecI32x4),
		ne: relop<ExpressionRef.v128>(mod, Operation.NeVecI32x4),
		lt_s: relop<ExpressionRef.v128>(mod, Operation.LtSVecI32x4),
		lt_u: relop<ExpressionRef.v128>(mod, Operation.LtUVecI32x4),
		gt_s: relop<ExpressionRef.v128>(mod, Operation.GtSVecI32x4),
		gt_u: relop<ExpressionRef.v128>(mod, Operation.GtUVecI32x4),
		le_s: relop<ExpressionRef.v128>(mod, Operation.LeSVecI32x4),
		le_u: relop<ExpressionRef.v128>(mod, Operation.LeUVecI32x4),
		ge_s: relop<ExpressionRef.v128>(mod, Operation.GeSVecI32x4),
		ge_u: relop<ExpressionRef.v128>(mod, Operation.GeUVecI32x4),

		shl: simdShiftFn(mod, Operation.ShlVecI32x4),
		shr_s: simdShiftFn(mod, Operation.ShrSVecI32x4),
		shr_u: simdShiftFn(mod, Operation.ShrUVecI32x4),

		bitmask: bitmask(mod, Operation.BitmaskVecI32x4),

		extadd_pairwise_i16x8_s: unop<ExpressionRef.v128>(mod, Operation.ExtAddPairwiseSVecI16x8ToI32x4),
		extadd_pairwise_i16x8_u: unop<ExpressionRef.v128>(mod, Operation.ExtAddPairwiseUVecI16x8ToI32x4),

		// NOTE: operation names correspond to “this” object, not instruction names
		extmul_low_i16x8_s: binop<ExpressionRef.v128>(mod, Operation.ExtMulLowSVecI32x4),
		extmul_low_i16x8_u: binop<ExpressionRef.v128>(mod, Operation.ExtMulLowUVecI32x4),
		extmul_high_i16x8_s: binop<ExpressionRef.v128>(mod, Operation.ExtMulHighSVecI32x4),
		extmul_high_i16x8_u: binop<ExpressionRef.v128>(mod, Operation.ExtMulHighUVecI32x4),

		dot_i16x8_s: binop<ExpressionRef.v128>(mod, Operation.DotSVecI16x8ToVecI32x4),
		// TODO: relaxed_dot_i8x16_i7x16_add_s

		extend_low_i16x8_s: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendLowSVecI16x8ToVecI32x4),
		extend_low_i16x8_u: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendLowUVecI16x8ToVecI32x4),
		extend_high_i16x8_s: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendHighSVecI16x8ToVecI32x4),
		extend_high_i16x8_u: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ExtendHighUVecI16x8ToVecI32x4),

		trunc_sat_f32x4_s: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.TruncSatSVecF32x4ToVecI32x4),
		trunc_sat_f32x4_u: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.TruncSatUVecF32x4ToVecI32x4),
		trunc_sat_f64x2_s_zero: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.TruncSatZeroSVecF64x2ToVecI32x4),
		trunc_sat_f64x2_u_zero: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.TruncSatZeroUVecF64x2ToVecI32x4),
		// TODO: relaxed_trunc_f32x4_s
		// TODO: relaxed_trunc_f32x4_u
		// TODO: relaxed_trunc_f64x2_s_zero
		// TODO: relaxed_trunc_f64x2_u_zero

		splat: splat<ExpressionRef.i32>(mod, Operation.SplatVecI32x4),
		extract_lane: simdExtractFn<ExpressionRef.i32>(mod, Operation.ExtractLaneVecI32x4),
		replace_lane: simdReplaceFn<ExpressionRef.i32>(mod, Operation.ReplaceLaneVecI32x4),
	} as const;
}
