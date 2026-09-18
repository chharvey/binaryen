import {
	BinaryenObj,
} from "../../-pre.ts";
import {
	PTR,
	preserveStack,
	strToStack,
} from "../../-utils.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import {
	type ExpressionRef,
	type HeapType,
	Operation,
	type Type,
} from "../../constants.ts";



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#reference-instructions */
export function ref(mod: Module) {
	return {
		/** Produces a reference to a given function. */
		func: <T extends ExpressionRef>(name: string, type: Type): T => (
			preserveStack(() => BinaryenObj["_BinaryenRefFunc"](mod[PTR], strToStack(name), type) as T)
		),

		/** Produces a null reference. */
		null: <T extends ExpressionRef>(ht: HeapType): T => (
			BinaryenObj["_BinaryenRefNull"](mod[PTR], ht) as T
		),

		/** Checks for null. */
		is_null: (value: ExpressionRef): ExpressionRef.i32 => (
			BinaryenObj["_BinaryenRefIsNull"](mod[PTR], value) as ExpressionRef.i32
		),

		/** Converts a nullible reference to a non-null one, or traps. */
		as_non_null: <T extends ExpressionRef>(value: ExpressionRef): T => (
			BinaryenObj["_BinaryenRefAs"](mod[PTR], Operation.RefAsNonNull, value) as T
		),

		/** Compares two references. */
		eq: (left: ExpressionRef.eqref, right: ExpressionRef.eqref): ExpressionRef.i32 => (
			BinaryenObj["_BinaryenRefEq"](mod[PTR], left, right) as ExpressionRef.i32
		),

		/** Tests the dynamic type of a reference, and returns boolean. */
		test: (value: ExpressionRef, castType: Type): ExpressionRef.i32 => (
			BinaryenObj["_BinaryenRefTest"](mod[PTR], value, castType) as ExpressionRef.i32
		),

		/** Tests the dynamic type of a reference, and performs a downcast or traps. */
		cast: <T extends ExpressionRef>(value: ExpressionRef, castType: Type): T => (
			BinaryenObj["_BinaryenRefCast"](mod[PTR], value, castType) as T
		),

		/** Converts type i32 to an unboxed scalar. */
		i31: <T extends ExpressionRef>(value: ExpressionRef.i32): T => (
			BinaryenObj["_BinaryenRefI31"](mod[PTR], value) as T
		),
	} as const;
}



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#aggregate-instructions */
export function i31(mod: Module) {
	return {
		/** Converts an unboxed scalar to type i32, signed. */
		get_s: (value: ExpressionRef): ExpressionRef.i32 => (
			BinaryenObj["_BinaryenI31Get"](mod[PTR], value, true) as ExpressionRef.i32
		),

		/** Converts an unboxed scalar to type i32, unsigned. */
		get_u: (value: ExpressionRef): ExpressionRef.i32 => (
			BinaryenObj["_BinaryenI31Get"](mod[PTR], value, false) as ExpressionRef.i32
		),
	} as const;
}
