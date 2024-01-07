import * as React from 'react';
import classNames from 'classnames';
import { insetPropDefs } from './inset.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type InsetElement = React.ElementRef<'div'>;
type InsetOwnProps = GetPropDefTypes<typeof insetPropDefs>;
interface InsetProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, InsetOwnProps {}
const Inset = React.forwardRef<InsetElement, InsetProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    className,
    style,
    side = insetPropDefs.side.default,
    clip = insetPropDefs.clip.default,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    ...insetProps
  } = marginRest;
  return (
    <div
      {...insetProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Inset',
        getResponsiveClassNames({ className: 'rt-r-side', value: side }),
        getResponsiveClassNames({ className: 'rt-r-clip', value: clip }),
        getResponsiveClassNames({ className: 'rt-r-p', value: p, parseValue: parsePaddingValue }),
        getResponsiveClassNames({ className: 'rt-r-px', value: px, parseValue: parsePaddingValue }),
        getResponsiveClassNames({ className: 'rt-r-py', value: py, parseValue: parsePaddingValue }),
        getResponsiveClassNames({ className: 'rt-r-pt', value: pt, parseValue: parsePaddingValue }),
        getResponsiveClassNames({ className: 'rt-r-pr', value: pr, parseValue: parsePaddingValue }),
        getResponsiveClassNames({ className: 'rt-r-pb', value: pb, parseValue: parsePaddingValue }),
        getResponsiveClassNames({ className: 'rt-r-pl', value: pl, parseValue: parsePaddingValue }),
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    />
  );
});
Inset.displayName = 'Inset';

const parsePaddingValue = (value: string) => (value === 'current' ? 'inset' : value);

export { Inset };
export type { InsetProps };
