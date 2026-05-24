import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	type i64,
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
export function i64x2(mod: Module) {
	return {
		abs: unop<v128>(mod, Operation.AbsVecI64x2),
		neg: unop<v128>(mod, Operation.NegVecI64x2),

		add: binop<v128>(mod, Operation.AddVecI64x2),
		sub: binop<v128>(mod, Operation.SubVecI64x2),
		mul: binop<v128>(mod, Operation.MulVecI64x2),

		// TODO: relaxed_laneselect

		all_true: testop<v128>(mod, Operation.AllTrueVecI64x2),

		eq: relop<v128>(mod, Operation.EqVecI64x2),
		ne: relop<v128>(mod, Operation.NeVecI64x2),
		lt_s: relop<v128>(mod, Operation.LtSVecI64x2),
		gt_s: relop<v128>(mod, Operation.GtSVecI64x2),
		le_s: relop<v128>(mod, Operation.LeSVecI64x2),
		ge_s: relop<v128>(mod, Operation.GeSVecI64x2),

		shl: simdShiftFn(mod, Operation.ShlVecI64x2),
		shr_s: simdShiftFn(mod, Operation.ShrSVecI64x2),
		shr_u: simdShiftFn(mod, Operation.ShrUVecI64x2),

		bitmask: bitmask(mod, Operation.BitmaskVecI64x2),

		// NOTE: operation names correspond to “this” object, not instruction names
		extmul_low_i32x4_s: binop<v128>(mod, Operation.ExtMulLowSVecI64x2),
		extmul_low_i32x4_u: binop<v128>(mod, Operation.ExtMulLowUVecI64x2),
		extmul_high_i32x4_s: binop<v128>(mod, Operation.ExtMulHighSVecI64x2),
		extmul_high_i32x4_u: binop<v128>(mod, Operation.ExtMulHighUVecI64x2),

		extend_low_i32x4_s: unaryFn<v128, v128>(mod, Operation.ExtendLowSVecI32x4ToVecI64x2),
		extend_low_i32x4_u: unaryFn<v128, v128>(mod, Operation.ExtendLowUVecI32x4ToVecI64x2),
		extend_high_i32x4_s: unaryFn<v128, v128>(mod, Operation.ExtendHighSVecI32x4ToVecI64x2),
		extend_high_i32x4_u: unaryFn<v128, v128>(mod, Operation.ExtendHighUVecI32x4ToVecI64x2),

		splat: splat<i64>(mod, Operation.SplatVecI64x2),
		extract_lane: simdExtractFn<i64>(mod, Operation.ExtractLaneVecI64x2),
		replace_lane: simdReplaceFn<i64>(mod, Operation.ReplaceLaneVecI64x2),
	} as const;
}
