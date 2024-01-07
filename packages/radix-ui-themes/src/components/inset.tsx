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
        getResponsiveClassNames({
          className: 'rt-r-side',
          value: side,
          propValues: insetPropDefs.side.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-clip',
          value: clip,
          propValues: insetPropDefs.clip.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-p',
          value: p,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.p.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-px',
          value: px,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.px.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-py',
          value: py,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.py.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-pt',
          value: pt,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.pt.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-pr',
          value: pr,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.pr.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-pb',
          value: pb,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.pb.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-pl',
          value: pl,
          parseValue: parsePaddingValue,
          propValues: insetPropDefs.pl.values,
        }),
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
