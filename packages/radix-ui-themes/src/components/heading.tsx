import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { headingPropDefs } from './heading.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type {
  PropsWithoutRefOrColor,
  MarginProps,
  GetPropDefTypes,
  NiceIntersection,
} from '../helpers';

type HeadingElement = React.ElementRef<'h1'>;
type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>;
type CommonHeadingProps = NiceIntersection<MarginProps, HeadingOwnProps>;
type HeadingAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'h1'>;
type HeadingAsProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  asChild?: never;
} & PropsWithoutRefOrColor<'h1'>;
type HeadingProps = CommonHeadingProps & (HeadingAsChildProps | HeadingAsProps);
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    children,
    className,
    style,
    asChild = false,
    as: Tag = 'h1',
    size = headingPropDefs.size.default,
    weight = headingPropDefs.weight.default,
    align = headingPropDefs.align.default,
    trim = headingPropDefs.trim.default,
    color = headingPropDefs.color.default,
    highContrast = headingPropDefs.highContrast.default,
    ...headingProps
  } = marginRest;
  return (
    <Slot
      data-accent-color={color}
      {...headingProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Heading',
        getResponsiveClassNames({ className: 'rt-r-size', value: size }),
        getResponsiveClassNames({ className: 'rt-r-weight', value: weight }),
        getResponsiveClassNames({ className: 'rt-r-ta', value: align }),
        getResponsiveClassNames({ className: 'rt-r-lt', value: trim }),
        { 'rt-high-contrast': highContrast },
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Heading.displayName = 'Heading';

export { Heading };
export type { HeadingProps };
