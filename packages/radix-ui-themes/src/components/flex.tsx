import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { flexPropDefs } from './flex.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    FlexOwnProps {
  asChild?: boolean;
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    className,
    style,
    asChild,
    display = flexPropDefs.display.default,
    direction = flexPropDefs.direction.default,
    align = flexPropDefs.align.default,
    justify = flexPropDefs.justify.default,
    wrap = flexPropDefs.wrap.default,
    gap = flexPropDefs.gap.default,
    ...flexProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...flexProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Flex',
        getResponsiveClassNames({
          className: 'rt-r-display',
          value: display,
          propValues: flexPropDefs.display.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-fd',
          value: direction,
          propValues: flexPropDefs.direction.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-fw',
          value: wrap,
          propValues: flexPropDefs.wrap.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-gap',
          value: gap,
          propValues: flexPropDefs.gap.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-ai',
          value: align,
          propValues: flexPropDefs.align.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-jc',
          value: justify,
          propValues: flexPropDefs.justify.values,
          parseValue: parseJustifyValue,
        }),
        layoutClassNames,
        marginClassNames,
        className
      )}
      style={mergeStyles(layoutCustomProperties, marginCustomProperties, style)}
    />
  );
});
Flex.displayName = 'Flex';

function parseJustifyValue(value: string) {
  return value === 'between' ? 'space-between' : value;
}

export { Flex };
export type { FlexProps };
