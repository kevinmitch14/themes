import * as React from 'react';
import classNames from 'classnames';
import { textAreaPropDefs } from './text-area.props';
import {
  extractMarginProps,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type TextAreaElement = React.ElementRef<'textarea'>;
type TextAreaOwnProps = GetPropDefTypes<typeof textAreaPropDefs>;
interface TextAreaProps
  extends Omit<PropsWithoutRefOrColor<'textarea'>, 'size'>,
    MarginProps,
    TextAreaOwnProps {}
const TextArea = React.forwardRef<TextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    className,
    size = textAreaPropDefs.size.default,
    variant = textAreaPropDefs.variant.default,
    color = textAreaPropDefs.color.default,
    style,
    ...textAreaProps
  } = marginRest;
  return (
    <div
      data-accent-color={color}
      className={classNames(
        'rt-TextAreaRoot',
        getResponsiveClassNames({
          className: 'rt-r-size',
          value: size,
          propValues: textAreaPropDefs.size.values,
        }),
        `rt-variant-${variant}`,
        marginClassNames,
        className
      )}
      style={mergeStyles(marginCustomProperties, style)}
    >
      <textarea className="rt-TextAreaInput" ref={forwardedRef} {...textAreaProps} />
      <div className="rt-TextAreaChrome" />
    </div>
  );
});
TextArea.displayName = 'TextArea';

export { TextArea };
export type { TextAreaProps };
