import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { cardPropDefs } from './card.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { MarginProps, GetPropDefTypes } from '../helpers';

type CardElement = React.ElementRef<'div'>;
type CardOwnProps = GetPropDefTypes<typeof cardPropDefs>;
interface CardProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, CardOwnProps {
  asChild?: boolean;
}
const Card = React.forwardRef<CardElement, CardProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    asChild,
    children,
    className,
    style,
    size = cardPropDefs.size.default,
    variant = cardPropDefs.variant.default,
    ...cardProps
  } = marginRest;
  const Comp = asChild ? Slot : 'div';
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  return (
    <Comp
      ref={forwardedRef}
      {...cardProps}
      className={classNames(
        'rt-Card',
        'rt-reset',
        getResponsiveClassNames({ className: 'rt-r-size', value: size }),
        `rt-variant-${variant}`,
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    >
      {asChild ? getChild(children) : <div className="rt-CardInner">{children}</div>}
    </Comp>
  );
});
Card.displayName = 'Card';

function getChild(children: React.ReactNode) {
  const firstChild = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(firstChild, {
    children: <div className="rt-CardInner">{firstChild.props.children}</div>,
  });
}

export { Card };
export type { CardProps };
