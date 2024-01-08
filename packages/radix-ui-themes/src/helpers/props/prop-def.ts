import React from 'react';
import type { Responsive } from '../responsive';
import type { StringOrValue } from '../string-or-value';

type BooleanPropDef = {
  type: 'boolean';
  default?: boolean;
  required?: boolean;
  className?: string;
};
type StringPropDef = {
  type: 'string';
  default?: string;
  required?: boolean;
  className?: string;
};
type ReactNodePropDef = {
  type: 'ReactNode';
  default?: React.ReactNode;
  required?: boolean;
};
type EnumPropDef<T> = {
  type: 'enum';
  values: readonly T[];
  default?: T;
  required?: boolean;
  className?: string;
};
type EnumOrStringPropDef<T> = {
  type: 'enum | string';
  values: readonly T[];
  default?: T;
  required?: boolean;
  className?: string;
  customProperty?: `--${string}` | `--${string}`[];
};

type RegularPropDef<T> =
  | BooleanPropDef
  | StringPropDef
  | ReactNodePropDef
  | EnumPropDef<T>
  | EnumOrStringPropDef<T>;
type ResponsivePropDef<T = any> = RegularPropDef<T> & { responsive: true };
type PropDef<T = any> = RegularPropDef<T> | ResponsivePropDef<T>;

// prettier-ignore
type GetPropDefType<Def> =
	  Def extends BooleanPropDef ? (Def extends ResponsivePropDef ? Responsive<boolean> : boolean)
  : Def extends StringPropDef ? (Def extends ResponsivePropDef ? Responsive<string> : string)
  : Def extends ReactNodePropDef ? (Def extends ResponsivePropDef ? Responsive<React.ReactNode> : React.ReactNode)
  : Def extends EnumOrStringPropDef<infer Type> ? (Def extends ResponsivePropDef<infer Type extends string> ? Responsive<StringOrValue<Type>> : Type)
  : Def extends EnumPropDef<infer Type> ? (Def extends ResponsivePropDef<infer Type> ? Responsive<Type> : Type)
  : never;

type GetPropDefTypes<P> = {
  [K in keyof P]?: GetPropDefType<P[K]>;
};

export type { PropDef, ResponsivePropDef, GetPropDefTypes };
