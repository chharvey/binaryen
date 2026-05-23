import {
	BinaryenObj,
} from "../../-pre.ts";
import {
	PTR,
	i32sToStack,
	preserveStack,
	strToStack,
} from "../../-utils.ts";
import type {
	Module,
} from "../../classes/module/Module.ts";
import type {
	HeapType,
	ExpressionRef,
	Type,
	i32,
	none,
} from "../../constants.ts";



export function tuple(mod: Module) {
	return {
		/**
		 * A Binaryen-specific operation that combines values into a virtual tuple.
		 * A virtual tuple is simply a set of locals treated together as one unit,
		 * not an actual object stored in the heap.
		 */
		make: <T extends ExpressionRef>(elements: readonly ExpressionRef[]): T => (
			preserveStack(() => BinaryenObj["_BinaryenTupleMake"](mod[PTR], i32sToStack(elements), elements.length) as T)
		),

		/** Extracts a value from a Binaryen virtual tuple. */
		extract: <T extends ExpressionRef>(tupl: ExpressionRef, index: number): T => (
			BinaryenObj["_BinaryenTupleExtract"](mod[PTR], tupl, index) as T
		),
	} as const;
}



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#aggregate-instructions */
export function struct(mod: Module) {
	return {
		/**
		 * Allocates a new struct and initializes it with the given operands.
		 * Passing in an empty array for `operands` returns `(struct.new_default)`.
		 */
		new: <T extends ExpressionRef>(operands: readonly ExpressionRef[], heapType: HeapType): T => (
			preserveStack(() => BinaryenObj["_BinaryenStructNew"](mod[PTR], i32sToStack(operands), operands.length, heapType) as T)
		),

		/** Allocate a new struct and initializes it with default values. */
		new_default: <T extends ExpressionRef>(heapType: HeapType): T => (
			BinaryenObj["_BinaryenStructNew"](mod[PTR], 0, 0, heapType) as T
		),

		/**
		 * Gets a struct entry with an unpacked type at an index.
		 *
		 * **Warning:** `.get()` no longer takes the boolean `isSigned` argument, and assumes an unpacked type.
		 * For packed types, use `.get_s()` for signed and `.get_u()` for unsigned.
		 */
		get: function <T extends ExpressionRef>(index: number, ref: ExpressionRef, type: Type, deprecated_isSigned?: boolean): T {
			return deprecated_isSigned === undefined
				? BinaryenObj["_BinaryenStructGet"](mod[PTR], index, ref, type) as T
				: deprecated_isSigned
					? this.get_s(index, ref, type)
					: this.get_u(index, ref, type);
		},

		/** Gets a struct entry with a signed packed type at an index. */
		get_s: <T extends ExpressionRef>(index: number, ref: ExpressionRef, type: Type): T => (
			BinaryenObj["_BinaryenStructGet"](mod[PTR], index, ref, type, true) as T
		),

		/** Gets a struct entry with an unsigned packed type at an index. */
		get_u: <T extends ExpressionRef>(index: number, ref: ExpressionRef, type: Type): T => (
			BinaryenObj["_BinaryenStructGet"](mod[PTR], index, ref, type, false) as T
		),

		/** Sets a struct entry at an index. */
		set: (index: number, ref: ExpressionRef, value: ExpressionRef): none => (
			BinaryenObj["_BinaryenStructSet"](mod[PTR], index, ref, value) as none
		),
	} as const;
}



