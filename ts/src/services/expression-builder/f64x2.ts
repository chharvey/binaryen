import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	Operation,
	type f64,
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
export function f64x2(mod: Module) {
	return {
		abs: unop<v128>(mod, Operation.AbsVecF64x2),
		neg: unop<v128>(mod, Operation.NegVecF64x2),
		sqrt: unop<v128>(mod, Operation.SqrtVecF64x2),
		ceil: unop<v128>(mod, Operation.CeilVecF64x2),
		floor: unop<v128>(mod, Operation.FloorVecF64x2),
		trunc: unop<v128>(mod, Operation.TruncVecF64x2),
		nearest: unop<v128>(mod, Operation.NearestVecF64x2),

		add: binop<v128>(mod, Operation.AddVecF64x2),
		sub: binop<v128>(mod, Operation.SubVecF64x2),
		mul: binop<v128>(mod, Operation.MulVecF64x2),
		div: binop<v128>(mod, Operation.DivVecF64x2),
		min: binop<v128>(mod, Operation.MinVecF64x2),
		max: binop<v128>(mod, Operation.MaxVecF64x2),
		pmin: binop<v128>(mod, Operation.PMinVecF64x2),
		pmax: binop<v128>(mod, Operation.PMaxVecF64x2),
		// TODO: relaxed_min
		// TODO: relaxed_max

		// TODO: relaxed_madd
		// TODO: relaxed_nmadd

		eq: relop<v128>(mod, Operation.EqVecF64x2),
		ne: relop<v128>(mod, Operation.NeVecF64x2),
		lt: relop<v128>(mod, Operation.LtVecF64x2),
		gt: relop<v128>(mod, Operation.GtVecF64x2),
		le: relop<v128>(mod, Operation.LeVecF64x2),
		ge: relop<v128>(mod, Operation.GeVecF64x2),

		convert_low_i32x4_s: unaryFn<v128, v128>(mod, Operation.ConvertLowSVecI32x4ToVecF64x2),
		convert_low_i32x4_u: unaryFn<v128, v128>(mod, Operation.ConvertLowUVecI32x4ToVecF64x2),

		promote_low_f32x4: unaryFn<v128, v128>(mod, Operation.PromoteLowVecF32x4ToVecF64x2),

		splat: splat<f64>(mod, Operation.SplatVecF64x2),
		extract_lane: simdExtractFn(mod, Operation.ExtractLaneVecF64x2),
		replace_lane: simdReplaceFn(mod, Operation.ReplaceLaneVecF64x2),
	} as const;
}
