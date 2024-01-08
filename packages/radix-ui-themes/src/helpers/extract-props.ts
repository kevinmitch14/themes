import classNames from 'classnames';
import { PropDef, ResponsivePropDef } from './props';
import { getResponsiveClassNames, getResponsiveStyles } from './responsive';
import { mergeStyles } from './merge-styles';

type UnionKeys<T> = T extends any ? keyof T : never;

type PropDefsWithoutClassName<T> = T extends Record<string, PropDef>
  ? { [K in keyof T]: T[K] extends { className: string } ? K : never }[keyof T]
  : never;

type PropDefsMerged<T extends Record<string, PropDef>[]> = {
  [K in UnionKeys<T[number]>]: PropDef;
};

function mergeObjects<T extends Record<string, PropDef>[]>(...args: T): PropDefsMerged<T> {
  return Object.assign({}, ...args);
}

function extractProps<
  P extends { className?: string; style?: React.CSSProperties },
  T extends Record<string, PropDef>[]
>(props: P, ...propDefs: T): Omit<P, PropDefsWithoutClassName<T[number]>> {
  let className: string | undefined;
  let style: ReturnType<typeof mergeStyles>;
  const extractedProps = { ...props };

  const allPropDefs: PropDefsMerged<T> = mergeObjects(...propDefs);

  for (const key in allPropDefs) {
    const propDef = allPropDefs[key];

    if (key in props) {
      const value = props[key];

      if ('className' in propDef && propDef.className) {
        delete extractedProps[key];

        if (propDef.type === 'string') {
          // Make sure a responsive class isn't created for non-responsive props
          if (!isResponsive(propDef) && typeof value !== 'string') {
            continue;
          }

          className = classNames(propDef.className, className);
        }

        if (propDef.type === 'enum') {
          // Make sure a responsive class isn't created for non-responsive props
          if (!isResponsive(propDef) && propDef.values.includes(value)) {
            continue;
          }

          const propClassName = getResponsiveClassNames({
            allowArbitraryValues: false,
            value,
            className: propDef.className,
            propValues: propDef.values,
            // TODO
            // parseValue: propDef.parseValue,
          });

          className = classNames(className, propClassName);
        }

        if (propDef.type === 'enum | string') {
          // Make sure a responsive class isn't created for non-responsive props
          if (!isResponsive(propDef) && typeof value !== 'string') {
            continue;
          }

          const [propClassNames, propCustomProperties] = getResponsiveStyles({
            className: propDef.className,
            customProperty: propDef.customProperty,
            propValues: propDef.values,
            value,
          });

          style = mergeStyles(style, propCustomProperties);
          className = classNames(className, propClassNames);
        }

        if (propDef.type === 'boolean') {
          if (!isResponsive(propDef) && typeof value !== 'boolean') {
            continue;
          }

          // TODO handle responsive boolean props
          if (value) {
            className = classNames(propDef.className, className);
          }
        }
      }
    }
  }

  extractedProps.className = classNames(className, props.className);
  extractedProps.style = mergeStyles(style, props.style);
  return extractedProps;
}

const isResponsive = (propDef: PropDef): propDef is ResponsivePropDef =>
  'responsive' in propDef && propDef.responsive;

export { extractProps };

// Omit<P, KeysWithClassName<PropDefsMerged<T>>> {
