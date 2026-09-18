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
	stringref,
} from "../../constants.ts";



/** TODO: support `stringref` proposal. Once in spec, link to relevant section in https://webassembly.github.io/spec/core/syntax/instructions.html. */
export function string(mod: Module) {
	return {
		/**
		 * Creates a new string from the literal string contents.
		 * This instruction is constant and can be used in global variable initializers.
		 */
		const: (value: string): stringref => preserveStack(() => BinaryenObj["_BinaryenStringConst"](mod[PTR], strToStack(value)) as stringref),
	} as const;
}
