'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { separatorPropDefs } from './separator.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type SeparatorElement = React.ElementRef<typeof SeparatorPrimitive.Root>;
type SeparatorOwnProps = GetPropDefTypes<typeof separatorPropDefs>;
interface SeparatorProps
  extends PropsWithoutRefOrColor<typeof SeparatorPrimitive.Root>,
    MarginProps,
    SeparatorOwnProps {}
const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    className,
    style,
    size = separatorPropDefs.size.default,
    color = separatorPropDefs.color.default,
    ...separatorProps
  } = marginRest;
  return (
    <SeparatorPrimitive.Root
      data-accent-color={color}
      {...separatorProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Separator',
        getResponsiveClassNames({
          className: 'rt-r-size',
          value: size,
          propValues: separatorPropDefs.size.values,
        }),
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    />
  );
});
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
