import * as React from 'react';
import classNames from 'classnames';
import { kbdPropDefs } from './kbd.props';
import {
  extractMarginProps,
  getMarginStyles,
  GetPropDefTypes,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { MarginProps } from '../helpers';

type KbdElement = React.ElementRef<'kbd'>;
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>;
interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'>, MarginProps, KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, style, size = kbdPropDefs.size.default, ...kbdProps } = marginRest;
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  return (
    <kbd
      {...kbdProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Kbd',
        getResponsiveClassNames({
          className: 'rt-r-size',
          value: size,
          propValues: kbdPropDefs.size.values,
        }),
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };
