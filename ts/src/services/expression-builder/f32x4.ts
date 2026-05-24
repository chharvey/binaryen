import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	type f32,
	type v128,
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
		abs: unop<v128>(mod, Operation.AbsVecF32x4),
		neg: unop<v128>(mod, Operation.NegVecF32x4),
		sqrt: unop<v128>(mod, Operation.SqrtVecF32x4),
		ceil: unop<v128>(mod, Operation.CeilVecF32x4),
		floor: unop<v128>(mod, Operation.FloorVecF32x4),
		trunc: unop<v128>(mod, Operation.TruncVecF32x4),
		nearest: unop<v128>(mod, Operation.NearestVecF32x4),

		add: binop<v128>(mod, Operation.AddVecF32x4),
		sub: binop<v128>(mod, Operation.SubVecF32x4),
		mul: binop<v128>(mod, Operation.MulVecF32x4),
		div: binop<v128>(mod, Operation.DivVecF32x4),
		min: binop<v128>(mod, Operation.MinVecF32x4),
		max: binop<v128>(mod, Operation.MaxVecF32x4),
		pmin: binop<v128>(mod, Operation.PMinVecF32x4),
		pmax: binop<v128>(mod, Operation.PMaxVecF32x4),
		// TODO: relaxed_min
		// TODO: relaxed_max

		// TODO: relaxed_madd
		// TODO: relaxed_nmadd

		eq: relop<v128>(mod, Operation.EqVecF32x4),
		ne: relop<v128>(mod, Operation.NeVecF32x4),
		lt: relop<v128>(mod, Operation.LtVecF32x4),
		gt: relop<v128>(mod, Operation.GtVecF32x4),
		le: relop<v128>(mod, Operation.LeVecF32x4),
		ge: relop<v128>(mod, Operation.GeVecF32x4),

		convert_i32x4_s: unaryFn<v128, v128>(mod, Operation.ConvertSVecI32x4ToVecF32x4),
		convert_i32x4_u: unaryFn<v128, v128>(mod, Operation.ConvertUVecI32x4ToVecF32x4),

		demote_f64x2_zero: unaryFn<v128, v128>(mod, Operation.DemoteZeroVecF64x2ToVecF32x4),

		splat: splat<f32>(mod, Operation.SplatVecF32x4),
		extract_lane: simdExtractFn(mod, Operation.ExtractLaneVecF32x4),
		replace_lane: simdReplaceFn(mod, Operation.ReplaceLaneVecF32x4),
	} as const;
}
