import { hasOwnProperty } from './has-own-property';
import type { StringOrValue } from './string-or-value';

type Breakpoints = 'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Responsive<T> = T | Partial<Record<Breakpoints, T>>;

function getResponsiveStyles({
  allowArbitraryValues = true,
  className,
  customProperty,
  ...args
}: GetResponsiveCustomPropertiesOptions & GetResponsiveClassNamesOptions) {
  const classNames = getResponsiveClassNames({
    allowArbitraryValues,
    className,
    ...args,
  });

  if (allowArbitraryValues) {
    const customProperties = getResponsiveCustomProperties({ customProperty, ...args });
    return [classNames, customProperties] as const;
  } else {
    return [classNames, undefined] as const;
  }
}

interface GetResponsiveClassNamesOptions {
  allowArbitraryValues?: boolean;
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  className?: string;
  propValues?: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveClassNames({
  allowArbitraryValues = false,
  value,
  className = '',
  propValues = [],
  parseValue = (value) => value,
}: GetResponsiveClassNamesOptions): string {
  const classNames: string[] = [];

  if (!value) {
    return '';
  }

  if (typeof value === 'object') {
    const object = value as Partial<Record<Breakpoints, string>>;

    for (const bp of Object.keys(object) as Breakpoints[]) {
      const value = object[bp];

      if (value !== undefined) {
        if (propValues.includes(value) || !allowArbitraryValues) {
          const baseClassName = getBaseClassName(className, value, parseValue);
          const bpClassName = bp === 'initial' ? baseClassName : `${bp}:${baseClassName}`;
          classNames.push(bpClassName);
        } else if (allowArbitraryValues) {
          const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
          classNames.push(bpClassName);
        }
      }
    }

    return classNames.join(' ');
  }

  if (!propValues.includes(value) && allowArbitraryValues) {
    return className;
  }

  return getBaseClassName(className, value, parseValue);
}

function getBaseClassName(
  className: string,
  value: string,
  parseValue: (value: string) => string | undefined
): string {
  const delimiter = className ? '-' : '';
  const matchedValue = parseValue(value);
  const isNegative = matchedValue?.startsWith('-');
  const minus = isNegative ? '-' : '';
  const absoluteValue = isNegative ? value.substring(1) : value;
  return `${minus}${className}${delimiter}${absoluteValue}`;
}

interface GetResponsiveCustomPropertiesOptions {
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  customProperty: `--${string}` | `--${string}`[];
  propValues?: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveCustomProperties({
  value,
  customProperty,
  propValues = [],
  parseValue = (value) => value,
}: GetResponsiveCustomPropertiesOptions) {
  let styles: Record<string, string | undefined> = {};

  if (!value || propValues.includes(value as string)) {
    return undefined;
  }

  if (typeof value === 'string') {
    const customProperties = [customProperty].flat();
    styles = Object.fromEntries(customProperties.map((prop) => [prop, value]));
  }

  if (isBreakpointsObject(value)) {
    const object = value;

    for (const breakpoint in object) {
      if (hasOwnProperty(object, breakpoint)) {
        const value = object[breakpoint];
        const customProperties = [customProperty].flat();

        if (propValues.includes(value)) {
          continue;
        }

        for (const customProperty of customProperties) {
          const bp = breakpoint === 'initial' ? customProperty : `${customProperty}-${breakpoint}`;

          styles = {
            [bp]: value,
            ...styles,
          };
        }
      }
    }
  }

  for (const key in styles) {
    const value = styles[key];
    if (value !== undefined) {
      styles[key] = parseValue(value);
    }
  }

  return styles;
}

function isBreakpointsObject<V extends string>(
  obj: Responsive<V | Omit<string, V>> | undefined
): obj is Record<Breakpoints, string> {
  return typeof obj === 'object';
}

export {
  isBreakpointsObject,
  getResponsiveStyles,
  getResponsiveCustomProperties,
  getResponsiveClassNames,
};
export type { Breakpoints, Responsive, StringOrValue };
