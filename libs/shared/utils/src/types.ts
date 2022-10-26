import type { ReactNode } from 'react';

export type Children = { children?: ReactNode };

export type RequiredChildren = Required<Children>;

export type WithChildren<T> = Omit<T, 'children'> & Children;

export type WithRequiredChildren<T> = Omit<T, 'children'> & RequiredChildren;

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type RecursiveMutable<T> = {
  -readonly [K in keyof T]: T[K] extends (infer U)[]
    ? RecursiveMutable<U>[]
    : T[K] extends object
    ? RecursiveMutable<T[K]>
    : T[K];
};

export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type RecursivePartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[K] extends object
    ? RecursivePartial<T[K]>
    : T[K];
};

export type ArrayElement<ArrayType> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type HexAddress = `0x${string}`;
