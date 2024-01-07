import * as React from 'react';
import classNames from 'classnames';
import { sectionPropDefs } from './section.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  getMarginStyles,
  getResponsiveClassNames,
  mergeStyles,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type SectionElement = React.ElementRef<'div'>;
type SectionOwnProps = GetPropDefTypes<typeof sectionPropDefs>;
interface SectionProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    SectionOwnProps {}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  const {
    className,
    style,
    size = sectionPropDefs.size.default,
    display = sectionPropDefs.display.default,
    ...sectionProps
  } = layoutRest;
  return (
    <section
      {...sectionProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Section',
        getResponsiveClassNames({
          className: 'rt-r-size',
          value: size,
          propValues: sectionPropDefs.size.values,
        }),
        getResponsiveClassNames({
          className: 'rt-r-display',
          value: display,
          propValues: sectionPropDefs.display.values,
        }),
        layoutClassNames,
        marginClassNames,
        className
      )}
      style={mergeStyles(layoutCustomProperties, marginCustomProperties, style)}
    />
  );
});
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
