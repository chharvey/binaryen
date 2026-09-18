import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	type ExpressionRef,
	Operation,
} from "../../constants.ts";
import {
	binop,
	relop,
	simdExtractFn,
	simdReplaceFn,
	splat,
	unaryFn,
	unop,
} from "./-utils.ts";



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#vector-instructions */
export function f32x4(mod: Module) {
	return {
		abs: unop<ExpressionRef.v128>(mod, Operation.AbsVecF32x4),
		neg: unop<ExpressionRef.v128>(mod, Operation.NegVecF32x4),
		sqrt: unop<ExpressionRef.v128>(mod, Operation.SqrtVecF32x4),
		ceil: unop<ExpressionRef.v128>(mod, Operation.CeilVecF32x4),
		floor: unop<ExpressionRef.v128>(mod, Operation.FloorVecF32x4),
		trunc: unop<ExpressionRef.v128>(mod, Operation.TruncVecF32x4),
		nearest: unop<ExpressionRef.v128>(mod, Operation.NearestVecF32x4),

		add: binop<ExpressionRef.v128>(mod, Operation.AddVecF32x4),
		sub: binop<ExpressionRef.v128>(mod, Operation.SubVecF32x4),
		mul: binop<ExpressionRef.v128>(mod, Operation.MulVecF32x4),
		div: binop<ExpressionRef.v128>(mod, Operation.DivVecF32x4),
		min: binop<ExpressionRef.v128>(mod, Operation.MinVecF32x4),
		max: binop<ExpressionRef.v128>(mod, Operation.MaxVecF32x4),
		pmin: binop<ExpressionRef.v128>(mod, Operation.PMinVecF32x4),
		pmax: binop<ExpressionRef.v128>(mod, Operation.PMaxVecF32x4),
		// TODO: relaxed_min
		// TODO: relaxed_max

		// TODO: relaxed_madd
		// TODO: relaxed_nmadd

		eq: relop<ExpressionRef.v128>(mod, Operation.EqVecF32x4),
		ne: relop<ExpressionRef.v128>(mod, Operation.NeVecF32x4),
		lt: relop<ExpressionRef.v128>(mod, Operation.LtVecF32x4),
		gt: relop<ExpressionRef.v128>(mod, Operation.GtVecF32x4),
		le: relop<ExpressionRef.v128>(mod, Operation.LeVecF32x4),
		ge: relop<ExpressionRef.v128>(mod, Operation.GeVecF32x4),

		convert_i32x4_s: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ConvertSVecI32x4ToVecF32x4),
		convert_i32x4_u: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.ConvertUVecI32x4ToVecF32x4),

		demote_f64x2_zero: unaryFn<ExpressionRef.v128, ExpressionRef.v128>(mod, Operation.DemoteZeroVecF64x2ToVecF32x4),

		splat: splat<ExpressionRef.f32>(mod, Operation.SplatVecF32x4),
		extract_lane: simdExtractFn<ExpressionRef.f32>(mod, Operation.ExtractLaneVecF32x4),
		replace_lane: simdReplaceFn<ExpressionRef.f32>(mod, Operation.ReplaceLaneVecF32x4),
	} as const;
}
