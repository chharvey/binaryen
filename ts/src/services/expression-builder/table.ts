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



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#table-instructions */
export function table(mod: Module) {
	return {
		/** Load an element in a table. */
		get: <T extends ExpressionRef>(name: string, index: number, typ: Type): T => (
			preserveStack(() => BinaryenObj["_BinaryenTableGet"](mod[PTR], strToStack(name), index, typ) as T)
		),

		/** Store an element in a table. */
		set: (name: string, index: number, value: ExpressionRef): none => (
			preserveStack(() => BinaryenObj["_BinaryenTableSet"](mod[PTR], strToStack(name), index, value) as none)
		),

		/** Returns the current size of a table. */
		size: <T extends ExpressionRef>(name: string): T => (
			preserveStack(() => BinaryenObj["_BinaryenTableSize"](mod[PTR], strToStack(name)) as T)
		),

		/** Grows table by a given delta and returns the previous size, or -1 if not enough space can be allocated. */
		grow: <T extends ExpressionRef>(name: string, value: ExpressionRef, delta: ExpressionRef): T => (
			preserveStack(() => BinaryenObj["_BinaryenTableGrow"](mod[PTR], strToStack(name), value, delta) as T)
		),

		// TODO: fill // (T, ExpressionRef, T) => none
		// TODO: copy // (ExpressionRef, ExpressionRef, ExpressionRef) => none
		// TODO: init // (ExpressionRef, i32, i32) => none
	} as const;
}
