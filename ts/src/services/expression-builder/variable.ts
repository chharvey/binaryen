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
import type {
	ExpressionRef,
	Type,
	none,
} from "../../constants.ts";



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#variable-instructions */
export function local(mod: Module) {
	return {
		/**
		 * Creates a `(local.get)` for the local at the specified index.
		 * Note that we must specify the type here as we may not have created the local being accessed yet.
		 */
		get: <T extends ExpressionRef>(index: number, typ: Type): T => (
			BinaryenObj["_BinaryenLocalGet"](mod[PTR], index, typ) as T
		),

		/** Creates a `(local.set)` for the local at the specified index. */
		set: (index: number, value: ExpressionRef): none => (
			BinaryenObj["_BinaryenLocalSet"](mod[PTR], index, value) as none
		),

		/**
		 * Creates a `(local.tee)` for the local at the specified index.
		 * Note that we must specify the type here as we may not have created the local being accessed yet.
		 */
		tee: <T extends ExpressionRef>(index: number, value: T, typ: Type): T => (
			BinaryenObj["_BinaryenLocalTee"](mod[PTR], index, value, typ) as T
		),
	} as const;
}



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#variable-instructions */
export function global(mod: Module) {
	return {
		/**
		 * Creates a `(global.get)` for the global with the specified name.
		 * Note that we must specify the type here as we may not have created the global being accessed yet.
		 */
		get: <T extends ExpressionRef>(name: string, typ: Type): T => (
			preserveStack(() => BinaryenObj["_BinaryenGlobalGet"](mod[PTR], strToStack(name), typ) as T)
		),

		/** Creates a `(global.set)` for the global with the specified name. */
		set: (name: string, value: ExpressionRef): none => (
			preserveStack(() => BinaryenObj["_BinaryenGlobalSet"](mod[PTR], strToStack(name), value) as none)
		),
	} as const;
}
