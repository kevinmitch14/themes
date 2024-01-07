import { hasOwnProperty } from './has-own-property';
import type { StringOrValue } from './string-or-value';

type Breakpoints = 'initial' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Responsive<T> = T | Partial<Record<Breakpoints, T>>;

interface GetResponsiveStylesOptions {
  className: string;
  customProperty: `--${string}` | `--${string}`[];
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  propValues: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveStyles({ className, customProperty, ...args }: GetResponsiveStylesOptions) {
  const classNames = getResponsiveClassNames({
    allowArbitraryValues: true,
    className,
    ...args,
  });

  const customProperties = getResponsiveCustomProperties({ customProperty, ...args });
  return [classNames, customProperties] as const;
}

interface GetResponsiveClassNamesOptions {
  allowArbitraryValues?: boolean;
  className: string;
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  propValues: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveClassNames({
  allowArbitraryValues,
  value,
  className,
  propValues,
  parseValue = (value) => value,
}: GetResponsiveClassNamesOptions): string | undefined {
  const classNames: string[] = [];

  if (!value) {
    return '';
  }

  if (typeof value === 'object') {
    const object = value as Partial<Record<Breakpoints, string>>;

    for (const bp of Object.keys(object) as Breakpoints[]) {
      const value = object[bp];

      if (value !== undefined) {
        if (propValues.includes(value)) {
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

  if (propValues.includes(value)) {
    return getBaseClassName(className, value, parseValue);
  }

  if (allowArbitraryValues) {
    return className;
  }
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
  const absoluteValue = isNegative ? matchedValue?.substring(1) : matchedValue;
  return `${minus}${className}${delimiter}${absoluteValue}`;
}

interface GetResponsiveCustomPropertiesOptions {
  customProperty: `--${string}` | `--${string}`[];
  value: Responsive<StringOrValue<string>> | Responsive<string> | undefined;
  propValues: string[] | readonly string[];
  parseValue?: (value: string) => string | undefined;
}

function getResponsiveCustomProperties({
  customProperty,
  value,
  propValues,
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

  // TODO make sure we are not iterating over keys that aren't breakpoints
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

function isBreakpointsObject<Value extends string>(
  obj: Responsive<Value | Omit<string, Value>> | undefined
): obj is Record<Breakpoints, string> {
  return typeof obj === 'object';
}

export { getResponsiveStyles, getResponsiveCustomProperties, getResponsiveClassNames };
export type { Breakpoints, Responsive, StringOrValue };
