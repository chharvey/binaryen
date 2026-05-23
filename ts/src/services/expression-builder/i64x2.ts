import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	type i32,
	type i64,
	type v128,
} from "../../constants.ts";
import {
	binaryFn,
	simdExtractFn,
	simdReplaceFn,
	simdShiftFn,
	unaryFn,
} from "./-utils.ts";



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#vector-instructions */
export function i64x2(mod: Module) {
	return {
		abs: unaryFn<v128>(mod, Operation.AbsVecI64x2),
		neg: unaryFn<v128>(mod, Operation.NegVecI64x2),

		add: binaryFn(mod, Operation.AddVecI64x2),
		sub: binaryFn(mod, Operation.SubVecI64x2),
		mul: binaryFn(mod, Operation.MulVecI64x2),

		// TODO: relaxed_laneselect

		all_true: unaryFn<v128, i32>(mod, Operation.AllTrueVecI64x2),

		eq: binaryFn(mod, Operation.EqVecI64x2),
		ne: binaryFn(mod, Operation.NeVecI64x2),
		lt_s: binaryFn(mod, Operation.LtSVecI64x2),
		gt_s: binaryFn(mod, Operation.GtSVecI64x2),
		le_s: binaryFn(mod, Operation.LeSVecI64x2),
		ge_s: binaryFn(mod, Operation.GeSVecI64x2),

		shl: simdShiftFn(mod, Operation.ShlVecI64x2),
		shr_s: simdShiftFn(mod, Operation.ShrSVecI64x2),
		shr_u: simdShiftFn(mod, Operation.ShrUVecI64x2),

		bitmask: unaryFn<v128, i32>(mod, Operation.BitmaskVecI64x2),

		// NOTE: operation names correspond to “this” object, not instruction names
		extmul_low_i32x4_s: binaryFn(mod, Operation.ExtMulLowSVecI64x2),
		extmul_low_i32x4_u: binaryFn(mod, Operation.ExtMulLowUVecI64x2),
		extmul_high_i32x4_s: binaryFn(mod, Operation.ExtMulHighSVecI64x2),
		extmul_high_i32x4_u: binaryFn(mod, Operation.ExtMulHighUVecI64x2),

		extend_low_i32x4_s: unaryFn<v128>(mod, Operation.ExtendLowSVecI32x4ToVecI64x2),
		extend_low_i32x4_u: unaryFn<v128>(mod, Operation.ExtendLowUVecI32x4ToVecI64x2),
		extend_high_i32x4_s: unaryFn<v128>(mod, Operation.ExtendHighSVecI32x4ToVecI64x2),
		extend_high_i32x4_u: unaryFn<v128>(mod, Operation.ExtendHighUVecI32x4ToVecI64x2),

		splat: unaryFn<i64, v128>(mod, Operation.SplatVecI64x2),
		extract_lane: simdExtractFn(mod, Operation.ExtractLaneVecI64x2),
		replace_lane: simdReplaceFn(mod, Operation.ReplaceLaneVecI64x2),
	} as const;
}
