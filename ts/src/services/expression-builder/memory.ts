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
	Type,
} from "../../constants.ts";



function atomic(mod: Module) {
	function wait(typ: Type, ptr: ExpressionRef, expected: ExpressionRef, timeout: ExpressionRef, name: string): ExpressionRef {
		return preserveStack(() => BinaryenObj["_BinaryenAtomicWait"](mod[PTR], ptr, expected, timeout, typ, strToStack(name)) as ExpressionRef);
	}

	return {
		/** @experimental */
		notify: (ptr: ExpressionRef, notifyCount: ExpressionRef, name: string): ExpressionRef => (
			preserveStack(() => BinaryenObj["_BinaryenAtomicNotify"](mod[PTR], ptr, notifyCount, strToStack(name)) as ExpressionRef)
		),

		/** @experimental */
		wait32: (ptr: ExpressionRef, expected: ExpressionRef, timeout: ExpressionRef, name: string): ExpressionRef => (
			wait(Type.i32, ptr, expected, timeout, name)
		),

		/** @experimental */
		wait64: (ptr: ExpressionRef, expected: ExpressionRef, timeout: ExpressionRef, name: string): ExpressionRef => (
			wait(Type.i64, ptr, expected, timeout, name)
		),
	} as const;
}



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions */
export function memory(mod: Module) {
	return {
		/** Returns the current size of a memory. */
		size: <T extends ExpressionRef>(name: string, memory64: boolean = false): T => (
			preserveStack(() => BinaryenObj["_BinaryenMemorySize"](mod[PTR], strToStack(name), memory64) as T)
		),

		/** Grows memory by a given delta and returns the previous size, or -1 if not enough space can be allocated. */
		grow: <T extends ExpressionRef>(delta: T, name: string, memory64: boolean = false): T => (
			preserveStack(() => BinaryenObj["_BinaryenMemoryGrow"](mod[PTR], delta, strToStack(name), memory64) as T)
		),

		/** Sets all values in a region of memory to a given byte. */
		fill: <T extends ExpressionRef>(dest: T, value: ExpressionRef.i32, size: T, name: string): ExpressionRef.none => (
			preserveStack(() => BinaryenObj["_BinaryenMemoryFill"](mod[PTR], dest, value, size, strToStack(name)) as ExpressionRef.none)
		),

		/**
		 * Copies data from a source memory region to a possibly overlapping destination region in another or the same memory.
		 * The first index denotes the destination.
		 */
		copy: (dest: ExpressionRef, source: ExpressionRef, size: ExpressionRef, destMemory: string, sourceMemory: string): ExpressionRef.none => (
			preserveStack(() => BinaryenObj["_BinaryenMemoryCopy"](mod[PTR], dest, source, size, strToStack(destMemory), strToStack(sourceMemory)) as ExpressionRef.none)
		),

		/** Copies data from a passive data segment into a memory. */
		init: (segment: string, dest: ExpressionRef, offset: ExpressionRef.i32, size: ExpressionRef.i32, name: string): ExpressionRef.none => (
			preserveStack(() => BinaryenObj["_BinaryenMemoryInit"](mod[PTR], strToStack(segment), dest, offset, size, strToStack(name)) as ExpressionRef.none)
		),

		/** @experimental */
		atomic: atomic(mod),
	} as const;
}



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#memory-instructions */
export function data(mod: Module) {
	return {
		/** Prevents further use of a passive data segment. */
		drop: (segment: string): ExpressionRef.none => (
			preserveStack(() => BinaryenObj["_BinaryenDataDrop"](mod[PTR], strToStack(segment)) as ExpressionRef.none)
		),
	} as const;
}
