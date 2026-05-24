import {
	BinaryenObj,
	stackAlloc,
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
	MemoryOrder,
	Operation,
	type Type,
	type i32,
	type none,
	type v128,
} from "../../constants.ts";



/**
 * The size of a single literal in memory as used in Const creation,
 * which is a little different: we don’t want users to need to make
 * their own Literals, as the C API handles them by value, which means
 * we would leak them. Instead, Const creation is fused together with
 * an intermediate stack allocation of this size to pass the value.
 */
const SIZE_OF_LITERAL = BinaryenObj["_BinaryenSizeofLiteral"]();



export function constant<T extends ExpressionRef>(
	mod: Module,
	binFuncName: (
		| "_BinaryenLiteralInt32"
		| "_BinaryenLiteralFloat32"
		| "_BinaryenLiteralFloat64"
		| "_BinaryenLiteralVec128"
		| "_BinaryenLiteralFloat32Bits"
	),
	value: number,
): T;
export function constant<T extends ExpressionRef>(
	mod: Module,
	binFuncName: (
		| "_BinaryenLiteralInt64"
		| "_BinaryenLiteralFloat64Bits"
	),
	value: bigint,
): T;
export function constant<T extends ExpressionRef>(mod: Module, binFuncName: string, value: number | bigint): T {
	return preserveStack(() => {
		// Weird C stuff happening here…
		// `tempLiteral` is a pointer whose reference gets mutated by the call to `binFuncName`.
		// Emscripten applies the ‘sret’ convention here, converting `BinaryenObj[binFuncName]`
		// (e.g `BinaryenLiteralInt32`) to a function with 2 params.
		const tempLiteral = stackAlloc(SIZE_OF_LITERAL);
		BinaryenObj[binFuncName](tempLiteral, value);
		return BinaryenObj["_BinaryenConst"](mod[PTR], tempLiteral) as T;
	});
}

export function unaryFn<P0 extends ExpressionRef, R extends ExpressionRef>(mod: Module, op: Operation): (value: P0) => R {
	return (value) => BinaryenObj["_BinaryenUnary"](mod[PTR], op, value) as R;
}

// shorthands of `unaryFn`, with default generic params
export function unop<T extends ExpressionRef>(mod: Module, op: Operation): ReturnType<typeof unaryFn<T, T>> { return unaryFn<T, T>(mod, op); }
export function testop<T extends ExpressionRef>(mod: Module, op: Operation): ReturnType<typeof unaryFn<T, i32>> { return unaryFn<T, i32>(mod, op); }
export function bitmask(mod: Module, op: Operation): ReturnType<typeof unaryFn<v128, i32>> { return unaryFn<v128, i32>(mod, op); }
export function splat<T extends ExpressionRef>(mod: Module, op: Operation): ReturnType<typeof unaryFn<T, v128>> { return unaryFn<T, v128>(mod, op); }

export function binaryFn<P0 extends ExpressionRef, P1 extends ExpressionRef, R extends ExpressionRef>(mod: Module, op: Operation): (left: P0, right: P1) => R {
	return (left, right) => BinaryenObj["_BinaryenBinary"](mod[PTR], op, left, right) as R;
}

// shorthands of `binaryFn`, with default generic params
export function binop<T extends ExpressionRef>(mod: Module, op: Operation): ReturnType<typeof binaryFn<T, T, T>> { return binaryFn<T, T, T>(mod, op); }
export function relop<T extends ExpressionRef>(mod: Module, op: Operation): ReturnType<typeof binaryFn<T, T, i32>> { return binaryFn<T, T, i32>(mod, op); }
export function narrow(mod: Module, op: Operation): ReturnType<typeof binaryFn<v128, v128, v128>> { return binaryFn<v128, v128, v128>(mod, op); }

export function loadFn<T extends ExpressionRef>(mod: Module, typ: Type, bytes: number, isSigned: boolean): (offset: number, align: number, ptr: ExpressionRef, name?: string) => T {
	return (offset, align, ptr, name) => (
		preserveStack(() => BinaryenObj["_BinaryenLoad"](mod[PTR], bytes, isSigned, offset, align, typ, ptr, strToStack(name)) as T)
	);
}