/** @see https://webassembly.github.io/spec/core/syntax/instructions.html#aggregate-instructions */
export function array(mod: Module) {
	return {
		/** Allocates a new array and initializes it with the given operand (repeated). */
		new: <T extends ExpressionRef>(heapType: HeapType, size: i32, operand: ExpressionRef): T => (
			BinaryenObj["_BinaryenArrayNew"](mod[PTR], heapType, size, operand) as T
		),

		/** Allocates a new array and initializes it with a default value (repeated). */
		new_default: <T extends ExpressionRef>(heapType: HeapType, size: i32): T => (
			BinaryenObj["_BinaryenArrayNew"](mod[PTR], heapType, size, 0) as T
		),

		/** Allocates a new array with the given operands and a statically fixed size. */
		new_fixed: <T extends ExpressionRef>(heapType: HeapType, operands: readonly ExpressionRef[]): T => (
			preserveStack(() => BinaryenObj["_BinaryenArrayNewFixed"](mod[PTR], heapType, i32sToStack(operands), operands.length) as T)
		),

		/** Allocates a new array and initializes it from a data segment. */
		new_data: <T extends ExpressionRef>(heapType: HeapType, name: string, offset: i32, size: i32): T => (
			preserveStack(() => BinaryenObj["_BinaryenArrayNewData"](mod[PTR], heapType, strToStack(name), offset, size) as T)
		),

		/** Allocates a new array and initializes it from an element segment. */
		new_elem: <T extends ExpressionRef>(heapType: HeapType, name: string, offset: i32, size: i32): T => (
			preserveStack(() => BinaryenObj["_BinaryenArrayNewElem"](mod[PTR], heapType, strToStack(name), offset, size) as T)
		),

		/**
		 * Gets an array entry with an unpacked type at an index.
		 *
		 * **Warning:** `.get()` no longer takes the boolean `isSigned` argument, and assumes an unpacked type.
		 * For packed types, use `.get_s()` for signed and `.get_u()` for unsigned.
		 */
		get: function <T extends ExpressionRef>(ref: ExpressionRef, index: i32, type: Type, deprecated_isSigned?: boolean): T {
			return deprecated_isSigned === undefined
				? BinaryenObj["_BinaryenArrayGet"](mod[PTR], ref, index, type) as T
				: deprecated_isSigned
					? this.get_s(ref, index, type)
					: this.get_u(ref, index, type);
		},

		/** Gets an array entry with a signed packed type at an index. */
		get_s: <T extends ExpressionRef>(ref: ExpressionRef, index: i32, type: Type): T => (
			BinaryenObj["_BinaryenArrayGet"](mod[PTR], ref, index, type, true) as T
		),

		/** Gets an array entry with an unsigned packed type at an index. */
		get_u: <T extends ExpressionRef>(ref: ExpressionRef, index: i32, type: Type): T => (
			BinaryenObj["_BinaryenArrayGet"](mod[PTR], ref, index, type, false) as T
		),

		/** Sets an array entry at an index. */
		set: (ref: ExpressionRef, index: i32, value: ExpressionRef): none => (
			BinaryenObj["_BinaryenArraySet"](mod[PTR], ref, index, value) as none
		),

		/** Produces the length of an array. */
		len: (ref: ExpressionRef): i32 => (
			BinaryenObj["_BinaryenArrayLen"](mod[PTR], ref) as i32
		),

		/** Fills a specified slice of an array with the given value. */
		fill: (ref: ExpressionRef, index: i32, value: ExpressionRef, size: i32): none => (
			BinaryenObj["_BinaryenArrayFill"](mod[PTR], ref, index, value, size) as none
		),

		/** Copies elements to a specified slice of an array from a given array. */
		copy: (
			destRef: ExpressionRef,
			destIndex: i32,
			srcRef: ExpressionRef,
			srcIndex: i32,
			length: i32,
		): none => (
			BinaryenObj["_BinaryenArrayCopy"](mod[PTR], destRef, destIndex, srcRef, srcIndex, length) as none
		),

		/** Copies elements to a specified slice of an array from a given data segment. */
		init_data: (
			name: string,
			ref: ExpressionRef,
			index: i32,
			offset: i32,
			size: i32,
		): none => (
			BinaryenObj["_BinaryenArrayInitData"](mod[PTR], strToStack(name), ref, index, offset, size) as none
		),

		/** Copies elements to a specified slice of an array from a given element segment. */
		init_elem: (
			name: string,
			ref: ExpressionRef,
			index: i32,
			offset: i32,
			size: i32,
		): none => (
			preserveStack(() => BinaryenObj["_BinaryenArrayInitElem"](mod[PTR], strToStack(name), ref, index, offset, size) as none)
		),
	} as const;
}
