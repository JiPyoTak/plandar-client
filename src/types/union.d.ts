/*
 사용법
 1. with array
 const tmp = ['a', 'b', 'c'];
 type Tmp = Union<typeof tmp>; // Tmp = 'a' | 'b' | 'c'

 2. with object
 const tmp = { a: 1, b: 2, c: 3 };
 type Tmp = Union<typeof tmp>; // Tmp = 'a' | 'b' | 'c'
 */

type Array2Type<T extends readonly any[]> = T[number];
type ObjectKey2Type<T extends { [i: string]: any }> = keyof T;
type Union<T> = T extends readonly any[]
  ? Array2Type<T>
  : T extends { [i: string]: any }
  ? ObjectKey2Type<T>
  : never;

export type { Union };