export function storeFn<T extends ExpressionRef>(mod: Module, typ: Type, bytes: number): (offset: number, align: number, ptr: ExpressionRef, value: T, name?: string) => none {
	return (offset, align, ptr, value, name) => (
		preserveStack(() => BinaryenObj["_BinaryenStore"](mod[PTR], bytes, offset, align, ptr, value, typ, strToStack(name)) as none)
	);
}

export function simdLoadFn(mod: Module, op: Operation): (offset: number, align: number, ptr: ExpressionRef, name?: string) => v128 {
	return (offset, align, ptr, name) => (
		preserveStack(() => BinaryenObj["_BinaryenSIMDLoad"](mod[PTR], op, offset, align, ptr, strToStack(name)) as v128)
	);
}

export function simdLoadStoreLaneFn<T extends ExpressionRef>(mod: Module, op: Operation): (offset: number, align: number, index: number, ptr: ExpressionRef, vec: v128, name?: string) => T {
	return (offset, align, index, ptr, vec, name) => (
		preserveStack(() => BinaryenObj["_BinaryenSIMDLoadStoreLane"](mod[PTR], op, offset, align, index, ptr, vec, strToStack(name)) as T)
	);
}

export function simdShiftFn(mod: Module, op: Operation): (vec: v128, shift: i32) => v128 {
	return (vec, shift) => BinaryenObj["_BinaryenSIMDShift"](mod[PTR], op, vec, shift) as v128;
}

export function simdExtractFn<T extends ExpressionRef>(mod: Module, op: Operation): (vec: v128, index: number) => T {
	return (vec, index) => BinaryenObj["_BinaryenSIMDExtract"](mod[PTR], op, vec, index) as T;
}

export function simdReplaceFn<T extends ExpressionRef>(mod: Module, op: Operation): (vec: v128, index: number, value: T) => v128 {
	return (vec, index, value) => BinaryenObj["_BinaryenSIMDReplace"](mod[PTR], op, vec, index, value) as v128;
}

export function atomicLoadFn(mod: Module, typ: Type, bytes: number): (offset: number, ptr: ExpressionRef, name?: string, order?: MemoryOrder) => ExpressionRef {
	return (offset, ptr, name, order = MemoryOrder.SeqCst) => (
		preserveStack(() => BinaryenObj["_BinaryenAtomicLoad"](mod[PTR], bytes, offset, typ, ptr, strToStack(name), order) as ExpressionRef)
	);
}

export function atomicStoreFn(mod: Module, typ: Type, bytes: number): (offset: number, ptr: ExpressionRef, value: ExpressionRef, name?: string, order?: MemoryOrder) => ExpressionRef {
	return (offset, ptr, value, name, order = MemoryOrder.SeqCst) => (
		preserveStack(() => BinaryenObj["_BinaryenAtomicStore"](mod[PTR], bytes, offset, ptr, value, typ, strToStack(name), order) as ExpressionRef)
	);
}



function atomicRmwFn(mod: Module, op: Operation, typ: Type, bytes: number): (offset: number, ptr: ExpressionRef, value: ExpressionRef, name?: string, order?: MemoryOrder) => ExpressionRef {
	return (offset, ptr, value, name, order = MemoryOrder.SeqCst) => (
		preserveStack(() => BinaryenObj["_BinaryenAtomicRMW"](mod[PTR], op, bytes, offset, ptr, value, typ, strToStack(name), order) as ExpressionRef)
	);
}

export function atomicRmwOps(mod: Module, typ: Type, bytes: number) {
	return {
		add: atomicRmwFn(mod, Operation.AtomicRMWAdd, typ, bytes),
		sub: atomicRmwFn(mod, Operation.AtomicRMWSub, typ, bytes),
		and: atomicRmwFn(mod, Operation.AtomicRMWAnd, typ, bytes),
		or: atomicRmwFn(mod, Operation.AtomicRMWOr, typ, bytes),
		xor: atomicRmwFn(mod, Operation.AtomicRMWXor, typ, bytes),
		xchg: atomicRmwFn(mod, Operation.AtomicRMWXchg, typ, bytes),

		cmpxchg: (offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef, name?: string, order: MemoryOrder = MemoryOrder.SeqCst): ExpressionRef => (
			preserveStack(() => BinaryenObj["_BinaryenAtomicCmpxchg"](mod[PTR], bytes, offset, ptr, expected, replacement, typ, strToStack(name), order) as ExpressionRef)
		),
	} as const;
}
