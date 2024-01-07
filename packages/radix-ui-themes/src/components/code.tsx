import * as React from 'react';
import classNames from 'classnames';
import { codePropDefs } from './code.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type CodeElement = React.ElementRef<'code'>;
type CodeOwnProps = GetPropDefTypes<typeof codePropDefs>;
interface CodeProps extends PropsWithoutRefOrColor<'code'>, MarginProps, CodeOwnProps {}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = codePropDefs.size.default,
    variant = codePropDefs.variant.default,
    weight = codePropDefs.weight.default,
    color = codePropDefs.color.default,
    highContrast = codePropDefs.highContrast.default,
    ...codeProps
  } = marginRest;
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  return (
    <code
      data-accent-color={color}
      {...codeProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Code',
        getResponsiveClassNames({
          className: 'rt-r-size',
          value: size,
          propValues: codePropDefs.size.values,
        }),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        getResponsiveClassNames({
          className: 'rt-r-weight',
          value: weight,
          propValues: codePropDefs.weight.values,
        }),
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    />
  );
});
Code.displayName = 'Code';

export { Code };
export type { CodeProps };
