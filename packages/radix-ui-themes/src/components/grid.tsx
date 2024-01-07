import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { gridPropDefs } from './grid.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  getMarginStyles,
  getResponsiveClassNames,
  getResponsiveStyles,
  mergeStyles,
} from '../helpers';

import { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type GridElement = React.ElementRef<'div'>;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;
interface GridProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    GridOwnProps {
  asChild?: boolean;
}
const Grid = React.forwardRef<GridElement, GridProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  const [marginClassNames, marginCustomProperties] = getMarginStyles(marginProps);
  const {
    className,
    style,
    asChild,
    display = gridPropDefs.display.default,
    columns = gridPropDefs.columns.default,
    rows = gridPropDefs.rows.default,
    flow = gridPropDefs.flow.default,
    align = gridPropDefs.align.default,
    justify = gridPropDefs.justify.default,
    gap = gridPropDefs.gap.default,
    gapX = gridPropDefs.gapX.default,
    gapY = gridPropDefs.gapY.default,
    ...gridProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';

  const [columnsClassNames, columnsCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gtc',
    customProperty: '--grid-template-columns',
    value: columns,
    propValues: gridPropDefs.columns.values,
    parseValue: parseGridValue,
  });

  const [rowsClassNames, rowsCustomProperties] = getResponsiveStyles({
    className: 'rt-r-gtr',
    customProperty: '--grid-template-rows',
    value: rows,
    propValues: gridPropDefs.rows.values,
    parseValue: parseGridValue,
  });

  return (
    <Comp
      {...gridProps}
      ref={forwardedRef}
      // prettier-ignore
      className={classNames(
        'rt-Grid',
        getResponsiveClassNames({ className: 'rt-r-display', value: display }),
        columnsClassNames,
        rowsClassNames,
        getResponsiveClassNames({ className: 'rt-r-gaf', value: flow }),
        getResponsiveClassNames({ className: 'rt-r-gap', value: gap }),
        getResponsiveClassNames({ className: 'rt-r-cg', value: gapX }),
        getResponsiveClassNames({ className: 'rt-r-rg', value: gapY }),
        getResponsiveClassNames({ className: 'rt-r-ai', value: align }),
        getResponsiveClassNames({ className: 'rt-r-jc', value: justify, parseValue: parseJustifyValue }),
        layoutClassNames,
        marginClassNames,
        className
      )}
      style={mergeStyles(
        columnsCustomProperties,
        rowsCustomProperties,
        layoutCustomProperties,
        marginCustomProperties,
        style
      )}
    />
  );
});
Grid.displayName = 'Grid';

function parseGridValue(value: string) {
  if ((gridPropDefs.columns.values as readonly string[]).includes(value)) {
    return value;
  }

  return value?.match(/^\d+$/) ? `repeat(${value}, minmax(0, 1fr))` : value;
}

function parseJustifyValue(value: string) {
  return value === 'between' ? 'space-between' : value;
}

export { Grid };
export type { GridProps };
