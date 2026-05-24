import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	type i32,
	type v128,
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
		abs: unop<v128>(mod, Operation.AbsVecI32x4),
		neg: unop<v128>(mod, Operation.NegVecI32x4),

		add: binop<v128>(mod, Operation.AddVecI32x4),
		sub: binop<v128>(mod, Operation.SubVecI32x4),
		mul: binop<v128>(mod, Operation.MulVecI32x4),
		min_s: binop<v128>(mod, Operation.MinSVecI32x4),
		min_u: binop<v128>(mod, Operation.MinUVecI32x4),
		max_s: binop<v128>(mod, Operation.MaxSVecI32x4),
		max_u: binop<v128>(mod, Operation.MaxUVecI32x4),

		// TODO: relaxed_laneselect

		all_true: testop<v128>(mod, Operation.AllTrueVecI32x4),

		eq: relop<v128>(mod, Operation.EqVecI32x4),
		ne: relop<v128>(mod, Operation.NeVecI32x4),
		lt_s: relop<v128>(mod, Operation.LtSVecI32x4),
		lt_u: relop<v128>(mod, Operation.LtUVecI32x4),
		gt_s: relop<v128>(mod, Operation.GtSVecI32x4),
		gt_u: relop<v128>(mod, Operation.GtUVecI32x4),
		le_s: relop<v128>(mod, Operation.LeSVecI32x4),
		le_u: relop<v128>(mod, Operation.LeUVecI32x4),
		ge_s: relop<v128>(mod, Operation.GeSVecI32x4),
		ge_u: relop<v128>(mod, Operation.GeUVecI32x4),

		shl: simdShiftFn(mod, Operation.ShlVecI32x4),
		shr_s: simdShiftFn(mod, Operation.ShrSVecI32x4),
		shr_u: simdShiftFn(mod, Operation.ShrUVecI32x4),

		bitmask: bitmask(mod, Operation.BitmaskVecI32x4),

		extadd_pairwise_i16x8_s: unop<v128>(mod, Operation.ExtAddPairwiseSVecI16x8ToI32x4),
		extadd_pairwise_i16x8_u: unop<v128>(mod, Operation.ExtAddPairwiseUVecI16x8ToI32x4),

		// NOTE: operation names correspond to “this” object, not instruction names
		extmul_low_i16x8_s: binop<v128>(mod, Operation.ExtMulLowSVecI32x4),
		extmul_low_i16x8_u: binop<v128>(mod, Operation.ExtMulLowUVecI32x4),
		extmul_high_i16x8_s: binop<v128>(mod, Operation.ExtMulHighSVecI32x4),
		extmul_high_i16x8_u: binop<v128>(mod, Operation.ExtMulHighUVecI32x4),

		dot_i16x8_s: binop<v128>(mod, Operation.DotSVecI16x8ToVecI32x4),
		// TODO: relaxed_dot_i8x16_i7x16_add_s

		extend_low_i16x8_s: unaryFn<v128, v128>(mod, Operation.ExtendLowSVecI16x8ToVecI32x4),
		extend_low_i16x8_u: unaryFn<v128, v128>(mod, Operation.ExtendLowUVecI16x8ToVecI32x4),
		extend_high_i16x8_s: unaryFn<v128, v128>(mod, Operation.ExtendHighSVecI16x8ToVecI32x4),
		extend_high_i16x8_u: unaryFn<v128, v128>(mod, Operation.ExtendHighUVecI16x8ToVecI32x4),

		trunc_sat_f32x4_s: unaryFn<v128, v128>(mod, Operation.TruncSatSVecF32x4ToVecI32x4),
		trunc_sat_f32x4_u: unaryFn<v128, v128>(mod, Operation.TruncSatUVecF32x4ToVecI32x4),
		trunc_sat_f64x2_s_zero: unaryFn<v128, v128>(mod, Operation.TruncSatZeroSVecF64x2ToVecI32x4),
		trunc_sat_f64x2_u_zero: unaryFn<v128, v128>(mod, Operation.TruncSatZeroUVecF64x2ToVecI32x4),
		// TODO: relaxed_trunc_f32x4_s
		// TODO: relaxed_trunc_f32x4_u
		// TODO: relaxed_trunc_f64x2_s_zero
		// TODO: relaxed_trunc_f64x2_u_zero

		splat: splat<i32>(mod, Operation.SplatVecI32x4),
		extract_lane: simdExtractFn(mod, Operation.ExtractLaneVecI32x4),
		replace_lane: simdReplaceFn(mod, Operation.ReplaceLaneVecI32x4),
	} as const;
}
