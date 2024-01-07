import * as React from 'react';
import classNames from 'classnames';
import { containerPropDefs } from './container.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type ContainerElement = React.ElementRef<'div'>;
type ContainerOwnProps = GetPropDefTypes<typeof containerPropDefs>;
interface ContainerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    ContainerOwnProps {}
const Container = React.forwardRef<ContainerElement, ContainerProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    children,
    className,
    style,
    size = containerPropDefs.size.default,
    display = containerPropDefs.display.default,
    ...containerProps
  } = layoutRest;
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  return (
    <div
      {...containerProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Container',
        getResponsiveClassNames({ className: 'rt-r-display', value: display }),
        getResponsiveClassNames({ className: 'rt-r-size', value: size }),
        layoutClassNames,
        marginClassNames,
        className
      )}
      style={mergeStyles(layoutCustomProperties, marginCustomProperties, style)}
    >
      <div className="rt-ContainerInner">{children}</div>
    </div>
  );
});
Container.displayName = 'Container';

export { Container };
export type { ContainerProps };
