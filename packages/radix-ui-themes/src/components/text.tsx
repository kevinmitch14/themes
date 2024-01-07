import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { textPropDefs } from './text.props';
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

type TextElement = React.ElementRef<'span'>;
type TextOwnProps = GetPropDefTypes<typeof textPropDefs>;
type CommonTextProps = NiceIntersection<MarginProps, TextOwnProps>;
type TextAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'span'>;
type TextSpanProps = { as?: 'span'; asChild?: never } & PropsWithoutRefOrColor<'span'>;
type TextDivProps = { as: 'div'; asChild?: never } & PropsWithoutRefOrColor<'div'>;
type TextLabelProps = { as: 'label'; asChild?: never } & PropsWithoutRefOrColor<'label'>;
type TextPProps = { as: 'p'; asChild?: never } & PropsWithoutRefOrColor<'p'>;
type TextProps = CommonTextProps &
  (TextAsChildProps | TextSpanProps | TextDivProps | TextLabelProps | TextPProps);

const Text = React.forwardRef<TextElement, TextProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    children,
    className,
    style,
    asChild = false,
    as: Tag = 'span',
    size = textPropDefs.size.default,
    weight = textPropDefs.weight.default,
    align = textPropDefs.align.default,
    trim = textPropDefs.trim.default,
    color = textPropDefs.color.default,
    highContrast = textPropDefs.highContrast.default,
    ...textProps
  } = marginRest;
  return (
    <Slot
      data-accent-color={color}
      {...textProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Text',
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
Text.displayName = 'Text';

export { Text };
export type { TextProps };
